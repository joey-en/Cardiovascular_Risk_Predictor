"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MaterialIcon } from "./MaterialIcon";

type StepKey = "input" | "review" | "result" | "insights";

function resolveStep(pathname: string): StepKey {
  if (pathname.startsWith("/assessment/how-score")) return "insights";
  if (pathname.startsWith("/assessment/result")) return "result";
  if (pathname.startsWith("/assessment/review")) return "review";
  return "input";
}

const ITEMS: { key: StepKey; title: string; href: string }[] = [
  { key: "input", title: "Describe your health (input)", href: "/assessment/input" },
  { key: "review", title: "Process & verify details", href: "/assessment/review" },
  { key: "result", title: "Generate prediction & view result", href: "/assessment/result" },
];

export function AssessmentMiniChecklist() {
  const pathname = usePathname() ?? "";
  const current = resolveStep(pathname);
  const rank: Record<StepKey, number> = { input: 0, review: 1, result: 2, insights: 3 };

  return (
    <aside className="rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-5 shadow-sm">
      <p className="mb-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
        Your path
      </p>
      <ul className="space-y-3">
        {ITEMS.map((item) => {
          const r = rank[current];
          const ir = rank[item.key];
          const done = r > ir || current === "insights";
          const here = current === item.key;

          return (
            <li key={item.key}>
              <Link
                href={item.href}
                className={`flex items-start gap-3 rounded-xl p-2 transition-colors hover:bg-surface-container-low ${
                  here ? "bg-primary/10 ring-1 ring-primary/20" : ""
                }`}
              >
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                    here
                      ? "bg-primary text-on-primary"
                      : done
                        ? "bg-primary-container/50 text-primary-dim"
                        : "border border-outline-variant/40 bg-surface-container-lowest text-on-surface-variant"
                  }`}
                >
                  {done && !here ? <MaterialIcon name="check" className="text-[16px]" filled /> : ir + 1}
                </span>
                <span
                  className={`text-sm leading-snug ${here ? "font-semibold text-on-surface" : "text-on-surface-variant"}`}
                >
                  {item.title}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <Link
        href="/assessment/how-score"
        className="mt-4 flex items-center gap-2 rounded-xl p-2 text-sm font-semibold text-primary/90 transition-colors hover:bg-surface-container-low"
      >
        <MaterialIcon name="analytics" className="text-lg" />
        <span>See the explanation (methodology)</span>
        <MaterialIcon name="chevron_right" className="ml-auto text-lg" />
      </Link>
    </aside>
  );
}
