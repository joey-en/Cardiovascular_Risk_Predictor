"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { DescriptionFeaturesChecklist } from "./DescriptionFeaturesChecklist";
import { MaterialIcon } from "./MaterialIcon";

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
  const [value, setValue] = useState("");
  const words = countWords(value);
  const atLimit = words >= MAX_WORDS;

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.target.value;
    if (countWords(next) <= MAX_WORDS) {
      setValue(next);
      return;
    }
    setValue(truncateToWordLimit(next, MAX_WORDS));
  }, []);

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

      <div className="mt-6 border-t border-outline-variant/10 pt-6">
        <Link
          href="/assessment/review"
          className="block w-full rounded-xl bg-gradient-to-br from-primary to-primary-container px-8 py-4 text-center text-lg font-extrabold text-on-primary shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-95"
        >
          Continue to verify
        </Link>
      </div>
    </div>
  );
}
