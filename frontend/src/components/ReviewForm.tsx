"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AssessmentStepNav } from "@/components/AssessmentStepNav";
import { MaterialIcon } from "@/components/MaterialIcon";
import {
  CONFIRMED_STORAGE_KEY,
  EXTRACTION_STORAGE_KEY,
  type ExtractionPayload,
  type ExtractedPatientRecord,
  FIELD_LABELS,
  ageDaysToYears,
  yearsToAgeDays,
} from "@/lib/patient-extraction";

const heroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBQM10yCN3-sZhbLzMzdOxK3MIs9ePqnw-NGmfa4N7hkyg6u-PgB60ZJBMNxDysE_fIC6td3ozJxwhoKJkwLtYtUvChonNRLRyYBbbSq36w5M7JGJfF5j6V7ZcgWS3-reejEv67cG5eYkjN4u4A50sXujFEmJcUgFUKWbZvlwT1wImLAudo6sVaxX6_vS_jRsSoJ_nbQijuwwFCatLX3kPOv2BMfdDSEjttPmDX6XL_DYi1hAUljiGIpTrfolIQMFWcq6g1W9chV2s";

type FormState = {
  ageYears: string;
  gender: "" | "1" | "2";
  height: string;
  weight: string;
  ap_hi: string;
  ap_lo: string;
  cholesterol: "" | "1" | "2" | "3";
  gluc: "" | "1" | "2" | "3";
  smoke: "" | "0" | "1";
  alco: "" | "0" | "1";
  active: "" | "0" | "1";
};

function formFromExtracted(e: ExtractedPatientRecord): FormState {
  return {
    ageYears: ageDaysToYears(e.age),
    gender: e.gender == null ? "" : String(e.gender) as "1" | "2",
    height: e.height == null ? "" : String(e.height),
    weight: e.weight == null ? "" : String(e.weight),
    ap_hi: e.ap_hi == null ? "" : String(e.ap_hi),
    ap_lo: e.ap_lo == null ? "" : String(e.ap_lo),
    cholesterol: e.cholesterol == null ? "" : String(e.cholesterol) as "1" | "2" | "3",
    gluc: e.gluc == null ? "" : String(e.gluc) as "1" | "2" | "3",
    smoke: e.smoke == null ? "" : String(e.smoke) as "0" | "1",
    alco: e.alco == null ? "" : String(e.alco) as "0" | "1",
    active: e.active == null ? "" : String(e.active) as "0" | "1",
  };
}

function formToRecord(form: FormState, id?: number): ExtractedPatientRecord {
  const ageYears = parseFloat(form.ageYears);
  return {
    id,
    age: form.ageYears === "" || Number.isNaN(ageYears) ? null : yearsToAgeDays(ageYears),
    gender: form.gender === "" ? null : (Number(form.gender) as 1 | 2),
    height: form.height === "" ? null : Number(form.height),
    weight: form.weight === "" ? null : Number(form.weight),
    ap_hi: form.ap_hi === "" ? null : Number(form.ap_hi),
    ap_lo: form.ap_lo === "" ? null : Number(form.ap_lo),
    cholesterol: form.cholesterol === "" ? null : (Number(form.cholesterol) as 1 | 2 | 3),
    gluc: form.gluc === "" ? null : (Number(form.gluc) as 1 | 2 | 3),
    smoke: form.smoke === "" ? null : (Number(form.smoke) as 0 | 1),
    alco: form.alco === "" ? null : (Number(form.alco) as 0 | 1),
    active: form.active === "" ? null : (Number(form.active) as 0 | 1),
  };
}

function missingFromForm(form: FormState): string[] {
  const r = formToRecord(form);
  const keys: (keyof ExtractedPatientRecord)[] = [
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
  ];
  return keys.filter((k) => r[k] === null || r[k] === undefined);
}

function fieldWrapClass(missing: boolean) {
  return missing
    ? "rounded-lg ring-2 ring-error/50 ring-offset-2 ring-offset-surface-container-lowest"
    : "";
}

export function ReviewForm() {
  const [payload, setPayload] = useState<ExtractionPayload | null>(null);
  const [form, setForm] = useState<FormState | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(EXTRACTION_STORAGE_KEY);
      if (!raw) {
        setReady(true);
        return;
      }
      const p = JSON.parse(raw) as ExtractionPayload;
      setPayload(p);
      setForm(formFromExtracted(p.extracted));
    } catch {
      setPayload(null);
      setForm(null);
    } finally {
      setReady(true);
    }
  }, []);

  const missing = useMemo(() => (form ? missingFromForm(form) : []), [form]);

  const update = useCallback((patch: Partial<FormState>) => {
    setForm((f) => (f ? { ...f, ...patch } : f));
  }, []);

  const persistConfirmed = useCallback(() => {
    if (!form || !payload) return;
    const record = formToRecord(form, payload.extracted.id);
    sessionStorage.setItem(
      CONFIRMED_STORAGE_KEY,
      JSON.stringify({
        rawText: payload.rawText,
        record,
        confirmedAt: new Date().toISOString(),
      }),
    );
  }, [form, payload]);

  if (!ready) {
    return (
      <main className="mx-auto max-w-5xl flex-1 px-6 py-10 md:px-12">
        <p className="text-on-surface-variant">Loading…</p>
      </main>
    );
  }

  if (!payload || !form) {
    return (
      <main className="mx-auto max-w-5xl flex-1 px-6 py-10 md:px-12">
        <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-low p-8">
          <h1 className="mb-2 text-2xl font-bold text-on-surface">No extraction yet</h1>
          <p className="mb-6 text-on-surface-variant">
            Describe your health on the input page and use <strong>Continue to verify</strong> so we can
            extract fields from your text.
          </p>
          <Link
            href="/assessment/input"
            className="inline-flex rounded-xl bg-gradient-to-br from-primary to-primary-container px-6 py-3 font-bold text-on-primary"
          >
            Go to input
          </Link>
        </div>
      </main>
    );
  }

  const missingLabels = missing.map((k) => FIELD_LABELS[k] ?? k).filter(Boolean);

  return (
    <main className="mx-auto max-w-5xl flex-1 px-6 py-10 md:px-12">
      <div className="mb-10">
        <AssessmentStepNav />
      </div>

      <div className="mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">Step 2: Verify</span>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-on-surface">Confirm Details</h1>
      </div>

      {missingLabels.length > 0 ? (
        <div className="mb-8 rounded-xl border border-error/30 bg-error-container/10 p-5">
          <div className="flex gap-3">
            <MaterialIcon name="warning" className="shrink-0 text-error" />
            <div>
              <p className="font-bold text-on-surface">Missing or incomplete information</p>
              <p className="mt-1 text-sm text-on-surface-variant">
                We could not infer everything from your description. Please fill or correct the
                highlighted fields below before generating a prediction.
              </p>
              <ul className="mt-3 list-inside list-disc text-sm font-medium text-error">
                {missingLabels.map((label) => (
                  <li key={label}>{label}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-8 rounded-xl border-l-4 border-primary/30 bg-surface-container-low p-6">
          <p className="italic leading-relaxed text-on-surface">
            All required fields are present. Double-check the values below, then continue.
          </p>
        </div>
      )}

      <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-12">
        <section
          className={`rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-sm md:col-span-12 lg:col-span-5 ${["age", "gender", "height", "weight"].some((k) => missing.includes(k)) ? "ring-1 ring-error/20" : ""}`}
        >
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-container">
              <MaterialIcon name="person" className="text-on-secondary-container" />
            </div>
            <h2 className="text-xl font-bold text-on-surface">Basic Info</h2>
          </div>
          <div className="space-y-6">
            <div className={fieldWrapClass(missing.includes("age"))}>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Age (Years)
              </label>
              <input
                className="w-full rounded-lg border-none bg-surface-container-low p-3 font-semibold text-on-surface transition-all focus:ring-2 focus:ring-primary/20"
                type="number"
                min={0}
                max={120}
                value={form.ageYears}
                onChange={(e) => update({ ageYears: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className={fieldWrapClass(missing.includes("height"))}>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Height (cm)
                </label>
                <input
                  className="w-full rounded-lg border-none bg-surface-container-low p-3 font-semibold text-on-surface transition-all focus:ring-2 focus:ring-primary/20"
                  type="number"
                  value={form.height}
                  onChange={(e) => update({ height: e.target.value })}
                />
              </div>
              <div className={fieldWrapClass(missing.includes("weight"))}>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Weight (kg)
                </label>
                <input
                  className="w-full rounded-lg border-none bg-surface-container-low p-3 font-semibold text-on-surface transition-all focus:ring-2 focus:ring-primary/20"
                  type="number"
                  value={form.weight}
                  onChange={(e) => update({ weight: e.target.value })}
                />
              </div>
            </div>
            <div className={fieldWrapClass(missing.includes("gender"))}>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Gender (model: 1 = female, 2 = male)
              </label>
              <select
                className="w-full rounded-lg border-none bg-surface-container-low p-3 font-semibold text-on-surface transition-all focus:ring-2 focus:ring-primary/20"
                value={form.gender}
                onChange={(e) => update({ gender: e.target.value as FormState["gender"] })}
              >
                <option value="">Select…</option>
                <option value="1">Female</option>
                <option value="2">Male</option>
              </select>
            </div>
          </div>
        </section>

        <section
          className={`rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-sm md:col-span-12 lg:col-span-7 ${["ap_hi", "ap_lo", "cholesterol", "gluc"].some((k) => missing.includes(k)) ? "ring-1 ring-error/20" : ""}`}
        >
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary-container">
              <MaterialIcon name="vital_signs" className="text-on-tertiary-container" />
            </div>
            <h2 className="text-xl font-bold text-on-surface">Measurements</h2>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-6">
              <div className={fieldWrapClass(missing.includes("ap_hi"))}>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Systolic BP
                </label>
                <input
                  className="w-full rounded-lg border-none bg-surface-container-low p-3 font-semibold text-on-surface transition-all focus:ring-2 focus:ring-primary/20"
                  type="number"
                  value={form.ap_hi}
                  onChange={(e) => update({ ap_hi: e.target.value })}
                />
              </div>
              <div className={fieldWrapClass(missing.includes("ap_lo"))}>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Diastolic BP
                </label>
                <input
                  className="w-full rounded-lg border-none bg-surface-container-low p-3 font-semibold text-on-surface transition-all focus:ring-2 focus:ring-primary/20"
                  type="number"
                  value={form.ap_lo}
                  onChange={(e) => update({ ap_lo: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className={fieldWrapClass(missing.includes("cholesterol"))}>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Cholesterol (1 = normal, 2 = above, 3 = well above)
                </label>
                <div className="flex gap-2">
                  {(["1", "2", "3"] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      className={`flex-1 rounded py-2 font-bold transition-colors ${
                        form.cholesterol === v
                          ? "bg-primary text-white"
                          : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
                      }`}
                      onClick={() => update({ cholesterol: v })}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <div className={fieldWrapClass(missing.includes("gluc"))}>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Glucose (1 = normal, 2 = above, 3 = well above)
                </label>
                <div className="flex gap-2">
                  {(["1", "2", "3"] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      className={`flex-1 rounded py-2 font-bold transition-colors ${
                        form.gluc === v
                          ? "bg-primary text-white"
                          : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
                      }`}
                      onClick={() => update({ gluc: v })}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className={`rounded-xl bg-surface-container-low p-8 md:col-span-12 ${["smoke", "alco", "active"].some((k) => missing.includes(k)) ? "ring-1 ring-error/30" : ""}`}
        >
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <MaterialIcon name="spa" className="text-primary" />
              </div>
              <h2 className="text-xl font-bold text-on-surface">Lifestyle</h2>
            </div>
            {missing.some((k) => ["smoke", "alco", "active"].includes(k)) ? (
              <span className="rounded-full bg-error/10 px-3 py-1 text-[10px] font-bold uppercase text-error">
                Action needed
              </span>
            ) : null}
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className={fieldWrapClass(missing.includes("smoke"))}>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Smoking (0 = no, 1 = yes)
              </label>
              <select
                className="w-full rounded-lg border-none bg-surface-container-lowest p-3 font-semibold text-on-surface transition-all focus:ring-2 focus:ring-primary/20"
                value={form.smoke}
                onChange={(e) => update({ smoke: e.target.value as FormState["smoke"] })}
              >
                <option value="">Select…</option>
                <option value="0">Non-smoker</option>
                <option value="1">Smoker</option>
              </select>
            </div>
            <div className={fieldWrapClass(missing.includes("alco"))}>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Alcohol (0 = no, 1 = yes)
              </label>
              <select
                className="w-full rounded-lg border-none bg-surface-container-lowest p-3 font-semibold text-on-surface transition-all focus:ring-2 focus:ring-primary/20"
                value={form.alco}
                onChange={(e) => update({ alco: e.target.value as FormState["alco"] })}
              >
                <option value="">Select…</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            <div className={fieldWrapClass(missing.includes("active"))}>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Physically active (0 = inactive, 1 = active)
              </label>
              <select
                className="w-full rounded-lg border-none bg-surface-container-lowest p-3 font-semibold text-on-surface transition-all focus:ring-2 focus:ring-primary/20"
                value={form.active}
                onChange={(e) => update({ active: e.target.value as FormState["active"] })}
              >
                <option value="">Select…</option>
                <option value="0">Inactive</option>
                <option value="1">Active</option>
              </select>
            </div>
          </div>
        </section>
      </div>

      <div className="flex flex-col items-center justify-between gap-6 border-t border-outline-variant/20 pt-10 sm:flex-row">
        <Link
          href="/assessment/input"
          className="flex items-center gap-2 font-semibold text-on-surface-variant transition-colors hover:text-on-surface"
        >
          <MaterialIcon name="arrow_back" />
          Back to edit input
        </Link>
        <Link
          href="/assessment/result"
          onClick={persistConfirmed}
          className="w-full rounded-lg bg-gradient-to-r from-primary to-primary-container px-12 py-4 text-center font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 sm:w-auto"
        >
          Generate Prediction
        </Link>
      </div>

      <div className="relative mt-20 h-64 overflow-hidden rounded-3xl shadow-2xl">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#003655]/60 to-transparent" />
        <Image
          src={heroImage}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 896px"
        />
        <div className="absolute bottom-8 left-8 z-20 max-w-sm">
          <p className="font-headline text-xl font-bold leading-snug text-white/90">
            Your data is encrypted and secure within the Digital Sanctuary.
          </p>
        </div>
      </div>
    </main>
  );
}
