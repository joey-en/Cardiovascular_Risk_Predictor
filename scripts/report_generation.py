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


def generate_doctor_report(
    user_query: str,
    extracted_features: dict[str, Any],
    prediction_label: str,
    prediction_probability: float | None = None,
    model_explanation: dict[str, Any] | None = None,
) -> str:
    """Generates a doctor-readable markdown report from case data and prediction context."""
    client = _get_client()

    case_markdown = build_case_markdown(
        user_query=user_query,
        extracted_features=extracted_features,
        prediction_label=prediction_label,
        prediction_probability=prediction_probability,
        model_explanation=model_explanation,
    )

    system_prompt = """
You are a clinical ML reporting assistant specialized in cardiovascular disease risk prediction.
You will receive a markdown case file with:
1) patient query,
2) extracted structured features,
3) cardiovascular disease model prediction,
4) explainability data (if available).

Write a concise doctor-facing report in markdown with the following sections:
- Patient Summary
- Key Risk Factors
- Model Output Interpretation
- Why The Model Likely Predicted This
- Clinical Caution and Next Steps

Rules:
- Use ONLY provided information.
- If explainability data is missing, explicitly state limitations.
- Do not claim certainty or provide definitive diagnosis.
- Keep interpretation aligned to cardiovascular disease risk (cardio present vs no cardio risk indication).
- Keep it clear and professional for physician review.
- Keep report length to about 250-400 words.
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
        description="Generate a doctor-facing markdown report from patient query + model prediction."
    )
    parser.add_argument("--query", required=True, help="Natural-language patient description.")
    parser.add_argument(
        "--prediction",
        required=True,
        help="Cardiovascular disease prediction label (example: 'cardio_disease' or 'no_cardio_disease').",
    )
    parser.add_argument(
        "--probability",
        type=float,
        default=None,
        help="Optional model predicted probability for the positive class.",
    )
    parser.add_argument(
        "--features-json",
        default=None,
        help="Optional path to extracted features JSON. If omitted, features are extracted from query.",
    )
    parser.add_argument(
        "--explainability-json",
        default=None,
        help="Optional path to explainability JSON (for example SHAP values or feature importances).",
    )
    parser.add_argument(
        "--output",
        default=None,
        help="Optional markdown output path. If omitted, saves in reports/ with timestamp.",
    )

    args = parser.parse_args()

    extracted_features = _load_json_file(args.features_json)
    if extracted_features is None:
        extracted_features = extract_patient_data(args.query)

    model_explanation = _load_json_file(args.explainability_json)

    report = generate_doctor_report(
        user_query=args.query,
        extracted_features=extracted_features,
        prediction_label=args.prediction,
        prediction_probability=args.probability,
        model_explanation=model_explanation,
    )

    output_file = save_report(report, args.output)

    print("\nGenerated Report:\n")
    print(report)
    print(f"\nSaved to: {output_file}")


if __name__ == "__main__":
    main()
