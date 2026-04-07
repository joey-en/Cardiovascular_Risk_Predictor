"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MaterialIcon } from "./MaterialIcon";
import { SiteHeader } from "./SiteHeader";

function navClass(active: boolean, extra = "") {
  const base =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-body text-sm";
  if (active) {
    return `${base} bg-surface-container-lowest text-primary font-bold shadow-sm ${extra}`;
  }
  return `${base} text-on-surface hover:bg-surface-container-low hover:translate-x-1 ${extra}`;
}

export function AssessmentShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";

  const isHowScore = pathname.startsWith("/assessment/how-score");
  const inAssessmentFlow =
    pathname.startsWith("/assessment/input") ||
    pathname === "/assessment" ||
    pathname.startsWith("/assessment/review") ||
    pathname.startsWith("/assessment/result");

  const activeAssessment = inAssessmentFlow;
  const activeInsights = isHowScore;

  return (
    <>
      <SiteHeader />

      <div className="flex min-h-screen pt-16">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 flex-col gap-4 bg-surface p-4 lg:flex">
          <div className="px-4 py-6">
            <h2 className="font-headline text-xl font-bold text-primary">Your assessment</h2>
            <p className="text-sm text-on-surface-variant">From description to explanation</p>
          </div>
          <nav className="flex flex-grow flex-col gap-2">
            <Link href="/assessment/input" className={navClass(activeAssessment)}>
              <MaterialIcon name="monitor_heart" filled={activeAssessment} />
              <span>Assessment</span>
            </Link>
            <Link href="/assessment/how-score" className={navClass(activeInsights)}>
              <MaterialIcon name="analytics" filled={activeInsights} />
              <span>Explanation</span>
            </Link>
          </nav>
          <Link
            href="/assessment/input"
            className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-primary to-primary-container px-4 py-3 font-bold text-on-primary transition-all active:scale-95"
          >
            <MaterialIcon name="add" className="text-on-primary" />
            <span>Start over</span>
          </Link>
        </aside>

        <div className="min-w-0 flex-1 pb-20 lg:pb-6">{children}</div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-outline-variant/10 bg-white/90 px-6 py-3 backdrop-blur-xl md:hidden">
        <Link
          href="/assessment/input"
          className={`flex min-w-0 flex-1 flex-col items-center gap-1 ${activeAssessment ? "text-primary" : "text-on-surface-variant"}`}
        >
          <MaterialIcon name="monitor_heart" filled={activeAssessment} />
          <span className="text-[10px] font-bold">Assessment</span>
        </Link>
        <Link
          href="/assessment/how-score"
          className={`flex min-w-0 flex-1 flex-col items-center gap-1 ${activeInsights ? "text-primary" : "text-on-surface-variant"}`}
        >
          <MaterialIcon name="analytics" filled={activeInsights} />
          <span className="text-[10px] font-medium">Explanation</span>
        </Link>
      </nav>
    </>
  );
}
