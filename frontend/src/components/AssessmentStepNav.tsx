"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MaterialIcon } from "./MaterialIcon";

const STEPS = [
  {
    href: "/assessment/input",
    key: "input" as const,
    label: "Input",
    hint: "Describe your health",
  },
  {
    href: "/assessment/review",
    key: "review" as const,
    label: "Verify",
    hint: "Process & confirm details",
  },
  {
    href: "/assessment/result",
    key: "result" as const,
    label: "Prediction",
    hint: "Generate & view result",
  },
];

export type FlowStep = "input" | "review" | "result" | "insights";

function resolveStep(pathname: string): FlowStep {
  if (pathname.startsWith("/assessment/how-score")) return "insights";
  if (pathname.startsWith("/assessment/result")) return "result";
  if (pathname.startsWith("/assessment/review")) return "review";
  return "input";
}

export function AssessmentStepNav() {
  const pathname = usePathname() ?? "";
  const current = resolveStep(pathname);
  const order: FlowStep[] = ["input", "review", "result", "insights"];
  const currentOrder = order.indexOf(current);

  return (
    <nav aria-label="Assessment progress" className="w-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-stretch sm:gap-3">
        {STEPS.map((step, i) => {
          const done = currentOrder > i || current === "insights";
          const isHere = current === step.key;

          return (
            <Link
              key={step.key}
              href={step.href}
              className={`flex min-w-0 flex-1 items-center gap-3 rounded-2xl border px-4 py-3 transition-colors sm:min-w-[140px] sm:flex-col sm:items-start sm:py-4 ${
                isHere
                  ? "border-primary/40 bg-primary/10 shadow-sm"
                  : "border-transparent bg-surface-container-low hover:bg-surface-container-high/80"
              }`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  isHere
                    ? "bg-primary text-on-primary"
                    : done
                      ? "bg-primary-container/40 text-primary-dim"
                      : "bg-surface-container-highest text-on-surface-variant"
                }`}
              >
                {done && !isHere ? (
                  <MaterialIcon name="check" className="text-[20px]" filled />
                ) : (
                  i + 1
                )}
              </span>
              <div className="min-w-0 text-left sm:w-full">
                <p
                  className={`text-sm font-bold leading-tight ${isHere ? "text-primary" : "text-on-surface"}`}
                >
                  {step.label}
                </p>
                <p className="text-xs text-on-surface-variant">{step.hint}</p>
              </div>
            </Link>
          );
        })}

        {current === "insights" ? (
          <div className="flex min-w-0 flex-1 flex-col justify-center rounded-2xl border border-primary/40 bg-primary/10 px-4 py-3 shadow-sm sm:min-w-[160px] sm:py-4">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-on-primary">
                <MaterialIcon name="analytics" className="text-[22px]" filled />
              </span>
              <div>
                <p className="text-sm font-bold leading-tight text-primary">Explanation</p>
                <p className="text-xs text-on-surface-variant">How your score was calculated</p>
              </div>
            </div>
          </div>
        ) : (
          <Link
            href="/assessment/how-score"
            className="flex min-w-0 flex-1 flex-col justify-center rounded-2xl border border-transparent bg-surface-container-low/90 px-4 py-3 transition-colors hover:bg-surface-container-high sm:min-w-[160px] sm:py-4"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-sm font-bold text-on-surface-variant">
                <MaterialIcon name="analytics" className="text-[22px]" />
              </span>
              <div>
                <p className="text-sm font-bold leading-tight text-on-surface">Explanation</p>
                <p className="text-xs text-on-surface-variant">See how your score was calculated</p>
              </div>
            </div>
            <span className="mt-3 text-xs font-semibold text-primary sm:mt-2">
              Open explanation →
            </span>
          </Link>
        )}
      </div>
      <p className="mt-3 text-xs text-on-surface-variant">
        Landing → describe your health → verify details → view prediction → read the explanation.
      </p>
    </nav>
  );
}
