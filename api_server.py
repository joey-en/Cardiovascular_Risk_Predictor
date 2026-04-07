"""
Local API for cardiovascular feature extraction (wraps scripts/extraction_script.py).

Run from repo root:
  pip install -r requirements.txt
  uvicorn api_server:app --reload --port 8000

Requires Azure OpenAI env vars: GPT_ENDPOINT, GPT_DEPLOYMENT, GPT_KEY, GPT_VERSION
"""

from __future__ import annotations

import sys
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT / "scripts"))

from extraction_script import extract_patient_data  # noqa: E402

REQUIRED_KEYS = [
    "age",
    "gender",
    "height",
    "weight",
    "ap_hi",
    "ap_lo",
    "cholesterol",
    "gluc",
    "smoke",
    "alco",
    "active",
]

app = FastAPI(title="Cardiovascular extraction API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ExtractRequest(BaseModel):
    text: str = Field(..., min_length=1, description="Natural language health description")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/extract")
def extract(body: ExtractRequest) -> dict:
    text = body.text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="Text is empty")

    try:
        data = extract_patient_data(text)
    except Exception as e:  # noqa: BLE001
        raise HTTPException(status_code=502, detail=f"Extraction failed: {e!s}") from e

    missing = [k for k in REQUIRED_KEYS if data.get(k) is None]
    return {
        "extracted": data,
        "missing": missing,
        "error": None,
    }
