import Link from "next/link";
import { ArrowRight, BookOpen, Headphones, SpellCheck } from "lucide-react";

const lessons = [
  {
    title: "Speech and phonetics",
    subtitle: "Module 4: Alveolar trill cadence",
    score: "94% accuracy",
    icon: Headphones,
    href: "/activities/speaking",
  },
  {
    title: "Essential academic lexicon",
    subtitle: "Module 2: Core vocabulary deck",
    score: "98% mastery",
    icon: SpellCheck,
    href: "/activities/vocabulary",
  },
  {
    title: "Syntactic order and tenses",
    subtitle: "Module 3: Perfect tense patterns",
    score: "91% score",
    icon: BookOpen,
    href: "/activities/grammar",
  },
];

export const RecentLessons = () => {
  return (
    <section className="rounded-2xl border border-[#e3ded2] bg-white p-5 shadow-[0_12px_32px_rgba(76,67,40,0.05)] sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl font-extrabold tracking-[-0.02em] text-[#1d1b15] sm:text-2xl">
            Recent lessons
          </h2>
          <p className="mt-1 text-sm text-[#686354]">
            Pick up where you left off.
          </p>
        </div>

        <Link
          href="/activities"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-bold text-[#6e5e06] transition-colors hover:bg-[#f5edbd]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] focus-visible:ring-offset-2 active:translate-y-px"
        >
          All activities
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-5 border-t border-[#ebe7dd]">
        {lessons.map((lesson) => {
          const Icon = lesson.icon;

          return (
            <Link
              key={lesson.title}
              href={lesson.href}
              className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-[#ebe7dd] py-4 transition-colors last:border-b-0 hover:bg-[#faf8f2] focus-visible:rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] focus-visible:ring-offset-2 sm:px-2"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5edbd] text-[#594c05]">
                <Icon className="h-5 w-5" />
              </span>

              <span className="min-w-0">
                <span className="block truncate text-sm font-bold text-[#1d1b15]">
                  {lesson.title}
                </span>
                <span className="mt-0.5 block truncate text-xs text-[#7c7766]">
                  {lesson.subtitle}
                </span>
              </span>

              <span className="flex items-center gap-2">
                <span className="hidden rounded-lg border border-[#ded8ca] bg-white px-2.5 py-1 text-xs font-bold text-[#594c05] sm:inline-flex">
                  {lesson.score}
                </span>
                <ArrowRight className="h-4 w-4 text-[#a7a090] transition-transform group-hover:translate-x-0.5 group-hover:text-[#6e5e06]" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
