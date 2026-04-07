import { NextResponse } from "next/server";
import { getMockExtraction } from "@/lib/mock-demo-extraction";

const DEFAULT_UPSTREAM = "http://127.0.0.1:8000";

function formatUpstreamError(data: Record<string, unknown>, status: number): string {
  if (typeof data.error === "string") return data.error;
  if (typeof data.detail === "string") return data.detail;
  if (Array.isArray(data.detail)) {
    return data.detail
      .map((item: unknown) =>
        typeof item === "object" && item !== null && "msg" in item
          ? String((item as { msg: string }).msg)
          : String(item),
      )
      .join("; ");
  }
  return `Upstream error (${status})`;
}

/** Set to "1" or "true" to call the Python FastAPI extractor (requires uvicorn). */
const USE_REAL_EXTRACTION =
  process.env.USE_REAL_EXTRACTION === "1" || process.env.USE_REAL_EXTRACTION === "true";

export async function POST(request: Request) {
  let body: { text?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const text = typeof body.text === "string" ? body.text.trim() : "";
  if (!text) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }

  if (!USE_REAL_EXTRACTION) {
    const { extracted, missing } = getMockExtraction();
    return NextResponse.json({
      extracted,
      missing,
      error: null,
      _demo: true,
    });
  }

  const base = process.env.EXTRACTION_API_URL ?? DEFAULT_UPSTREAM;

  try {
    const res = await fetch(`${base.replace(/\/$/, "")}/extract`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
      cache: "no-store",
    });

    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

    if (!res.ok) {
      const detail = formatUpstreamError(data, res.status);
      return NextResponse.json({ error: detail }, { status: res.status >= 500 ? 502 : res.status });
    }

    return NextResponse.json(data);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json(
      {
        error: `Cannot reach extraction service at ${base}. Start it with: uvicorn api_server:app --reload --port 8000`,
        detail: message,
      },
      { status: 503 },
    );
  }
}
