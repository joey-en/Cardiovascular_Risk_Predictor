"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { DescriptionFeaturesChecklist } from "./DescriptionFeaturesChecklist";
import { MaterialIcon } from "./MaterialIcon";
import { DEMO_SAMPLE_TEXT } from "@/lib/mock-demo-extraction";
import { EXTRACTION_STORAGE_KEY, type ExtractionPayload } from "@/lib/patient-extraction";

const MAX_WORDS = 100;

function countWords(text: string): number {
  const t = text.trim();
  if (t === "") return 0;
  return t.split(/\s+/).length;
}

function truncateToWordLimit(text: string, maxWords: number): string {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return text.trimEnd();
  return words.slice(0, maxWords).join(" ");
}

export function HealthDescriptionInput() {
  const router = useRouter();
  const [value, setValue] = useState(DEMO_SAMPLE_TEXT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const words = countWords(value);
  const atLimit = words >= MAX_WORDS;

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setError(null);
    const next = e.target.value;
    if (countWords(next) <= MAX_WORDS) {
      setValue(next);
      return;
    }
    setValue(truncateToWordLimit(next, MAX_WORDS));
  }, []);

  const handleContinue = useCallback(async () => {
    setError(null);
    const text = value.trim();
    if (!text) {
      setError("Please enter a short health description before continuing.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = (await res.json()) as {
        extracted?: ExtractionPayload["extracted"];
        missing?: string[];
        error?: string;
        detail?: string | { msg?: string }[];
      };

      if (!res.ok) {
        const detail =
          typeof data.detail === "string"
            ? data.detail
            : Array.isArray(data.detail)
              ? data.detail.map((d) => d.msg ?? "").join(" ")
              : data.error;
        throw new Error(detail || data.error || `Request failed (${res.status})`);
      }

      if (!data.extracted) {
        throw new Error("Invalid response: no extracted data");
      }

      const payload: ExtractionPayload = {
        rawText: text,
        extracted: data.extracted,
        missing: Array.isArray(data.missing) ? data.missing : [],
        extractedAt: new Date().toISOString(),
      };

      sessionStorage.setItem(EXTRACTION_STORAGE_KEY, JSON.stringify(payload));
      router.push("/assessment/review");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Extraction failed.");
    } finally {
      setLoading(false);
    }
  }, [value, router]);

  return (
    <div className="rounded-3xl bg-surface-container-low p-8">
      <label className="mb-2 block text-xl font-bold text-on-surface" htmlFor="health-input">
        Describe your health information
      </label>
      <p className="mb-4 text-sm text-on-surface-variant">
        (age, weight, blood pressure, habits, etc.)
      </p>

      <div className="mb-4 rounded-xl border-l-4 border-primary/30 bg-surface-container-lowest/80 p-4">
        <div className="flex gap-3">
          <MaterialIcon name="info" className="mt-0.5 shrink-0 text-primary" />
          <div className="space-y-2 text-sm leading-relaxed text-on-surface-variant">
            <p>
              <span className="font-semibold text-on-surface">Word limit: {MAX_WORDS} words max.</span>{" "}
              Recommended split for the model: about{" "}
              <span className="font-medium text-on-surface">50 words</span> for core information we need
              to run the risk assessment (e.g. age, blood pressure, cholesterol-related cues, smoking,
              activity), and about <span className="font-medium text-on-surface">50 words</span> for any
              extra context you want to add.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <DescriptionFeaturesChecklist />
      </div>

      <div className="group relative">
        <textarea
          className="min-h-[200px] w-full resize-y rounded-xl border-none bg-surface-container-lowest p-6 pb-12 text-lg text-on-surface placeholder:text-outline-variant transition-all focus:ring-2 focus:ring-primary/20"
          id="health-input"
          value={value}
          onChange={handleChange}
          disabled={loading}
          placeholder="Example: 50 words on vitals and habits the model uses, then up to 50 words of anything else helpful..."
          aria-describedby="health-input-wordcount"
        />
        <div className="pointer-events-none absolute bottom-4 right-4 flex flex-col items-end gap-1 text-xs">
          <span
            id="health-input-wordcount"
            className={`font-medium tabular-nums ${atLimit ? "text-error" : "text-on-surface-variant"}`}
          >
            {words} / {MAX_WORDS} words
          </span>
        </div>
      </div>

      {error ? (
        <div className="mt-4 rounded-xl border border-error/30 bg-error-container/10 px-4 py-3 text-sm text-error">
          {error}
        </div>
      ) : null}

      <div className="mt-6 border-t border-outline-variant/10 pt-6">
        <button
          type="button"
          onClick={handleContinue}
          disabled={loading}
          className="block w-full rounded-xl bg-gradient-to-br from-primary to-primary-container px-8 py-4 text-center text-lg font-extrabold text-on-primary shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Extracting…" : "Continue to verify"}
        </button>
        <p className="mt-2 text-center text-xs text-on-surface-variant">
          Demo mode uses a hardcoded extraction. Set <code className="rounded bg-surface-container-high px-1 py-0.5 text-[10px]">USE_REAL_EXTRACTION=true</code> in{" "}
          <code className="text-[10px]">frontend/.env.local</code> to call Python + Azure instead.
        </p>
      </div>
    </div>
  );
}
