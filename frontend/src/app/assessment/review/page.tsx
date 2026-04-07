import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AssessmentStepNav } from "@/components/AssessmentStepNav";
import { MaterialIcon } from "@/components/MaterialIcon";

export const metadata: Metadata = {
  title: "Review & Confirm Information",
};

const heroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBQM10yCN3-sZhbLzMzdOxK3MIs9ePqnw-NGmfa4N7hkyg6u-PgB60ZJBMNxDysE_fIC6td3ozJxwhoKJkwLtYtUvChonNRLRyYBbbSq36w5M7JGJfF5j6V7ZcgWS3-reejEv67cG5eYkjN4u4A50sXujFEmJcUgFUKWbZvlwT1wImLAudo6sVaxX6_vS_jRsSoJ_nbQijuwwFCatLX3kPOv2BMfdDSEjttPmDX6XL_DYi1hAUljiGIpTrfolIQMFWcq6g1W9chV2s";

export default function ReviewPage() {
  return (
    <main className="mx-auto max-w-5xl flex-1 px-6 py-10 md:px-12">
      <div className="mb-10">
        <AssessmentStepNav />
      </div>

      <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Step 2: Verify</span>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-on-surface">Confirm Details</h1>
      </div>

      <div className="mb-10 rounded-xl border-l-4 border-primary/30 bg-surface-container-low p-6">
        <p className="italic leading-relaxed text-on-surface">
          &quot;Please confirm the details we extracted from your input. Ensure everything is accurate
          for the most precise health prediction.&quot;
        </p>
      </div>

      <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-12">
        <section className="rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-sm md:col-span-12 lg:col-span-5">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-container">
              <MaterialIcon name="person" className="text-on-secondary-container" />
            </div>
            <h2 className="text-xl font-bold text-on-surface">Basic Info</h2>
          </div>
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Age (Years)
              </label>
              <input
                className="w-full rounded-lg border-none bg-surface-container-low p-3 font-semibold text-on-surface transition-all focus:ring-2 focus:ring-primary/20"
                type="number"
                defaultValue={34}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Height (cm)
                </label>
                <input
                  className="w-full rounded-lg border-none bg-surface-container-low p-3 font-semibold text-on-surface transition-all focus:ring-2 focus:ring-primary/20"
                  type="number"
                  defaultValue={178}
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Weight (kg)
                </label>
                <input
                  className="w-full rounded-lg border-none bg-surface-container-low p-3 font-semibold text-on-surface transition-all focus:ring-2 focus:ring-primary/20"
                  type="number"
                  defaultValue={82}
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Gender
              </label>
              <select className="w-full rounded-lg border-none bg-surface-container-low p-3 font-semibold text-on-surface transition-all focus:ring-2 focus:ring-primary/20">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-sm md:col-span-12 lg:col-span-7">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary-container">
              <MaterialIcon name="vital_signs" className="text-on-tertiary-container" />
            </div>
            <h2 className="text-xl font-bold text-on-surface">Measurements</h2>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Systolic BP
                </label>
                <input
                  className="w-full rounded-lg border-none bg-surface-container-low p-3 font-semibold text-on-surface transition-all focus:ring-2 focus:ring-primary/20"
                  type="number"
                  defaultValue={120}
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Diastolic BP
                </label>
                <input
                  className="w-full rounded-lg border-none bg-surface-container-low p-3 font-semibold text-on-surface transition-all focus:ring-2 focus:ring-primary/20"
                  type="number"
                  defaultValue={80}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Cholesterol Level
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="flex-1 rounded bg-primary py-2 font-bold text-white"
                  >
                    1
                  </button>
                  <button
                    type="button"
                    className="flex-1 rounded bg-surface-container-low py-2 font-bold text-on-surface-variant transition-colors hover:bg-surface-container-high"
                  >
                    2
                  </button>
                  <button
                    type="button"
                    className="flex-1 rounded bg-surface-container-low py-2 font-bold text-on-surface-variant transition-colors hover:bg-surface-container-high"
                  >
                    3
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Glucose Level
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="flex-1 rounded bg-surface-container-low py-2 font-bold text-on-surface-variant transition-colors hover:bg-surface-container-high"
                  >
                    1
                  </button>
                  <button
                    type="button"
                    className="flex-1 rounded bg-primary py-2 font-bold text-white"
                  >
                    2
                  </button>
                  <button
                    type="button"
                    className="flex-1 rounded bg-surface-container-low py-2 font-bold text-on-surface-variant transition-colors hover:bg-surface-container-high"
                  >
                    3
                  </button>
                </div>
                <p className="mt-1 flex items-center gap-1 text-[10px] text-error">
                  <MaterialIcon name="error" className="text-sm" />
                  High level detected in last scan
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-xl bg-surface-container-low p-8 md:col-span-12">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <MaterialIcon name="spa" className="text-primary" />
              </div>
              <h2 className="text-xl font-bold text-on-surface">Lifestyle</h2>
            </div>
            <span className="animate-pulse rounded-full bg-error/10 px-3 py-1 text-[10px] font-bold uppercase text-error">
              1 Missing Field
            </span>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Smoking Status
              </label>
              <select className="w-full rounded-lg border-none bg-surface-container-lowest p-3 font-semibold text-on-surface transition-all focus:ring-2 focus:ring-primary/20">
                <option>Non-smoker</option>
                <option>Occasional</option>
                <option>Regular</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Alcohol Consumption
              </label>
              <select className="w-full rounded-lg border-none bg-surface-container-lowest p-3 font-semibold text-on-surface transition-all focus:ring-2 focus:ring-primary/20">
                <option>None</option>
                <option>Social</option>
                <option>Regular</option>
              </select>
            </div>
            <div className="relative">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Physical Activity
              </label>
              <div className="flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-dashed border-error/20 bg-error-container/10 p-3 font-semibold text-error transition-all hover:bg-error-container/20">
                <span>Please select...</span>
                <MaterialIcon name="keyboard_arrow_down" />
              </div>
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
