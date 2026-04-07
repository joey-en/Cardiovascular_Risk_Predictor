import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AssessmentStepNav } from "@/components/AssessmentStepNav";
import { MaterialIcon } from "@/components/MaterialIcon";

export const metadata: Metadata = {
  title: "Assessment Result",
};

const coachImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCuJiFUs8tjZSJzJk2YKgBsEUd7GMdydsoU-nS2attYPceog9LcY_Z290mN30KsM4t6XPEB7pKRFAvW_VgQGhy_TgqZP5KBb9KDNdycq7p4URhLLAlpjwGbVIbVO9mGKO29GWhiAslYshxuHD-Xm3jp9YoswvttluzPgwRAzlFmpdTrqCaPjSnz_ydlG9SZ9sJ6DkD6Bq7tY8WCA9rzu6JwHgkR3zxF5XpNOEsaMiRhLp3gd12e-st5K76O0xXH863ibXaOq8lmIw4";

export default function AssessmentResultPage() {
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
            Elevated Risk
          </h1>
          <p className="mb-8 max-w-md text-lg leading-relaxed text-on-surface-variant">
            Based on your latest biometrics and lifestyle data, we&apos;ve identified specific areas
            that merit clinical attention. This is a screening tool, not a diagnosis.
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
                strokeDasharray="552.92"
                strokeDashoffset="364.92"
                strokeWidth="12"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-extrabold text-on-surface">34%</span>
              <span className="text-sm font-semibold uppercase tracking-tighter text-on-surface-variant">
                Probability
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-surface-container-lowest/50 px-6 py-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="text-sm font-medium text-on-surface-variant">
              Calibrated against 1.2M cases
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
          <div className="rounded-3xl border-l-4 border-error-container bg-surface-container-lowest p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-error-container/10 text-error">
                <MaterialIcon name="trending_up" />
              </div>
              <h3 className="text-lg font-bold">Increasing Risk</h3>
            </div>
            <ul className="space-y-6">
              <li className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-on-surface">Higher blood pressure</p>
                  <p className="text-sm text-on-surface-variant">
                    Consistent readings above 140/90 mmHg
                  </p>
                </div>
                <span className="text-xs font-bold uppercase text-error">+12%</span>
              </li>
              <li className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-on-surface">Resting Heart Rate</p>
                  <p className="text-sm text-on-surface-variant">
                    82 bpm average (Trend: Increasing)
                  </p>
                </div>
                <span className="text-xs font-bold uppercase text-error">+5%</span>
              </li>
              <li className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-on-surface">Sleep Quality</p>
                  <p className="text-sm text-on-surface-variant">
                    Interruptions detected 4x per night
                  </p>
                </div>
                <span className="text-xs font-bold uppercase text-error">+3%</span>
              </li>
            </ul>
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
                  <p className="font-semibold text-on-surface">Active lifestyle</p>
                  <p className="text-sm text-on-surface-variant">12,000 steps daily average</p>
                </div>
                <span className="text-xs font-bold uppercase text-primary">-8%</span>
              </li>
              <li className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-on-surface">Nutritional Balance</p>
                  <p className="text-sm text-on-surface-variant">
                    High vegetable and lean protein intake
                  </p>
                </div>
                <span className="text-xs font-bold uppercase text-primary">-4%</span>
              </li>
              <li className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-on-surface">Stress Management</p>
                  <p className="text-sm text-on-surface-variant">
                    Daily meditation sessions logged
                  </p>
                </div>
                <span className="text-xs font-bold uppercase text-primary">-2%</span>
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
