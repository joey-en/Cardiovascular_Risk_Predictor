# Cardiovascular Risk Predictor

A web application that guides users through a **heart-health assessment**: they describe their health in free text, the system **extracts structured clinical-style fields** (aligned with a cardiovascular risk model schema), users **verify or correct** those fields, then see a **screening-style result** with an optional **PDF report** download.

By default the app runs in **demo mode**: extraction is **hardcoded** so you can try the full flow without Python or Azure. Turning on **real extraction** uses a **FastAPI** service that calls **Azure OpenAI** via `scripts/extraction_script.py`.

This is a **screening and demonstration tool**, not a medical device or diagnosis.

---

## What’s in this repo

| Area | Role |
|------|------|
| `frontend/` | Next.js (App Router) UI: assessment steps, review form, result page, PDF export (`jspdf`). |
| `api_server.py` | FastAPI app exposing `POST /extract` for structured patient-field extraction. |
| `scripts/extraction_script.py` | LLM-backed extraction logic (Azure OpenAI). |
| `stitch/` | Reference HTML/screens from design tooling (not required to run the app). |

---

## Prerequisites

- **Node.js** (LTS recommended) and **npm** — for the Next.js frontend.
- **Python 3.10+** — only if you use **real** extraction (optional).
- **Azure OpenAI** credentials — only for real extraction (optional).

---

## Quick start (demo — one terminal)

This uses the **mock extractor** built into the Next.js API route. **No Python** and **no `.env`** required.

### 1) Open a terminal in the project

**Windows (PowerShell)** — replace the path if yours differs:

```powershell
cd C:\Users\lynny\Downloads\cardio\Cardiovascular_Risk_Predictor\frontend
```

**Windows (Command Prompt)**:

```cmd
cd C:\Users\lynny\Downloads\cardio\Cardiovascular_Risk_Predictor\frontend
```

### 2) Install dependencies (first time only)

```powershell
npm install
```

### 3) Start the dev server

```powershell
npm run dev
```

You should see Next.js start (default URL **http://localhost:3000**).

### 4) Use the app

Open **http://localhost:3000** in a browser. Walk through **Input → Verify → Prediction**; the PDF button on the result step downloads a demo report.

> The dev script uses **webpack** (`next dev --webpack`) and raises Node’s memory limit for stability on Windows. To try Turbopack instead: `npm run dev:turbo`.

---

## Full stack (real Azure extraction — two terminals)

Use this when you want `POST /api/extract` in Next.js to **forward** to your local FastAPI service and run the **Python** extractor.

### Terminal A — Python API (repo root)

**PowerShell:**

```powershell
cd C:\Users\lynny\Downloads\cardio\Cardiovascular_Risk_Predictor
```

Create and use a virtual environment (recommended):

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

**Command Prompt** (activation differs):

```cmd
cd C:\Users\lynny\Downloads\cardio\Cardiovascular_Risk_Predictor
python -m venv .venv
.venv\Scripts\activate.bat
```

Install Python dependencies:

```powershell
pip install -r requirements.txt
```

Configure **Azure OpenAI** in a **`.env` file at the repo root** (same folder as `api_server.py`), for example:

```env
GPT_ENDPOINT=https://your-resource.openai.azure.com/
GPT_DEPLOYMENT=your-deployment-name
GPT_KEY=your-api-key
GPT_VERSION=2024-02-15-preview
```

Start **uvicorn** (reload on code changes):

```powershell
uvicorn api_server:app --reload --port 8000
```

Leave this window running. You should see Uvicorn listening on **http://127.0.0.1:8000**.

### Terminal B — Next.js with real extraction

**PowerShell / Command Prompt:**

```powershell
cd C:\Users\lynny\Downloads\cardio\Cardiovascular_Risk_Predictor\frontend
```

Create `frontend/.env.local`:

```env
USE_REAL_EXTRACTION=true
```

Optional — if your API is not on the default URL:

```env
USE_REAL_EXTRACTION=true
EXTRACTION_API_URL=http://127.0.0.1:8000
```

Install (if not already) and run:

```powershell
npm install
npm run dev
```

Open **http://localhost:3000**. The UI calls **`/api/extract`**, which proxies to **`http://127.0.0.1:8000/extract`** when `USE_REAL_EXTRACTION` is enabled.

---

## Environment variables (summary)

### Repo root `.env` (Python / `api_server.py`)

| Variable | Purpose |
|----------|---------|
| `GPT_ENDPOINT` | Azure OpenAI endpoint URL |
| `GPT_DEPLOYMENT` | Deployment name |
| `GPT_KEY` | API key |
| `GPT_VERSION` | API version string |

### `frontend/.env.local` (Next.js)

| Variable | Purpose |
|----------|---------|
| `USE_REAL_EXTRACTION` | Set to `true` or `1` to call the Python API instead of the mock extractor |
| `EXTRACTION_API_URL` | Optional. Base URL for FastAPI (default `http://127.0.0.1:8000`) |

---

## Production build (frontend)

From `frontend/`:

```powershell
npm run build
npm start
```

`npm start` serves the production build (default port **3000**).

---

## Troubleshooting

- **“Cannot reach extraction service”** — With `USE_REAL_EXTRACTION=true`, ensure Terminal A is running `uvicorn` on the port matching `EXTRACTION_API_URL`.
- **CORS** — The FastAPI app allows the Next dev origin (`localhost:3000`). If you change host/port, update CORS in `api_server.py` if needed.
- **Memory / Tailwind on Windows** — Use `npm run dev` (webpack) rather than `dev:turbo` if you hit resolution or OOM issues.
