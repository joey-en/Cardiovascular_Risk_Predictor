"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AssessmentStepNav } from "@/components/AssessmentStepNav";
import { MaterialIcon } from "@/components/MaterialIcon";
import { downloadDoctorReportPdf } from "@/lib/download-doctor-report-pdf";
import { DEMO_SCREENING_RISK_PERCENT } from "@/lib/mock-demo-extraction";
import {
  CONFIRMED_STORAGE_KEY,
  type ConfirmedAssessmentPayload,
} from "@/lib/patient-extraction";

const coachImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCuJiFUs8tjZSJzJk2YKgBsEUd7GMdydsoU-nS2attYPceog9LcY_Z290mN30KsM4t6XPEB7pKRFAvW_VgQGhy_TgqZP5KBb9KDNdycq7p4URhLLAlpjwGbVIbVO9mGKO29GWhiAslYshxuHD-Xm3jp9YoswvttluzPgwRAzlFmpdTrqCaPjSnz_ydlG9SZ9sJ6DkD6Bq7tY8WCA9rzu6JwHgkR3zxF5XpNOEsaMiRhLp3gd12e-st5K76O0xXH863ibXaOq8lmIw4";

const RING_C = 2 * Math.PI * 88;

export function AssessmentResultClient() {
  const [confirmed, setConfirmed] = useState<ConfirmedAssessmentPayload | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(CONFIRMED_STORAGE_KEY);
      if (!raw) return;
      setConfirmed(JSON.parse(raw) as ConfirmedAssessmentPayload);
    } catch {
      setConfirmed(null);
    }
  }, []);

  const riskPercent = DEMO_SCREENING_RISK_PERCENT;
  const dashOffset = useMemo(() => RING_C * (1 - riskPercent / 100), [riskPercent]);

  const handlePdf = useCallback(() => {
    if (!confirmed) return;
    downloadDoctorReportPdf({
      rawText: confirmed.rawText,
      record: confirmed.record,
      riskPercent,
    });
  }, [confirmed, riskPercent]);

  if (!confirmed) {
    return (
      <main className="mx-auto max-w-5xl flex-1 px-6 py-12">
        <div className="mb-10">
          <AssessmentStepNav />
        </div>
        <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-low p-10 text-center">
          <h1 className="mb-3 text-2xl font-bold text-on-surface">No verified assessment yet</h1>
          <p className="mb-6 text-on-surface-variant">
            Complete the input and verify steps so we can generate a report and PDF.
          </p>
          <Link
            href="/assessment/input"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-on-primary"
          >
            <MaterialIcon name="arrow_back" className="text-[20px]" />
            Start at health input
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl flex-1 px-6 py-12">
      <div className="mb-10">
        <AssessmentStepNav />
      </div>

      <p className="mb-8 text-xs font-bold uppercase tracking-widest text-primary">Step 3: Prediction</p>

      <section className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-12">
        <div className="relative flex flex-col justify-center overflow-hidden rounded-[2rem] bg-surface-container-lowest p-10 md:col-span-7">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
          <span className="mb-4 block text-xs font-semibold uppercase tracking-widest text-primary">
            Assessment Completed
          </span>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-on-surface md:text-5xl">
            Low Risk (demo)
          </h1>
          <p className="mb-8 max-w-md text-lg leading-relaxed text-on-surface-variant">
            For this demonstration, your structured profile maps to a low estimated probability.
            This is a screening-style preview, not a clinical diagnosis.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              className="rounded-xl px-8 py-4 font-bold text-on-primary shadow-lg transition-all primary-gradient hover:shadow-primary/20"
            >
              Consult a Doctor
            </button>
            <button
              type="button"
              onClick={handlePdf}
              className="flex items-center gap-2 rounded-xl bg-surface-container-highest px-6 py-4 font-bold text-on-surface transition-colors hover:bg-surface-container-high"
            >
              <MaterialIcon name="download" className="text-[20px]" />
              Download Doctor&apos;s Report (PDF)
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center rounded-[2rem] bg-surface-container-low p-10 text-center md:col-span-5">
          <div className="relative mb-6 flex h-48 w-48 items-center justify-center">
            <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 192 192">
              <circle
                className="text-surface-container-highest"
                cx="96"
                cy="96"
                r="88"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="12"
              />
              <circle
                className="text-primary"
                cx="96"
                cy="96"
                r="88"
                fill="transparent"
                stroke="currentColor"
                strokeDasharray={RING_C}
                strokeDashoffset={dashOffset}
                strokeWidth="12"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-extrabold text-on-surface">{riskPercent}%</span>
              <span className="text-sm font-semibold uppercase tracking-tighter text-on-surface-variant">
                Probability
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-surface-container-lowest/50 px-6 py-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="text-sm font-medium text-on-surface-variant">
              Demo estimate (hardcoded pipeline)
            </span>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <h2 className="text-2xl font-bold text-on-surface">Contributing Factors</h2>
          <Link
            href="/assessment/how-score"
            className="text-sm font-medium text-primary hover:underline"
          >
            See the explanation
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-3xl border-l-4 border-outline-variant/40 bg-surface-container-lowest p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant">
                <MaterialIcon name="trending_flat" />
              </div>
              <h3 className="text-lg font-bold">Limited upward drivers</h3>
            </div>
            <p className="text-sm text-on-surface-variant">
              Based on your verified fields (young age, normal-range blood pressure, no smoking or
              alcohol, regular activity, normal glucose), the demo does not highlight major
              additive risk factors from this checklist.
            </p>
          </div>

          <div className="rounded-3xl border-l-4 border-primary-container bg-surface-container-lowest p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-container/10 text-primary">
                <MaterialIcon name="trending_down" />
              </div>
              <h3 className="text-lg font-bold">Reducing Risk</h3>
            </div>
            <ul className="space-y-6">
              <li className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-on-surface">Physical activity</p>
                  <p className="text-sm text-on-surface-variant">
                    Active lifestyle reported (training ~5 days/week)
                  </p>
                </div>
                <span className="text-xs font-bold uppercase text-primary">Demo</span>
              </li>
              <li className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-on-surface">No tobacco or alcohol</p>
                  <p className="text-sm text-on-surface-variant">Non-smoker; no alcohol use</p>
                </div>
                <span className="text-xs font-bold uppercase text-primary">Demo</span>
              </li>
              <li className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-on-surface">Blood pressure</p>
                  <p className="text-sm text-on-surface-variant">Readings in a normal range</p>
                </div>
                <span className="text-xs font-bold uppercase text-primary">Demo</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="relative mt-16 flex flex-col items-center gap-12 overflow-hidden rounded-[2rem] bg-primary p-12 text-on-primary md:flex-row">
        <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-primary-container/20 blur-3xl" />
        <div className="relative z-10 flex-1">
          <h2 className="mb-4 text-3xl font-extrabold leading-tight">
            Your health is a journey, not a destination.
          </h2>
          <p className="mb-8 text-lg font-medium text-primary-container opacity-90">
            Schedule a 15-minute introductory call with our clinical health coaches to discuss these
            findings.
          </p>
          <button
            type="button"
            className="rounded-xl bg-surface-container-lowest px-8 py-4 font-bold text-primary shadow-xl transition-transform hover:scale-105"
          >
            Schedule Consultation
          </button>
        </div>
        <div className="relative z-10 w-full md:w-1/3">
          <Image
            src={coachImage}
            alt="Healthcare professional in a clinic"
            width={400}
            height={400}
            className="aspect-square w-full rounded-2xl object-cover shadow-2xl"
          />
        </div>
      </section>
    </main>
  );
}
