import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type HeaderProps = {
  title: string;
};

export const Header = ({ title }: HeaderProps) => {
  return (
    <header className="sticky top-[50px] z-20 mb-5 flex items-center gap-3 border-b border-[#e3ded2] bg-[#fff9ee]/95 py-4 backdrop-blur-sm lg:top-0">
      <Link
        href="/courses"
        aria-label="Back to courses"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[#4b4738] transition-colors hover:bg-[#eee9de] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] focus-visible:ring-offset-2 active:translate-y-px"
      >
        <ArrowLeft className="h-5 w-5" />
      </Link>

      <div>
        <h1 className="font-heading text-xl font-extrabold tracking-[-0.02em] text-[#1d1b15] sm:text-2xl">
          {title}
        </h1>
        <p className="text-xs font-medium text-[#7c7766]">Your learning path</p>
      </div>
    </header>
  );
};
