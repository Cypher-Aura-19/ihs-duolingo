import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  FileCheck2,
  Headphones,
  Mic2,
  PenLine,
  PlaySquare,
  Puzzle,
  Sparkles,
  SpellCheck2,
  Timer,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { ActivitiesSidebarSummary } from "@/components/activities/activities-sidebar-summary";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress, getUserSubscription } from "@/db/queries";

export const dynamic = "force-dynamic";

const activities = [
  {
    title: "Speaking lab",
    href: "/activities/speaking",
    description:
      "Read aloud, record a short response, then review pronunciation and fluency feedback.",
    icon: Mic2,
    time: "6 min",
    progress: "Recommended",
    featured: true,
  },
  {
    title: "Vocabulary cards",
    href: "/activities/vocabulary",
    description:
      "Flip through a focused deck, then pair English words with their meanings.",
    icon: SpellCheck2,
    time: "5 min",
    progress: "4 cards",
  },
  {
    title: "Grammar builder",
    href: "/activities/grammar",
    description:
      "Arrange word tiles into natural English sentences with instant rule hints.",
    icon: Puzzle,
    time: "7 min",
    progress: "3 rounds",
  },
  {
    title: "Listening studio",
    href: "/activities/listening",
    description:
      "Listen at your pace, answer a comprehension check, and practice dictation.",
    icon: Headphones,
    time: "8 min",
    progress: "2 tracks",
  },
  {
    title: "Reading room",
    href: "/activities/reading",
    description:
      "Read a short passage, open glossary notes, and answer meaning-focused questions.",
    icon: BookOpen,
    time: "9 min",
    progress: "B2 passage",
  },
  {
    title: "Writing workshop",
    href: "/activities/writing",
    description:
      "Draft a short reflection and receive structured feedback across three rubric areas.",
    icon: PenLine,
    time: "12 min",
    progress: "35 words",
  },
  {
    title: "Video lesson",
    href: "/activities/video",
    description:
      "Watch a chaptered lesson and complete a quick checkpoint before moving on.",
    icon: PlaySquare,
    time: "13 min",
    progress: "1 checkpoint",
  },
  {
    title: "Milestone exam",
    href: "/activities/milestone",
    description:
      "Bring vocabulary, grammar, listening, and speaking together in one assessment.",
    icon: FileCheck2,
    time: "18 min",
    progress: "70% to pass",
  },
];

export default async function ActivitiesHubPage() {
  const [userProgress, userSubscription] = await Promise.all([
    getUserProgress(),
    getUserSubscription(),
  ]);

  if (!userProgress?.activeCourse) {
    redirect("/courses");
  }

  return (
    <div className="flex min-w-0 flex-row-reverse gap-8 px-4 pb-14 sm:px-6 lg:gap-10">
      <StickyWrapper>
        <div className="space-y-5">
          <UserProgress
            activeCourse={userProgress.activeCourse}
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={!!userSubscription?.isActive}
          />
          <ActivitiesSidebarSummary />
        </div>
      </StickyWrapper>

      <div className="relative min-w-0 flex-1 pb-10">
        <div className="space-y-7">
          <header className="relative overflow-hidden rounded-2xl border border-[#d9cfad] bg-[#fff9ee] p-6 shadow-[0_14px_34px_rgba(76,67,40,0.06)] sm:p-7">
            <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_150px] sm:items-center">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 text-xs font-extrabold text-[#6e5e06]">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Your practice studio
                </div>
                <h1 className="max-w-xl font-heading text-3xl font-extrabold tracking-[-0.04em] text-[#1d1b15] sm:text-4xl">
                  Train one skill at a time.
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-6 text-[#5f5a49]">
                  Choose a quick activity or continue with the speaking practice
                  selected for today.
                </p>
                <div className="mt-5 flex flex-wrap gap-4 text-xs font-bold text-[#4b4738]">
                  <span className="inline-flex items-center gap-1.5">
                    <Timer
                      className="h-4 w-4 text-[#6e5e06]"
                      aria-hidden="true"
                    />
                    6-18 minute sessions
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2
                      className="h-4 w-4 text-[#6e5e06]"
                      aria-hidden="true"
                    />
                    Instant practice feedback
                  </span>
                </div>
              </div>
              <div className="hidden min-h-36 items-end justify-center rounded-2xl border border-[#e3ded2] bg-white sm:flex">
                <Image
                  src="/mascot.svg"
                  alt="Lingo mascot ready to practise"
                  width={112}
                  height={112}
                  className="activity-mascot-bob"
                  priority
                />
              </div>
            </div>
          </header>

          <section aria-labelledby="activity-library-title">
            <div className="mb-4">
              <h2
                id="activity-library-title"
                className="font-heading text-xl font-extrabold text-[#1d1b15]"
              >
                Activity library
              </h2>
              <p className="mt-1 text-sm text-[#6d6858]">
                Eight ways to practise the current English milestone.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {activities.map((activity) => {
                const Icon = activity.icon;

                return (
                  <Link
                    key={activity.href}
                    href={activity.href}
                    prefetch
                    className={`group relative overflow-hidden rounded-2xl border bg-white p-5 shadow-[0_10px_28px_rgba(76,67,40,0.05)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#b8a744] hover:shadow-[0_16px_34px_rgba(76,67,40,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] focus-visible:ring-offset-2 motion-reduce:transform-none ${
                      activity.featured
                        ? "border-[#d2c36c] md:col-span-2 md:p-6"
                        : "border-[#e3ded2]"
                    }`}
                  >
                    <div
                      className={
                        activity.featured
                          ? "md:grid md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center md:gap-5"
                          : ""
                      }
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#dcc669] bg-[#fae282] text-[#534600] shadow-[0_4px_0_#d5c05e]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div
                        className={activity.featured ? "mt-4 md:mt-0" : "mt-5"}
                      >
                        <div className="mb-1 flex items-center gap-2 text-xs font-bold text-[#6e5e06]">
                          <span>{activity.progress}</span>
                          <span aria-hidden="true">/</span>
                          <span>{activity.time}</span>
                        </div>
                        <h3 className="font-heading text-lg font-extrabold text-[#1d1b15] transition-colors group-hover:text-[#6e5e06]">
                          {activity.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-[#5f5a49]">
                          {activity.description}
                        </p>
                      </div>
                      <div
                        className={`mt-5 flex items-center justify-between border-t border-[#ece7dc] pt-4 ${activity.featured ? "md:mt-0 md:border-0 md:pt-0" : ""}`}
                      >
                        <span
                          className={
                            activity.featured
                              ? "text-sm font-extrabold text-[#6e5e06]"
                              : "text-xs font-bold text-[#6d6858]"
                          }
                        >
                          Start
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-[#6e5e06] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
