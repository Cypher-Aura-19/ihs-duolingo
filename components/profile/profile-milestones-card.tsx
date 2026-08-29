"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, GraduationCap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ProfileMilestonesCard = () => {
  return (
    <div className="rounded-2xl border-2 border-[#e8e2d7] bg-white p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-[#e8e2d7] pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#fff9ee] text-[#6e5e06] border border-[#dcc669]">
            <GraduationCap className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold font-heading text-[#1d1b15]">
              Curriculum Milestone
            </h3>
            <p className="text-[11px] text-[#7c7766]">
              Milestone IV: Pronunciation & Fluency
            </p>
          </div>
        </div>

        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
          In Progress
        </span>
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-[#4b4738]">Activity Requirements:</span>
          <span className="font-bold text-[#1d1b15]">9 / 10 Completed</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#eee7dd]">
          <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-[#6e5e06] w-[90%]" />
        </div>

        <div className="space-y-1.5 pt-1 text-xs">
          <div className="flex items-center gap-2 text-emerald-700">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
            <span>Quiz Threshold: 88% (≥ 70% required)</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-700">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
            <span>Required Speaking Assessment Verified</span>
          </div>
        </div>
      </div>

      <Link href="/activities/milestone" prefetch className="block">
        <Button size="sm" variant="secondary" className="w-full font-bold text-xs">
          Take Milestone Exam
          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
        </Button>
      </Link>
    </div>
  );
};
