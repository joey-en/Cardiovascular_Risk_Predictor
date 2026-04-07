import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AssessmentStepNav } from "@/components/AssessmentStepNav";
import { MaterialIcon } from "@/components/MaterialIcon";

export const metadata: Metadata = {
  title: "How We Calculated Your Score",
};

const saladImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB_2Iqddzv1J9zrNPhRPbjeXiz0P_rhJoocsq1k34xHKzPSji2erhd0XaWz6MYuuCFVli7a1HGQBusPxsk3OBY9YUsX8gIqVDPaxiZp1ll3t_a_tjkfY5N1n9c0Kk6xbLH-m7iIvyNZjC0e_vgrxlLTMIDNWBAy6YqEIT1n0feTuvOyzfT4jAIRBqOHv4C6Eo0iDURtw2r8M2UZvA_wvDCjZYELIjtPHMpG6-lHVdc1vyyioEGN1gnLTFVQRXWz1P7FFvQe5wA4a50";

const doctorImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD75eJfiiOB1vAPEGA2Bwgwf6RYmcV_fzdqfZ7Yh-S0_KFVBXbLlLDqRZbeCMz1I9HSZUTKvt7N78ZJLnwA5mF2EW86C7b8XlBQQCec3E9HxfYfuj1YkC0ohDeeAOySwB5zMlTrUM25sAyBjssuMcR9ufUO4DknIRQiDsSBIpujI6lOskQDOqpHXr62wfpDdrdl2XYmu0jYVAQUqlb7frk0WocgvSok-pOsQCWTTcBYddpGPaSmA75lHbraYRJq6vL-DttDGvOZEco";

export default function HowScorePage() {
  return (
    <main className="mx-auto max-w-5xl flex-grow p-6 lg:p-12">
      <div className="mb-10">
        <AssessmentStepNav />
      </div>

      <header className="mb-12">
        <div className="mb-4 inline-flex items-center rounded-full bg-error-container/10 px-3 py-1 text-xs font-medium text-error">
          <span className="soft-pulse mr-2 h-2 w-2 rounded-full bg-error" />
          Action Recommended
        </div>
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-on-surface lg:text-5xl">
          Elevated Risk (34%)
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-on-surface-variant">
          Based on your latest biometrics and medical history, your cardiovascular risk score is
          currently above the optimal range.
        </p>
      </header>

      <div className="grid grid-cols-12 items-start gap-8">
        <div className="col-span-12 space-y-8 lg:col-span-8">
          <section className="rounded-[2rem] bg-surface-container-low p-8">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="mb-1 text-2xl font-bold text-on-surface">
                  How We Calculated Your Score
                </h2>
                <p className="text-sm text-on-surface-variant">
                  A personalized breakdown of the factors influencing your health profile.
                </p>
              </div>
              <div className="hidden sm:block">
                <MaterialIcon name="neurology" className="text-4xl text-primary/40" />
              </div>
            </div>

            <div className="space-y-12">
              <div>
                <h3 className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-error">
                  Factors that Increased Risk{" "}
                  <MaterialIcon name="trending_up" className="text-sm" />
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-error-container/20 text-error">
                          <MaterialIcon name="blood_pressure" />
                        </div>
                        <div>
                          <p className="font-bold text-on-surface">Systolic BP (145/90)</p>
                          <p className="text-xs text-on-surface-variant">Primary risk driver detected</p>
                        </div>
                      </div>
                      <span className="text-right text-lg font-bold text-error">+12%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
                      <div className="h-full w-[75%] rounded-full bg-error" />
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-error-container/20 text-error">
                          <MaterialIcon name="calendar_today" />
                        </div>
                        <div>
                          <p className="font-bold text-on-surface">Age Factor (58)</p>
                          <p className="text-xs text-on-surface-variant">
                            Demographic baseline adjustment
                          </p>
                        </div>
                      </div>
                      <span className="text-right text-lg font-bold text-error">+8%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
                      <div className="h-full w-1/2 rounded-full bg-error" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                  Factors that Reduced Risk{" "}
                  <MaterialIcon name="trending_down" className="text-sm" />
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-container/30 text-primary">
                          <MaterialIcon name="directions_run" />
                        </div>
                        <div>
                          <p className="font-bold text-on-surface">Active Lifestyle</p>
                          <p className="text-xs text-on-surface-variant">
                            High cardiovascular resilience
                          </p>
                        </div>
                      </div>
                      <span className="text-right text-lg font-bold text-primary">-5%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
                      <div className="ml-auto h-full w-[35%] rounded-full bg-primary" />
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-container/30 text-primary">
                          <MaterialIcon name="smoke_free" />
                        </div>
                        <div>
                          <p className="font-bold text-on-surface">Non-Smoker Status</p>
                          <p className="text-xs text-on-surface-variant">
                            Significant protective factor
                          </p>
                        </div>
                      </div>
                      <span className="text-right text-lg font-bold text-primary">-3%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
                      <div className="ml-auto h-full w-1/5 rounded-full bg-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="relative flex flex-col items-center gap-8 overflow-hidden rounded-[2rem] bg-primary-container p-10 md:flex-row">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="z-10 flex-1">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-on-primary-container">
                Priority Action
              </h3>
              <p className="mb-6 text-3xl font-extrabold leading-tight text-on-primary-container">
                Lowering your systolic BP to{" "}
                <span className="text-white underline decoration-white/30 underline-offset-8">
                  120
                </span>{" "}
                would reduce your overall risk by{" "}
                <span className="rounded-lg bg-white/20 px-2 py-1">15%</span>.
              </p>
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl bg-on-primary-container px-8 py-4 font-bold text-white transition-transform hover:scale-[1.02]"
              >
                See Recommended Plan <MaterialIcon name="arrow_forward" />
              </button>
            </div>
            <div className="relative z-10 flex h-48 w-48 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-md">
              <div className="text-center">
                <span className="block text-4xl font-black text-on-primary-container">-15%</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-primary-container">
                  Potential Risk
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 space-y-8 lg:col-span-4">
          <div className="rounded-[2rem] bg-surface-container-highest p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
              <MaterialIcon name="auto_awesome" className="text-primary" />
            </div>
            <h4 className="mb-4 text-lg font-bold text-on-surface">How we analyze you</h4>
            <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">
              Our AI doesn&apos;t just look at numbers in isolation. It analyzes over{" "}
              <span className="font-bold">200 data points</span> including your genetics, lifestyle, and
              environment to find hidden patterns.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MaterialIcon name="verified" className="mt-0.5 text-primary" style={{ fontSize: 18 }} />
                <p className="text-xs text-on-surface-variant">
                  <span className="font-bold text-on-surface">Holistic Data:</span> We combine labs with
                  wearable data.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <MaterialIcon
                  name="query_stats"
                  className="mt-0.5 text-primary"
                  style={{ fontSize: 18 }}
                />
                <p className="text-xs text-on-surface-variant">
                  <span className="font-bold text-on-surface">Trend-Aware:</span> We focus on where your
                  health is moving, not just where it is today.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <Image
              src={saladImage}
              alt="Healthy nutrition concept"
              width={400}
              height={160}
              className="mb-6 h-40 w-full rounded-2xl object-cover"
            />
            <h4 className="mb-2 text-lg font-bold text-on-surface">Did you know?</h4>
            <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">
              Increasing your potassium intake can naturally help offset the effects of sodium on your
              blood pressure.
            </p>
            <span className="group flex cursor-not-allowed items-center gap-1 text-sm font-bold text-primary/70">
              Discover nutrition tips
              <MaterialIcon
                name="chevron_right"
                className="text-sm transition-transform group-hover:translate-x-1"
              />
            </span>
          </div>

          <div className="rounded-[2rem] border border-secondary-container/30 bg-secondary-container/20 p-8">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-secondary">
              Your Expert Support
            </h4>
            <div className="mb-6 flex items-center gap-4">
              <Image
                src={doctorImage}
                alt="Dr. Sarah Jenkins"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-bold text-on-surface">Dr. Sarah Jenkins</p>
                <p className="text-xs text-on-surface-variant">Cardiologist</p>
              </div>
            </div>
            <button
              type="button"
              className="w-full rounded-xl border border-secondary-container/50 bg-white py-3 text-sm font-bold text-on-surface transition-colors hover:bg-secondary-container/10"
            >
              Message Doctor
            </button>
          </div>
        </div>
      </div>

      <p className="mt-12 text-center text-sm text-on-surface-variant">
        <Link href="/assessment/result" className="font-semibold text-primary hover:underline">
          ← Back to assessment result
        </Link>
      </p>
    </main>
  );
}
