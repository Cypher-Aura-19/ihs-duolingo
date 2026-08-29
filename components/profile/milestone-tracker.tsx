"use client";

import {
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Lock,
  Mic,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ModuleItem {
  name: string;
  milestone: string;
  quizScore: number;
  speakingCompleted: boolean;
  activitiesCompleted: number;
  totalActivities: number;
  completed: boolean;
  current?: boolean;
  locked?: boolean;
}

interface LevelItem {
  level: string;
  status: string;
  badge: string;
  modules: ModuleItem[];
}

export const MilestoneTracker = () => {
  const levels: LevelItem[] = [
    {
      level: "Level 1: Beginner Proficiency",
      status: "Completed",
      badge: "A1 CEFR Equivalent",
      modules: [
        {
          name: "Module 1: Scholarly Greetings & Introductions",
          milestone: "Milestone I: Conversational Etiquette",
          quizScore: 98,
          speakingCompleted: true,
          activitiesCompleted: 10,
          totalActivities: 10,
          completed: true,
        },
        {
          name: "Module 2: Essential Academic Lexicon & Nouns",
          milestone: "Milestone II: Core Vocabulary Acquisition",
          quizScore: 94,
          speakingCompleted: true,
          activitiesCompleted: 12,
          totalActivities: 12,
          completed: true,
        },
        {
          name: "Module 3: Foundational Grammar & Syntactic Order",
          milestone: "Milestone III: Primary Sentence Structure",
          quizScore: 91,
          speakingCompleted: true,
          activitiesCompleted: 8,
          totalActivities: 8,
          completed: true,
        },
      ],
    },
    {
      level: "Level 2: Intermediate Proficiency",
      status: "In Progress",
      badge: "B1 - B2 CEFR Target",
      modules: [
        {
          name: "Module 4: Speech Intonation & Phonetic Cadence",
          milestone: "Milestone IV: Pronunciation & Fluency Lab",
          quizScore: 88,
          speakingCompleted: true,
          activitiesCompleted: 9,
          totalActivities: 10,
          completed: false,
          current: true,
        },
        {
          name: "Module 5: Complex Tenses & Academic Style",
          milestone: "Milestone V: Advanced Grammar Mastery",
          quizScore: 0,
          speakingCompleted: false,
          activitiesCompleted: 3,
          totalActivities: 12,
          completed: false,
          locked: false,
        },
        {
          name: "Module 6: Academic Reading & Discourse Analysis",
          milestone: "Milestone VI: Text Comprehension & Synthesis",
          quizScore: 0,
          speakingCompleted: false,
          activitiesCompleted: 0,
          totalActivities: 10,
          completed: false,
          locked: true,
        },
      ],
    },
    {
      level: "Level 3: Advanced Academic Mastery",
      status: "Upcoming",
      badge: "C1 Academic Tier",
      modules: [
        {
          name: "Module 7: Professional Rhetoric & Argumentation",
          milestone: "Milestone VII: Scholarly Presentation",
          quizScore: 0,
          speakingCompleted: false,
          activitiesCompleted: 0,
          totalActivities: 15,
          completed: false,
          locked: true,
        },
        {
          name: "Module 8: Academic Writing & Publication Prep",
          milestone: "Milestone VIII: Thesis & Composition",
          quizScore: 0,
          speakingCompleted: false,
          activitiesCompleted: 0,
          totalActivities: 15,
          completed: false,
          locked: true,
        },
      ],
    },
  ];

  return (
    <div className="rounded-2xl border-2 border-t-4 border-[#e8e2d7] border-t-[#6e5e06] bg-white p-6 shadow-md">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-[#6e5e06]" />
            <h3 className="font-heading text-xl font-bold text-[#1d1b15]">
              Curriculum Hierarchy & Milestone Progress
            </h3>
          </div>
          <p className="mt-1 text-sm text-[#4b4738]">
            Course ➔ Level ➔ Module ➔ Milestone (100% Activities + Quiz ≥ 70% +
            Speaking Required)
          </p>
        </div>

        <Link href="/activities/milestone" prefetch>
          <Button size="sm" variant="secondary" className="font-bold">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            Milestone Exam
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        {levels.map((lvl) => (
          <div
            key={lvl.level}
            className="rounded-xl border border-[#e8e2d7] bg-[#fdfbf7] p-5"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[#e8e2d7] pb-3">
              <div className="flex items-center gap-2">
                <h4 className="font-heading text-base font-bold text-[#1d1b15]">
                  {lvl.level}
                </h4>
                <span className="rounded-md border border-[#cdc6b3] bg-[#fff9ee] px-2 py-0.5 text-xs font-semibold text-[#6e5e06]">
                  {lvl.badge}
                </span>
              </div>

              <span
                className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                  lvl.status === "Completed"
                    ? "bg-emerald-100 text-emerald-800"
                    : lvl.status === "In Progress"
                      ? "bg-[#fae282] text-[#534600]"
                      : "bg-[#e8e2d7] text-[#7c7766]"
                }`}
              >
                {lvl.status}
              </span>
            </div>

            <div className="space-y-3">
              {lvl.modules.map((mod) => (
                <div
                  key={mod.name}
                  className={`flex flex-col gap-3 rounded-xl border p-3.5 transition-colors md:flex-row md:items-center md:justify-between ${
                    mod.completed
                      ? "border-emerald-200 bg-emerald-50/40"
                      : mod.current
                        ? "shadow-xs border-[#dcc669] bg-[#fff9ee]"
                        : mod.locked
                          ? "border-[#e8e2d7] bg-[#f3ede2]/40 opacity-70"
                          : "border-[#e8e2d7] bg-white"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {mod.completed ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                      ) : mod.locked ? (
                        <Lock className="h-4 w-4 shrink-0 text-[#7c7766]" />
                      ) : (
                        <div className="h-2 w-2 shrink-0 rounded-full bg-[#6e5e06]" />
                      )}
                      <p className="text-sm font-bold text-[#1d1b15]">
                        {mod.name}
                      </p>
                    </div>

                    <p className="pl-6 text-xs font-medium text-[#4b4738]">
                      Target:{" "}
                      <span className="font-semibold text-[#6e5e06]">
                        {mod.milestone}
                      </span>
                    </p>
                  </div>

                  {/* Requirements Tracker */}
                  <div className="flex flex-wrap items-center gap-2 pl-6 md:pl-0">
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                        mod.activitiesCompleted === mod.totalActivities
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-[#eee7dd] text-[#4b4738]"
                      }`}
                    >
                      Activities: {mod.activitiesCompleted}/
                      {mod.totalActivities}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                        mod.quizScore >= 70
                          ? "bg-emerald-100 text-emerald-800"
                          : mod.quizScore > 0
                            ? "bg-amber-100 text-amber-800"
                            : "bg-[#eee7dd] text-[#7c7766]"
                      }`}
                    >
                      Quiz:{" "}
                      {mod.quizScore > 0
                        ? `${mod.quizScore}%`
                        : "Pending (≥70%)"}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                        mod.speakingCompleted
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-[#eee7dd] text-[#7c7766]"
                      }`}
                    >
                      <Mic className="h-3 w-3" />
                      {mod.speakingCompleted
                        ? "Speaking Complete"
                        : "Speaking Req."}
                    </span>

                    {mod.current && (
                      <Link href="/activities" prefetch>
                        <Button
                          size="sm"
                          variant="primary"
                          className="ml-2 h-7 px-2.5 text-xs"
                        >
                          Resume
                          <ChevronRight className="ml-1 h-3 w-3" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
