"use client";

import Image from "next/image";
import { Award, Flame, Heart, ShieldCheck, Sparkles, Timer, Zap } from "lucide-react";
import { MockStudentProfile } from "@/lib/mock-data";

interface StudentProfileCardProps {
  profile: MockStudentProfile;
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
}

export const StudentProfileCard = ({
  profile,
  hearts,
  points,
  hasActiveSubscription,
}: StudentProfileCardProps) => {
  return (
    <div className="w-full rounded-2xl border-2 border-[#e8e2d7] bg-white p-6 shadow-md border-t-4 border-t-[#6e5e06]">
      {/* Header Profile Section */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-x-5">
          <div className="relative h-20 w-20 overflow-hidden rounded-2xl border-2 border-[#6e5e06] bg-[#f0d97a]/25 shadow-sm">
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              className="object-cover p-2"
            />
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-bold font-heading text-[#1d1b15]">
                {profile.name}
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#fae282] px-2.5 py-0.5 text-xs font-bold text-[#534600]">
                <Sparkles className="h-3 w-3" />
                {profile.scholarTier}
              </span>
            </div>

            <p className="text-sm font-medium text-[#4b4738]">
              {profile.currentLevel} • Joined {profile.joinDate}
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-[#7c7766]">
              <span className="flex items-center gap-1 font-semibold text-[#6e5e06]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#6e5e06]" />
                Direct Access Scholar Account
              </span>
              <span>•</span>
              <span className="font-medium text-emerald-600">● Active Session</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-[#e8e2d7] bg-[#fff9ee] px-4 py-2.5 text-center">
            <p className="text-xs font-semibold text-[#7c7766] uppercase tracking-wider">Status</p>
            <p className="text-sm font-bold text-[#6e5e06]">
              {hasActiveSubscription ? "Pro Scholar" : "Active Learner"}
            </p>
          </div>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        <div className="rounded-xl border border-[#e8e2d7] bg-[#fdfbf7] p-3 text-center transition hover:border-[#6e5e06]">
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-[#fae282]/40 text-[#534600] mb-1">
            <Zap className="h-4 w-4" />
          </div>
          <p className="text-xl font-extrabold font-heading text-[#1d1b15]">{points || profile.totalXp}</p>
          <p className="text-xs font-medium text-[#7c7766]">Total Scholarly XP</p>
        </div>

        <div className="rounded-xl border border-[#e8e2d7] bg-[#fdfbf7] p-3 text-center transition hover:border-[#6e5e06]">
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-orange-600 mb-1">
            <Flame className="h-4 w-4" />
          </div>
          <p className="text-xl font-extrabold font-heading text-[#1d1b15]">{profile.streakDays} Days</p>
          <p className="text-xs font-medium text-[#7c7766]">Study Streak</p>
        </div>

        <div className="rounded-xl border border-[#e8e2d7] bg-[#fdfbf7] p-3 text-center transition hover:border-[#6e5e06]">
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-rose-600 mb-1">
            <Heart className="h-4 w-4 fill-rose-500" />
          </div>
          <p className="text-xl font-extrabold font-heading text-[#1d1b15]">
            {hasActiveSubscription ? "∞" : hearts}
          </p>
          <p className="text-xs font-medium text-[#7c7766]">Hearts & Energy</p>
        </div>

        <div className="rounded-xl border border-[#e8e2d7] bg-[#fdfbf7] p-3 text-center transition hover:border-[#6e5e06]">
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 mb-1">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <p className="text-xl font-extrabold font-heading text-[#1d1b15]">{profile.accuracyRate}%</p>
          <p className="text-xs font-medium text-[#7c7766]">Accuracy Rate</p>
        </div>

        <div className="rounded-xl border border-[#e8e2d7] bg-[#fdfbf7] p-3 text-center transition hover:border-[#6e5e06]">
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 mb-1">
            <Timer className="h-4 w-4" />
          </div>
          <p className="text-xl font-extrabold font-heading text-[#1d1b15]">{profile.hoursStudied}h</p>
          <p className="text-xs font-medium text-[#7c7766]">Study Hours</p>
        </div>

        <div className="rounded-xl border border-[#e8e2d7] bg-[#fdfbf7] p-3 text-center transition hover:border-[#6e5e06]">
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-800 mb-1">
            <Award className="h-4 w-4" />
          </div>
          <p className="text-xl font-extrabold font-heading text-[#1d1b15]">{profile.milestonesCompleted}</p>
          <p className="text-xs font-medium text-[#7c7766]">Milestones Passed</p>
        </div>
      </div>

      {/* Active Entitlements & Access Level */}
      <div className="mt-6 rounded-xl border border-[#e8e2d7] bg-[#fff9ee] p-4">
        <div className="flex items-center justify-between mb-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#6e5e06]">
            Active Entitlements & Curriculum Access (V1 System)
          </h4>
          <span className="text-xs font-medium text-[#4b4738]">Unlocked without Login</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {profile.entitlements.map((entitlement) => (
            <span
              key={entitlement}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#cdc6b3] bg-white px-3 py-1 text-xs font-semibold text-[#1d1b15] shadow-2xs"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#6e5e06]" />
              {entitlement}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
