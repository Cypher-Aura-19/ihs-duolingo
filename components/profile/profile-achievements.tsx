"use client";

import { Flame, Medal, Trophy, Zap } from "lucide-react";

export const ProfileAchievements = () => {
  const achievements = [
    {
      title: "Wildfire",
      description: "14 day study streak",
      level: "Tier III",
      progress: 100,
      current: 14,
      total: 14,
      icon: (
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600 border border-orange-200 shrink-0">
          <Flame className="h-5 w-5 fill-orange-500 text-orange-500" />
        </div>
      ),
    },
    {
      title: "Sage",
      description: "1,500 total XP earned",
      level: "Tier IV",
      progress: 96,
      current: 1450,
      total: 1500,
      icon: (
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 border border-amber-200 shrink-0">
          <Zap className="h-5 w-5 fill-amber-500 text-amber-500" />
        </div>
      ),
    },
    {
      title: "Scholar",
      description: "500 academic terms learned",
      level: "Tier III",
      progress: 84,
      current: 420,
      total: 500,
      icon: (
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fae282]/50 text-[#534600] border border-[#dcc669] shrink-0">
          <Medal className="h-5 w-5" />
        </div>
      ),
    },
    {
      title: "Champion",
      description: "Gold League Top 3",
      level: "Tier II",
      progress: 100,
      current: 1,
      total: 1,
      icon: (
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
          <Trophy className="h-5 w-5" />
        </div>
      ),
    },
  ];

  return (
    <div className="rounded-2xl border-2 border-[#e8e2d7] bg-white p-5 shadow-sm space-y-3.5">
      <div className="flex items-center justify-between border-b border-[#e8e2d7] pb-3">
        <h3 className="text-base font-bold font-heading text-[#1d1b15]">
          Achievements
        </h3>
        <span className="rounded-full bg-[#fff9ee] border border-[#cdc6b3] px-2 py-0.5 text-[10px] font-bold text-[#6e5e06]">
          4 Badges
        </span>
      </div>

      <div className="space-y-2.5">
        {achievements.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-3 rounded-xl border border-[#e8e2d7] bg-[#fdfbf7] p-3 transition hover:bg-[#fff9ee] hover:border-[#cdc6b3]"
          >
            {item.icon}

            <div className="flex-1 space-y-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-[#1d1b15] truncate">
                  {item.title}
                </p>
                <span className="text-[10px] font-bold text-[#6e5e06]">
                  {item.level}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#eee7dd]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 to-[#6e5e06]"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <span className="text-[10px] font-semibold text-[#7c7766]">
                  {item.current}/{item.total}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
