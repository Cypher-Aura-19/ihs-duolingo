"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Clock3, Target } from "lucide-react";

const activityData = [
  { day: "Mon", hours: 1.8 },
  { day: "Tue", hours: 2.5 },
  { day: "Wed", hours: 2.1 },
  { day: "Thu", hours: 3.4 },
  { day: "Fri", hours: 2.8 },
  { day: "Sat", hours: 3.9 },
  { day: "Sun", hours: 2.8 },
];

const totalHours = activityData.reduce((total, item) => total + item.hours, 0);
const goalDays = activityData.filter((item) => item.hours >= 2).length;

export const ActivityChart = () => {
  return (
    <section className="rounded-2xl border border-[#e3ded2] bg-white p-5 shadow-[0_12px_32px_rgba(76,67,40,0.05)] sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-heading text-xl font-extrabold tracking-[-0.02em] text-[#1d1b15] sm:text-2xl">
            Study activity
          </h2>
          <p className="mt-1 text-sm text-[#686354]">
            Time spent learning over the last seven days.
          </p>
        </div>

        <div className="flex gap-6 sm:text-right">
          <div>
            <p className="text-xs font-semibold text-[#7c7766]">This week</p>
            <p className="mt-0.5 font-heading text-xl font-extrabold text-[#1d1b15]">
              {totalHours.toFixed(1)}h
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#7c7766]">
              Daily average
            </p>
            <p className="mt-0.5 font-heading text-xl font-extrabold text-[#1d1b15]">
              {(totalHours / activityData.length).toFixed(1)}h
            </p>
          </div>
        </div>
      </div>

      <div
        className="mt-5 h-56 w-full"
        role="img"
        aria-label="Bar chart of study hours from Monday through Sunday"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={activityData}
            margin={{ top: 16, right: 4, left: -22, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#ebe7dd"
              strokeDasharray="2 6"
            />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#686354", fontSize: 12, fontWeight: 600 }}
              dy={8}
            />
            <YAxis
              width={42}
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#8b8576", fontSize: 11 }}
              tickFormatter={(value: number) => `${value}h`}
            />
            <Tooltip
              cursor={{ fill: "#faf8f2" }}
              contentStyle={{
                border: "1px solid #ded8ca",
                borderRadius: 12,
                boxShadow: "0 10px 24px rgba(76, 67, 40, 0.10)",
                color: "#1d1b15",
                fontSize: 12,
              }}
              labelStyle={{ color: "#686354", fontWeight: 700 }}
              formatter={(value) => [`${value} hours`, "Study time"]}
            />
            <ReferenceLine
              y={2}
              stroke="#a99c70"
              strokeDasharray="4 5"
              label={{
                value: "2h goal",
                position: "insideTopRight",
                fill: "#7c7766",
                fontSize: 11,
              }}
            />
            <Bar
              dataKey="hours"
              fill="#6e5e06"
              radius={[6, 6, 2, 2]}
              maxBarSize={30}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 border-t border-[#ebe7dd] pt-4 sm:grid-cols-2">
        <div className="flex items-center gap-2.5 text-sm text-[#4b4738]">
          <Target className="h-4 w-4 text-[#6e5e06]" />
          <span>
            Daily goal reached on <strong>{goalDays} of 7 days</strong>
          </span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-[#4b4738] sm:justify-end">
          <Clock3 className="h-4 w-4 text-[#6e5e06]" />
          <span>
            Best session <strong>3.9 hours</strong>
          </span>
        </div>
      </div>
    </section>
  );
};
