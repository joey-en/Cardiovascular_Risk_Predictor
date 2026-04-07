import argparse
import json
import os
from datetime import datetime
from pathlib import Path
from typing import Any

from dotenv import load_dotenv
from openai import AzureOpenAI

from extraction_script import extract_patient_data


load_dotenv()

GPT_ENDPOINT = os.getenv("GPT_ENDPOINT")
GPT_DEPLOYMENT = os.getenv("GPT_DEPLOYMENT")
GPT_KEY = os.getenv("GPT_KEY")
GPT_VERSION = os.getenv("GPT_VERSION")


def _get_client() -> AzureOpenAI:
    return AzureOpenAI(
        azure_endpoint=GPT_ENDPOINT,
        api_key=GPT_KEY,
        api_version=GPT_VERSION,
    )


def build_case_markdown(
    user_query: str,
    extracted_features: dict[str, Any],
    prediction_label: str,
    prediction_probability: float | None = None,
    model_explanation: dict[str, Any] | None = None,
) -> str:
    """Builds a structured markdown payload for the LLM report generator."""
    probability_line = (
        f"- Predicted probability: {prediction_probability:.4f}"
        if prediction_probability is not None
        else "- Predicted probability: Not provided"
    )

    explanation_block = (
        json.dumps(model_explanation, indent=2)
        if model_explanation
        else "No feature-level explanation data was provided."
    )

    return f"""# Cardiovascular Disease Risk Case Input

## Original User Query
{user_query}

## Structured Features (Model Input Schema)
```json
{json.dumps(extracted_features, indent=2)}
```

## Model Prediction (Cardiovascular Disease)
- Predicted class: {prediction_label}
{probability_line}

## Explainability Data From Model
```json
{explanation_block}
```
"""


def _load_text_file(path: str | None) -> str | None:
    if not path:
        return None
    file_path = Path(path)
    if not file_path.exists():
        raise FileNotFoundError(f"Text file not found: {path}")
    return file_path.read_text(encoding="utf-8")


def generate_doctor_report(case_markdown: str) -> str:
    """Generates a doctor-readable markdown report from a prepared case markdown payload."""
    client = _get_client()

    system_prompt = """
You are a clinical reporting assistant specialized in cardiovascular disease risk assessment.
You will receive a case file with patient information, clinical features, and cardiovascular disease risk analysis results.

Write a concise clinical report in markdown for physicians with the following sections:
- Patient Summary (demographics, vitals, clinical presentation)
- Key Cardiovascular Risk Factors (list the clinical risk factors present)
- Clinical Assessment (interpret the cardiovascular disease risk classification)
- Primary Risk Contributors (explain which clinical factors most strongly influenced the assessment, in plain medical terms—NOT in technical/mathematical language)
- Recommended Clinical Actions and Follow-up

Rules:
- Use ONLY clinical and medical language; avoid all technical jargon related to machine learning, algorithms, or statistics.
- Translate any analytical data (e.g., feature importance) into plain medical insights about which risk factors are most influential.
- Do not claim certainty or provide definitive diagnosis. Present findings as clinical assessment to guide further evaluation.
- Focus exclusively on cardiovascular health and clinical implications.
- Keep report professional and suitable for physician review and patient discussion.
- Keep report length to about 300-400 words.
""".strip()

    response = client.chat.completions.create(
        model=GPT_DEPLOYMENT,
        temperature=0.1,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": case_markdown},
        ],
    )

    return response.choices[0].message.content.strip()


def save_report(report_markdown: str, output_path: str | None = None) -> Path:
    """Saves the generated report to markdown file and returns its path."""
    if output_path:
        out_file = Path(output_path)
        out_file.parent.mkdir(parents=True, exist_ok=True)
    else:
        reports_dir = Path(__file__).resolve().parents[1] / "reports"
        reports_dir.mkdir(parents=True, exist_ok=True)
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        out_file = reports_dir / f"doctor_report_{timestamp}.md"

    out_file.write_text(report_markdown, encoding="utf-8")
    return out_file


def _load_json_file(path: str | None) -> dict[str, Any] | None:
    if not path:
        return None
    file_path = Path(path)
    if not file_path.exists():
        raise FileNotFoundError(f"JSON file not found: {path}")
    return json.loads(file_path.read_text(encoding="utf-8"))


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Generate a doctor-facing markdown report from a prepared cardiovascular case markdown payload."
    )
    input_group = parser.add_mutually_exclusive_group(required=True)
    input_group.add_argument(
        "--case-markdown-file",
        default=None,
        help="Path to a markdown file containing the patient query, extracted features, prediction, and SHAP values.",
    )
    input_group.add_argument(
        "--case-markdown",
        default=None,
        help="Inline markdown payload containing the patient query, extracted features, prediction, and SHAP values.",
    )
    parser.add_argument("--query", default=None, help="Optional natural-language patient description for legacy mode.")
    parser.add_argument(
        "--prediction",
        default=None,
        help="Optional cardiovascular disease prediction label for legacy mode.",
    )
    parser.add_argument(
        "--probability",
        type=float,
        default=None,
        help="Optional model predicted probability for the positive class in legacy mode.",
    )
    parser.add_argument(
        "--features-json",
        default=None,
        help="Optional path to extracted features JSON for legacy mode.",
    )
    parser.add_argument(
        "--explainability-json",
        default=None,
        help="Optional path to explainability JSON for legacy mode (for example SHAP values or feature importances).",
    )
    parser.add_argument(
        "--output",
        default=None,
        help="Optional markdown output path. If omitted, saves in reports/ with timestamp.",
    )

    args = parser.parse_args()

    if args.case_markdown_file or args.case_markdown:
        case_markdown = args.case_markdown if args.case_markdown else _load_text_file(args.case_markdown_file)
        if not case_markdown:
            raise ValueError("Case markdown input was empty.")
    else:
        if not args.query or not args.prediction:
            raise ValueError("Legacy mode requires --query and --prediction when no markdown input is provided.")

        extracted_features = _load_json_file(args.features_json)
        if extracted_features is None:
            extracted_features = extract_patient_data(args.query)

        model_explanation = _load_json_file(args.explainability_json)
        case_markdown = build_case_markdown(
            user_query=args.query,
            extracted_features=extracted_features,
            prediction_label=args.prediction,
            prediction_probability=args.probability,
            model_explanation=model_explanation,
        )

    report = generate_doctor_report(case_markdown)

    output_file = save_report(report, args.output)

    print("\nGenerated Report:\n")
    print(report)
    print(f"\nSaved to: {output_file}")


if __name__ == "__main__":
    main()
