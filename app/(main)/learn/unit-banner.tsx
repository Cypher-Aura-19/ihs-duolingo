import { ArrowRight, BookOpenCheck } from "lucide-react";
import Link from "next/link";

type UnitBannerProps = {
  title: string;
  description: string;
  completedLessons: number;
  totalLessons: number;
  isActive: boolean;
};

export const UnitBanner = ({
  title,
  description,
  completedLessons,
  totalLessons,
  isActive,
}: UnitBannerProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#544901] bg-[#655704] text-white shadow-[0_10px_0_#413801,0_18px_36px_rgba(76,67,40,0.12)]">
      <div className="grid gap-5 p-5 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center sm:p-6">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#fff3a5] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
          <BookOpenCheck className="h-6 w-6" />
        </span>

        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="font-heading text-2xl font-extrabold tracking-[-0.025em]">
              {title}
            </h2>
            {isActive && (
              <span className="rounded-lg bg-[#f5edbd] px-2 py-1 text-[11px] font-bold text-[#594c05]">
                Current unit
              </span>
            )}
          </div>
          <p className="mt-1 text-sm font-medium text-[#f4e9a3] sm:text-base">
            {description}
          </p>
          <p className="mt-2 text-xs font-semibold text-white/75">
            {completedLessons} of {totalLessons} lessons complete
          </p>
        </div>

        {isActive && (
          <Link
            href="/lesson"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#fffdf8] px-4 py-3 text-sm font-bold text-[#594c05] shadow-[0_4px_0_#b8a85e] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#655704] active:translate-y-px active:shadow-[0_2px_0_#b8a85e] sm:w-auto"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
};
