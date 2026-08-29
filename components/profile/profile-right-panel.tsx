import {
  Award,
  Flame,
  GraduationCap,
  MessageSquare,
  Trophy,
  Volume2,
  Zap,
} from "lucide-react";

import { MockStudentProfile } from "@/lib/mock-data";
import { ProfileCertificate } from "./profile-certificate";

interface ProfileRightPanelProps {
  profile: MockStudentProfile;
  points: number;
}

export const ProfileRightPanel = ({
  profile,
  points,
}: ProfileRightPanelProps) => {
  const stats = [
    {
      label: "Day streak",
      value: profile.streakDays,
      icon: Flame,
    },
    {
      label: "Milestones",
      value: profile.milestonesCompleted,
      icon: Trophy,
    },
    {
      label: "Total XP",
      value: Math.max(points, profile.totalXp).toLocaleString(),
      icon: Zap,
    },
  ];

  const feedback = [
    {
      sender: "Speech lab",
      text: "Pronunciation improved to 94% on English stress patterns.",
      time: "2h ago",
      icon: Volume2,
    },
    {
      sender: "Academic advisor",
      text: "Milestone IV is unlocked and ready to attempt.",
      time: "5h ago",
      icon: GraduationCap,
    },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#e3ded2] bg-white p-5 shadow-[0_12px_32px_rgba(76,67,40,0.05)]">
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-[#6e5e06]" />
          <h2 className="font-heading text-lg font-extrabold text-[#1d1b15]">
            Learning momentum
          </h2>
        </div>

        <div className="mt-4 grid grid-cols-3 divide-x divide-[#e8e3d8] border-y border-[#ebe7dd] py-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="px-2 text-center first:pl-0 last:pr-0"
              >
                <Icon className="mx-auto h-4 w-4 text-[#6e5e06]" />
                <p className="mt-2 font-heading text-xl font-extrabold tabular-nums text-[#1d1b15]">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-[11px] font-semibold text-[#7c7766]">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between gap-4 text-sm">
          <span className="text-[#686354]">Current league</span>
          <span className="inline-flex items-center gap-1.5 font-bold text-[#594c05]">
            <Award className="h-4 w-4" />
            Gold
          </span>
        </div>
      </section>

      {profile.certificates.length > 0 ? (
        <ProfileCertificate
          certificate={profile.certificates[0]}
          studentName={profile.name}
        />
      ) : (
        <section className="rounded-2xl border border-[#e3ded2] bg-white p-5 text-center shadow-[0_12px_32px_rgba(76,67,40,0.05)]">
          <Award className="mx-auto h-6 w-6 text-[#a79d80]" />
          <h2 className="mt-3 font-heading text-base font-extrabold text-[#1d1b15]">
            No certificates yet
          </h2>
          <p className="mt-1 text-sm text-[#686354]">
            Complete a milestone exam to earn your first certificate.
          </p>
        </section>
      )}

      <section className="rounded-2xl border border-[#e3ded2] bg-white p-5 shadow-[0_12px_32px_rgba(76,67,40,0.05)]">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-[#6e5e06]" />
          <h2 className="font-heading text-lg font-extrabold text-[#1d1b15]">
            Recent feedback
          </h2>
        </div>

        <div className="mt-4 border-t border-[#ebe7dd]">
          {feedback.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.sender}
                className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 border-b border-[#ebe7dd] py-4 last:border-b-0 last:pb-0"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5edbd] text-[#594c05]">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="truncate text-xs font-bold text-[#1d1b15]">
                      {item.sender}
                    </p>
                    <time className="shrink-0 text-[10px] text-[#8b8576]">
                      {item.time}
                    </time>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-[#686354]">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
