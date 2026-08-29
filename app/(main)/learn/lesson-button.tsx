import type { CSSProperties, ReactNode } from "react";
import { Check, Crown, Lock, Star } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type LessonButtonProps = {
  id: number;
  title: string;
  lessonNumber: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
};

const offsets = [0, 34, 58, 34, 0, -34, -58, -34];

export const LessonButton = ({
  id,
  title,
  lessonNumber,
  index,
  totalCount,
  locked,
  current,
  percentage,
}: LessonButtonProps) => {
  const offset = offsets[index % offsets.length];
  const nextOffset = offsets[(index + 1) % offsets.length];
  const isLast = index === totalCount - 1;
  const isCompleted = !current && !locked;
  const labelOnLeft = offset > 0 || (offset === 0 && index % 2 === 1);
  const safePercentage = Number.isNaN(percentage) ? 0 : percentage;
  const deltaX = nextOffset - offset;
  const verticalDistance = 140;
  const connectorLength = Math.sqrt(verticalDistance ** 2 + deltaX ** 2);
  const connectorAngle =
    (-Math.atan2(deltaX, verticalDistance) * 180) / Math.PI;

  const Icon = locked ? Lock : isCompleted ? Check : isLast ? Crown : Star;
  const status = locked
    ? "Locked"
    : isCompleted
      ? "Completed"
      : safePercentage > 0
        ? `${safePercentage}% complete`
        : "Start here";

  const positionStyle: CSSProperties = {
    left: `calc(50% + ${offset}px)`,
  };

  const node = (
    <div className="group relative h-[88px] w-[88px]">
      <div
        className="flex h-full w-full items-center justify-center rounded-full p-[6px]"
        style={
          current
            ? {
                background: `conic-gradient(#a89736 ${safePercentage * 3.6}deg, #e4ded0 0deg)`,
              }
            : undefined
        }
      >
        <span
          className={cn(
            "flex h-[72px] w-[72px] items-center justify-center rounded-full border shadow-[0_7px_0_#bbb3a1] transition-transform group-hover:-translate-y-0.5 group-active:translate-y-0.5",
            locked &&
              "border-[#d8d2c5] bg-[#e8e3d8] text-[#aaa396] shadow-[0_7px_0_#c6bfaf]",
            isCompleted &&
              "border-[#594c05] bg-[#6e5e06] text-white shadow-[0_7px_0_#413801]",
            current &&
              "border-[#594c05] bg-[#6e5e06] text-white shadow-[0_7px_0_#413801]"
          )}
        >
          <Icon
            className={cn(
              "h-8 w-8",
              !locked && !isCompleted && "fill-current",
              isCompleted && "stroke-[3]"
            )}
          />
        </span>
      </div>

      <div
        className={cn(
          "absolute top-1/2 w-[132px] -translate-y-1/2 rounded-xl border px-3 py-2.5 sm:w-[170px]",
          labelOnLeft ? "right-full mr-3 text-right" : "left-full ml-3",
          current
            ? "border-[#b8a85e] bg-[#fffdf8] shadow-[0_8px_20px_rgba(76,67,40,0.10)]"
            : "border-[#e3ded2] bg-white/90",
          locked && "bg-[#f4f1ea] text-[#8b8576]"
        )}
      >
        <p className="text-[10px] font-semibold text-[#8b8576]">
          Lesson {lessonNumber}
        </p>
        <p
          className={cn(
            "mt-0.5 truncate text-sm font-extrabold",
            locked ? "text-[#777164]" : "text-[#1d1b15]"
          )}
        >
          {title}
        </p>
        <p
          className={cn(
            "mt-1 text-[11px] font-bold",
            current || isCompleted ? "text-[#6e5e06]" : "text-[#8b8576]"
          )}
        >
          {status}
        </p>
      </div>
    </div>
  );

  let interactiveNode: ReactNode = (
    <div aria-disabled="true" aria-label={`${title}, locked`}>
      {node}
    </div>
  );

  if (!locked) {
    interactiveNode = (
      <Link
        href={isCompleted ? `/lesson/${id}` : "/lesson"}
        aria-label={`${current ? "Continue" : "Review"} ${title}`}
        className="block rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] focus-visible:ring-offset-4"
      >
        {node}
      </Link>
    );
  }

  return (
    <div className="relative h-[140px]">
      {!isLast && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-[50px] w-1 rounded-full",
            isCompleted ? "bg-[#a89736]" : "bg-[#ddd7ca]"
          )}
          style={{
            left: `calc(50% + ${offset}px)`,
            height: `${connectorLength}px`,
            transform: `translateX(-50%) rotate(${connectorAngle}deg)`,
            transformOrigin: "top center",
          }}
        />
      )}

      <div className="absolute top-1 -translate-x-1/2" style={positionStyle}>
        {interactiveNode}
      </div>
    </div>
  );
};
