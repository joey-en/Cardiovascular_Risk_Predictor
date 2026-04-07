import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "@/components/MaterialIcon";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Heart Health Assessment",
};

const heroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCro_2Kn8SCxAXtNTHheJZiL64okOH3nhxRG1bI5zX7UAjfbCdoCh7IZVf6HVhu2GbaPphBluOQrqc8LlOr9cqPPi8KY4YIP0JJDYIVSEGbMB-G_x6TpRjDoEIhv5X4La48O1tBrbQRf1P1-4x9xdO-cOCc9pnzvUqzQ_ATI8fpz_lcLZcpdP1PYTNI4IsADcOzLVi7Y96urkpq29Xeu02gDSNL7s_Q8G9QiKCxDZrpBKKe6eg6l5puaniiA8Q1INJrEQqp_UsgpBw";

export default function WelcomePage() {
  return (
    <>
      <SiteHeader />

      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-12 pt-24">
        <div className="absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-primary-container/10 blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[-5%] h-[30%] w-[30%] rounded-full bg-secondary-container/20 blur-[100px]" />

        <section className="relative z-10 grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-8 text-left lg:col-span-7">
            <div className="space-y-6">
              <span className="inline-block rounded-full bg-primary-container/20 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-primary-dim">
                Digital Wellness Companion
              </span>
              <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-on-surface md:text-7xl">
                Understand Your <span className="font-medium italic text-primary">Heart</span> Health.
              </h1>
              <p className="max-w-xl text-xl font-light leading-relaxed text-on-surface-variant">
                A simple tool to help you understand your cardiovascular risk factors. Take a moment
                to focus on your well-being in our digital sanctuary.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 pt-4 sm:flex-row sm:items-center">
              <Link
                href="/assessment/input"
                className="rounded-xl bg-gradient-to-br from-primary to-primary-container px-8 py-4 text-lg font-bold text-on-primary shadow-lg transition-all hover:scale-[1.02] hover:shadow-primary/20 active:scale-95"
              >
                Start Assessment
              </Link>
              <div className="flex items-center gap-3 px-4 py-2 text-sm font-medium italic text-on-surface-variant">
                <MaterialIcon name="timer" className="text-primary" />
                Takes about 3 minutes
              </div>
            </div>
            <div className="mt-8 max-w-lg rounded-xl border-l-4 border-primary/30 bg-surface-container-low p-6">
              <div className="flex gap-4">
                <MaterialIcon name="info" className="shrink-0 text-primary" />
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  Please note: This is not a medical diagnosis and is for informational purposes only.
                  Always consult with a healthcare professional for clinical advice.
                </p>
              </div>
            </div>
          </div>

          <div className="relative grid grid-cols-2 gap-4 lg:col-span-5">
            <div className="group relative col-span-2 aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src={heroImage}
                alt="Heart health concept: digital monitor with heart icon"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 42vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-white/20 p-4 backdrop-blur-md">
                <div className="flex items-center justify-between text-white">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest opacity-80">
                      Active Pulse
                    </p>
                    <p className="text-lg font-bold">Rhythmic Stability</p>
                  </div>
                  <MaterialIcon name="favorite" className="text-3xl" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-container text-on-secondary-container">
                <MaterialIcon name="analytics" />
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface-variant">Insights</p>
                <p className="text-xl font-bold text-on-surface">Data-Driven</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-3xl bg-surface-container-highest p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-container text-on-primary-container">
                <MaterialIcon name="shield_with_heart" />
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface-variant">Security</p>
                <p className="text-xl font-bold text-on-surface">Privacy First</p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mt-24 w-full max-w-7xl border-t border-outline-variant/10 pt-12">
          <p className="mb-10 text-center text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">
            Grounded in Clinical Research &amp; Data Transparency
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-50 grayscale transition-all duration-500 hover:grayscale-0 md:gap-24">
            <div className="flex items-center gap-2 font-headline text-xl font-bold">
              <MaterialIcon name="medical_services" className="text-primary" />
              HealthStandard
            </div>
            <div className="flex items-center gap-2 font-headline text-xl font-bold">
              <MaterialIcon name="verified_user" className="text-primary" />
              SecureLabs
            </div>
            <div className="flex items-center gap-2 font-headline text-xl font-bold">
              <MaterialIcon name="biotech" className="text-primary" />
              BioCore
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-surface-container-low px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
          <div className="text-sm font-medium text-on-surface-variant">
            © {new Date().getFullYear()} Sanctuary Health. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm font-semibold text-primary">
            <a className="hover:underline" href="#">
              Privacy Policy
            </a>
            <a className="hover:underline" href="#">
              Terms of Service
            </a>
            <a className="hover:underline" href="#">
              Data Methodology
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
