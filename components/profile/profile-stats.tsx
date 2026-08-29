"use client";

import { Award, Flame, Shield, Trophy, Zap } from "lucide-react";

interface ProfileStatsProps {
  streak: number;
  totalXp: number;
  milestonesCount: number;
  accuracyRate: number;
}

export const ProfileStats = ({
  streak,
  totalXp,
  milestonesCount,
  accuracyRate,
}: ProfileStatsProps) => {
  const stats = [
    {
      label: "Day streak",
      value: `${streak}`,
      icon: <Flame className="h-6 w-6 text-orange-600 fill-orange-500" />,
      bg: "bg-orange-50 border-orange-100",
    },
    {
      label: "Total XP",
      value: `${totalXp.toLocaleString()}`,
      icon: <Zap className="h-6 w-6 text-amber-600 fill-amber-500" />,
      bg: "bg-amber-50 border-amber-100",
    },
    {
      label: "Current League",
      value: "Gold",
      icon: <Shield className="h-6 w-6 text-yellow-600 fill-yellow-500" />,
      bg: "bg-yellow-50 border-yellow-100",
    },
    {
      label: "Milestones",
      value: `${milestonesCount}`,
      icon: <Award className="h-6 w-6 text-emerald-600" />,
      bg: "bg-emerald-50 border-emerald-100",
    },
  ];

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold font-heading text-[#1d1b15]">
        Statistics
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {stats.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3.5 rounded-2xl border-2 border-[#e8e2d7] bg-white p-4 shadow-2xs transition hover:border-[#6e5e06]/60 hover:shadow-xs"
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl border shrink-0 ${item.bg}`}
            >
              {item.icon}
            </div>
            <div>
              <p className="text-xl font-extrabold font-heading text-[#1d1b15]">
                {item.value}
              </p>
              <p className="text-xs font-semibold text-[#7c7766]">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
