import { ArrowRight, Award, CalendarCheck2, Mic2, Target } from "lucide-react";
import Link from "next/link";

export function ActivitiesSidebarSummary() {
  return (
    <aside className="space-y-4" aria-label="Practice summary">
      <section className="rounded-2xl border border-[#d8cfaf] bg-[#fff9ee] p-5 shadow-[0_12px_30px_rgba(76,67,40,0.06)]">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dcc669] bg-[#fae282] text-[#534600]">
            <Target className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-heading text-sm font-extrabold text-[#1d1b15]">
              Today&apos;s focus
            </h2>
            <p className="text-xs text-[#6d6858]">Pronunciation and rhythm</p>
          </div>
        </div>
        <p className="text-sm leading-6 text-[#5f5a49]">
          Your speaking score trails vocabulary. One short read-aloud session
          will balance this milestone.
        </p>
        <Link
          href="/activities/speaking"
          prefetch
          className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#514501] bg-[#6e5e06] px-4 text-sm font-extrabold text-[#fffdf6] shadow-[0_4px_0_#443a01] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] focus-visible:ring-offset-2 active:translate-y-1 active:shadow-none motion-reduce:transform-none"
        >
          <Mic2 className="h-4 w-4" aria-hidden="true" />
          Start speaking
        </Link>
      </section>

      <section className="rounded-2xl border border-[#e3ded2] bg-white p-5 shadow-[0_12px_30px_rgba(76,67,40,0.05)]">
        <div className="flex items-center gap-3">
          <CalendarCheck2
            className="h-5 w-5 text-[#6e5e06]"
            aria-hidden="true"
          />
          <div>
            <h2 className="font-heading text-sm font-extrabold text-[#1d1b15]">
              Weekly practice
            </h2>
            <p className="text-xs text-[#6d6858]">4 of 5 sessions complete</p>
          </div>
        </div>
        <div
          className="mt-4 grid grid-cols-5 gap-2"
          aria-label="Four of five weekly sessions complete"
        >
          {[true, true, true, true, false].map((complete, index) => (
            <span
              key={index}
              className={`flex h-9 items-center justify-center rounded-lg border text-xs font-extrabold ${
                complete
                  ? "border-[#6e5e06] bg-[#6e5e06] text-white"
                  : "border-[#dcd6ca] bg-[#f6f1e8] text-[#8a8576]"
              }`}
            >
              {index + 1}
            </span>
          ))}
        </div>
      </section>

      <Link
        href="/activities/milestone"
        prefetch
        className="group flex items-center justify-between rounded-2xl border border-[#e3ded2] bg-white p-5 shadow-[0_12px_30px_rgba(76,67,40,0.05)] transition-colors hover:border-[#b8a744] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] focus-visible:ring-offset-2"
      >
        <span className="flex items-center gap-3">
          <Award className="h-5 w-5 text-[#6e5e06]" aria-hidden="true" />
          <span>
            <span className="block font-heading text-sm font-extrabold text-[#1d1b15]">
              Milestone exam
            </span>
            <span className="text-xs text-[#6d6858]">70% required to pass</span>
          </span>
        </span>
        <ArrowRight className="h-4 w-4 text-[#6e5e06] transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none" />
      </Link>
    </aside>
  );
}
