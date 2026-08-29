import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { SidebarItem } from "./sidebar-item";

type SidebarProps = {
  className?: string;
};

export const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div
      className={cn(
        "left-0 top-0 flex h-full flex-col border-r-2 border-[#e8e2d7] bg-[#fbf7ef] px-4 lg:fixed lg:w-[256px]",
        className
      )}
    >
      <Link href="/learn" prefetch>
        <div className="flex items-center gap-x-3 pb-7 pl-4 pt-8">
          <Image src="/mascot.svg" alt="Mascot" height={40} width={40} />

          <h1 className="text-2xl font-extrabold tracking-wide text-[#6e5e06] font-heading">
            Lingo
          </h1>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-y-2">
        <SidebarItem label="Learn" href="/learn" iconSrc="/learn.svg" />
        <SidebarItem
          label="Activities"
          href="/activities"
          iconSrc="/unlimited.svg"
        />
        <SidebarItem
          label="Profile"
          href="/profile"
          iconSrc="/mascot.svg"
        />
        <SidebarItem
          label="Leaderboard"
          href="/leaderboard"
          iconSrc="/leaderboard.svg"
        />
        <SidebarItem label="Shop" href="/shop" iconSrc="/shop.svg" />
      </div>


      <div className="p-4">
        <Link href="/profile" prefetch>
          <div className="flex items-center gap-x-3 rounded-xl border-2 border-[#e8e2d7] bg-[#fff9ee] p-2.5 shadow-sm transition hover:border-[#6e5e06] hover:bg-[#fae282]/20">
            <div className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-[#6e5e06] bg-[#f0d97a]/30">
              <Image
                src="/mascot.svg"
                alt="Guest Scholar"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col overflow-hidden">
              <p className="truncate text-sm font-bold text-[#1d1b15]">
                Guest Scholar
              </p>
              <span className="text-[11px] font-semibold text-[#6e5e06]">
                ● View Profile
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};



