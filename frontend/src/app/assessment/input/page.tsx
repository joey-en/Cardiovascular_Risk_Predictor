import type { Metadata } from "next";
import Image from "next/image";
import { AssessmentMiniChecklist } from "@/components/AssessmentMiniChecklist";
import { AssessmentStepNav } from "@/components/AssessmentStepNav";
import { HealthDescriptionInput } from "@/components/HealthDescriptionInput";
import { MaterialIcon } from "@/components/MaterialIcon";

export const metadata: Metadata = {
  title: "Heart Health Assessment",
};

const footerImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBqoCUq9ncSLFfjlkCAJTxyAu8eQ5PNmQGe7OH71Il7ATqxGbGrpyNHRc42Ym1NXvWcEB2E-1kO8ZgIi6PUYi0uXcgvm7P4W9pl0GQKyfDgTHqPOnT4MAF413nvm36IQ587bzfS41donhvrwgWfHB0_iGQ1sxuwghtTGYC-ObJgxCX5he6WrxEJd0RMwjAARKokflG17Th90No_hM8xxgDqfIlfzTfc93-9yfdMzd9AHgO65MwGyd5M4B4ckXIFPrTINfPsGqUoq28";

export default function AssessmentInputPage() {
  return (
    <main className="mx-auto max-w-5xl flex-grow p-6 lg:p-12">
      <div className="mb-10">
        <AssessmentStepNav />
      </div>

      <div className="mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">Step 1: Describe</span>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-on-surface lg:text-5xl">
          Heart Health Assessment
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-on-surface-variant">
          You can type or speak naturally. Our system will extract the medical details for you.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-8">
          <HealthDescriptionInput />
        </div>

        <div className="flex flex-col gap-6 lg:col-span-4">
          <AssessmentMiniChecklist />

          <div className="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-3xl bg-primary/5 p-8 text-center transition-colors hover:bg-primary/10 group">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-container shadow-lg transition-transform group-active:scale-95">
              <MaterialIcon name="mic" className="text-3xl text-white" filled />
            </div>
            <div>
              <h3 className="text-lg font-bold text-primary">Record Voice</h3>
              <p className="px-4 text-sm text-on-surface-variant">
                Speak naturally about your current health status
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-3xl bg-surface-container-highest p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                <MaterialIcon name="auto_awesome" className="text-sm text-primary" filled />
              </div>
              <span className="text-sm font-bold">Smart Extraction</span>
            </div>
            <p className="text-xs leading-relaxed text-on-surface-variant">
              Our clinical AI will automatically identify:
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-white/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                Biometrics
              </span>
              <span className="rounded-full bg-white/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                Lifestyle
              </span>
              <span className="rounded-full bg-white/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                Symptoms
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center justify-center gap-4 border-t border-outline-variant/10 pt-10 md:flex-row">
        <div className="flex items-center gap-4 text-on-surface-variant">
          <MaterialIcon name="lock" filled />
          <p className="text-sm">Your data is encrypted and HIPAA compliant.</p>
        </div>
      </div>

      <div className="relative mt-24 h-64 overflow-hidden rounded-3xl">
        <Image
          src={footerImage}
          alt=""
          fill
          className="object-cover opacity-80"
          sizes="(max-width: 1024px) 100vw, 896px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
        <div className="absolute bottom-8 left-8 max-w-md">
          <h4 className="mb-2 text-xl font-bold">Guided by Science</h4>
          <p className="text-sm text-on-surface-variant">
            Validated by cardiologists to ensure the highest standards of digital health triage.
          </p>
        </div>
      </div>
    </main>
  );
}
