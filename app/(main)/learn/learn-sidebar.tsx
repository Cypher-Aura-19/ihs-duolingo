import type { PropsWithChildren } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Headphones, Mic, Sparkles } from "lucide-react";

type LearnSidebarProps = PropsWithChildren<{
  courseTitle: string;
  courseImage: string;
  currentUnitTitle: string;
  currentLessonTitle: string;
  completedLessons: number;
  totalLessons: number;
  lessonPercentage: number;
}>;

export const LearnSidebar = ({
  children,
  courseTitle,
  courseImage,
  currentUnitTitle,
  currentLessonTitle,
  completedLessons,
  totalLessons,
  lessonPercentage,
}: LearnSidebarProps) => {
  const coursePercentage =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const filledSegments = Math.round(coursePercentage / 10);

  return (
    <div className="sticky top-6 space-y-5">
      <div className="rounded-2xl border border-[#e3ded2] bg-white p-2 shadow-[0_8px_24px_rgba(76,67,40,0.05)]">
        {children}
      </div>

      <section className="overflow-hidden rounded-2xl border border-[#e3ded2] bg-white shadow-[0_12px_32px_rgba(76,67,40,0.06)]">
        <div className="relative min-h-36 overflow-hidden bg-[#f5edbd] p-5">
          <div className="relative max-w-[180px]">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-lg border border-[#d9cfac] bg-white">
                <Image
                  src={courseImage}
                  alt=""
                  fill
                  className="object-cover p-1"
                  sizes="32px"
                />
              </div>
              <p className="text-xs font-bold text-[#594c05]">{courseTitle}</p>
            </div>
            <h2 className="mt-4 font-heading text-xl font-extrabold tracking-[-0.02em] text-[#1d1b15]">
              Ready for the next lesson?
            </h2>
          </div>

          <Image
            src="/mascot.svg"
            alt=""
            width={104}
            height={104}
            loading="eager"
            className="absolute -bottom-2 -right-1 h-[104px] w-[104px] object-contain"
          />
        </div>

        <div className="p-5">
          <p className="text-xs font-semibold text-[#7c7766]">
            {currentUnitTitle}
          </p>
          <h3 className="mt-1 font-heading text-lg font-extrabold text-[#1d1b15]">
            {currentLessonTitle}
          </h3>
          <p className="mt-2 text-sm text-[#686354]">
            {lessonPercentage > 0
              ? `${lessonPercentage}% complete. Continue from your last answer.`
              : "A short lesson is ready whenever you are."}
          </p>

          <Link
            href="/lesson"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#6e5e06] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#5c4e04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] focus-visible:ring-offset-2 active:translate-y-px"
          >
            Continue learning
            <ArrowRight className="h-4 w-4" />
          </Link>

          <div className="mt-5 border-t border-[#ebe7dd] pt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#686354]">
                Course progress
              </span>
              <span className="font-bold tabular-nums text-[#1d1b15]">
                {completedLessons} of {totalLessons} lessons
              </span>
            </div>
            <div className="mt-3 grid grid-cols-10 gap-1.5" aria-hidden="true">
              {Array.from({ length: 10 }, (_, index) => (
                <span
                  key={index}
                  className={`h-1.5 rounded-sm ${
                    index < filledSegments ? "bg-[#6e5e06]" : "bg-[#e8e3d8]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-[#e3ded2] bg-white p-5 shadow-[0_12px_32px_rgba(76,67,40,0.05)]">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#6e5e06]" />
          <h2 className="font-heading text-lg font-extrabold text-[#1d1b15]">
            Practice corner
          </h2>
        </div>
        <p className="mt-1 text-sm text-[#686354]">
          Build confidence between lessons.
        </p>

        <div className="mt-4 space-y-2">
          <Link
            href="/activities/speaking"
            className="group flex items-center gap-3 rounded-xl bg-[#faf8f2] p-3 transition-colors hover:bg-[#f5edbd]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] focus-visible:ring-offset-2"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5edbd] text-[#594c05]">
              <Mic className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-bold text-[#1d1b15]">
                Speaking practice
              </span>
              <span className="block text-xs text-[#7c7766]">
                Work on pronunciation
              </span>
            </span>
            <ArrowRight className="h-4 w-4 text-[#a7a090] transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="/activities/listening"
            className="group flex items-center gap-3 rounded-xl bg-[#faf8f2] p-3 transition-colors hover:bg-[#f5edbd]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] focus-visible:ring-offset-2"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5edbd] text-[#594c05]">
              <Headphones className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-bold text-[#1d1b15]">
                Listening practice
              </span>
              <span className="block text-xs text-[#7c7766]">
                Train your ear
              </span>
            </span>
            <ArrowRight className="h-4 w-4 text-[#a7a090] transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <Link
          href="/activities"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#6e5e06] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] focus-visible:ring-offset-2"
        >
          <BookOpen className="h-4 w-4" />
          View all activities
        </Link>
      </section>
    </div>
  );
};
