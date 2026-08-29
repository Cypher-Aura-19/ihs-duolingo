import type { LucideIcon } from "lucide-react";
import { ArrowLeft, Check, Lightbulb, ShieldCheck } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type ActivityShellProps = {
  children: ReactNode;
  description: string;
  icon: LucideIcon;
  label: string;
  step: number;
  stepLabel: string;
  tip: string;
  title: string;
  totalSteps: number;
  evaluation: string;
};

export function ActivityShell({
  children,
  description,
  icon: Icon,
  label,
  step,
  stepLabel,
  tip,
  title,
  totalSteps,
  evaluation,
}: ActivityShellProps) {
  return (
    <div className="mx-auto w-full max-w-[1120px] px-4 pb-16 sm:px-6">
      <nav
        className="flex min-h-16 items-center justify-between border-b border-[#e3ded2]"
        aria-label="Activity navigation"
      >
        <Link
          href="/activities"
          prefetch
          className="group inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-bold text-[#4b4738] transition-colors hover:bg-[#f3ede2] hover:text-[#1d1b15] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] focus-visible:ring-offset-2"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5 motion-reduce:transform-none" />
          Practice studio
        </Link>
        <span className="hidden text-xs font-bold text-[#6e5e06] sm:block">
          {label}
        </span>
      </nav>

      <header className="grid gap-5 py-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#dcc669] bg-[#fae282] text-[#534600] shadow-[0_6px_0_#d5c05e]">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <p className="mb-1 text-xs font-bold text-[#6e5e06]">{stepLabel}</p>
            <h1 className="font-heading text-2xl font-extrabold tracking-[-0.03em] text-[#1d1b15] sm:text-3xl">
              {title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5f5a49]">
              {description}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#e3ded2] bg-white px-4 py-3 shadow-[0_8px_24px_rgba(76,67,40,0.05)]">
          <div className="mb-2 flex items-center justify-between gap-6 text-xs font-bold">
            <span className="text-[#6e5e06]">Activity progress</span>
            <span className="text-[#4b4738]">
              {step} / {totalSteps}
            </span>
          </div>
          <div
            className="flex gap-1.5"
            aria-label={`Step ${step} of ${totalSteps}`}
          >
            {Array.from({ length: totalSteps }, (_, index) => (
              <span
                key={index}
                className={`h-2.5 w-8 rounded-sm border ${
                  index < step
                    ? "border-[#6e5e06] bg-[#6e5e06]"
                    : "border-[#d9d3c6] bg-[#f3ede2]"
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
        <main className="min-w-0">{children}</main>

        <aside
          className="grid gap-4 lg:sticky lg:top-6"
          aria-label="Activity guidance"
        >
          <section className="rounded-2xl border border-[#e3ded2] bg-white p-5 shadow-[0_12px_32px_rgba(76,67,40,0.05)]">
            <div className="mb-3 flex items-center gap-2 text-[#6e5e06]">
              <Lightbulb className="h-4 w-4" aria-hidden="true" />
              <h2 className="text-sm font-extrabold">Quick tip</h2>
            </div>
            <p className="text-sm leading-6 text-[#5f5a49]">{tip}</p>
          </section>

          <section className="rounded-2xl border border-[#d8cfaf] bg-[#fff9ee] p-5">
            <div className="mb-3 flex items-center gap-2 text-[#534600]">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              <h2 className="text-sm font-extrabold">How it is checked</h2>
            </div>
            <p className="text-sm leading-6 text-[#5f5a49]">{evaluation}</p>
            <div className="mt-4 flex items-center gap-2 border-t border-[#e5dbb8] pt-4 text-xs font-bold text-[#6e5e06]">
              <Check className="h-4 w-4" aria-hidden="true" />
              Progress saves after completion
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
