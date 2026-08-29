import Image from "next/image";
import { BookOpen, ShieldCheck } from "lucide-react";

import { MockStudentProfile } from "@/lib/mock-data";

interface ProfileHeaderProps {
  profile: MockStudentProfile;
  activeCourseTitle: string;
  activeCourseImage: string;
  hasActiveSubscription: boolean;
}

export const ProfileHeader = ({
  profile,
  activeCourseTitle,
  activeCourseImage,
  hasActiveSubscription,
}: ProfileHeaderProps) => {
  const details = [
    { label: "Current level", value: profile.currentLevel },
    { label: "Member since", value: profile.joinDate },
    { label: "Student ID", value: "SCH-2026-9901" },
    {
      label: "Membership",
      value: hasActiveSubscription ? "Pro Scholar" : "Active Learner",
    },
    { label: "Learning", value: activeCourseTitle },
    { label: "Account", value: "guest.scholar@academic.edu" },
  ];

  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-[#e3ded2] bg-white shadow-[0_12px_32px_rgba(76,67,40,0.06)]">
      <div className="h-1 bg-[#6e5e06]" />

      <div className="p-5 sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full min-w-0 items-center gap-4 sm:w-auto">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-[#d9cfac] bg-[#fff8d8]">
              <Image
                src={profile.avatar}
                alt={`${profile.name}'s avatar`}
                fill
                className="object-contain p-2"
                sizes="80px"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
                <h2 className="max-w-full font-heading text-2xl font-extrabold tracking-[-0.025em] text-[#1d1b15] sm:text-3xl">
                  {profile.name}
                </h2>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#f5edbd] px-2.5 py-1 text-xs font-bold text-[#594c05]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified learner
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-[#686354]">
                {profile.scholarTier.replace("•", "-")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-[#e3ded2] bg-[#faf8f2] px-3 py-2.5 sm:max-w-[220px]">
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-[#e3ded2] bg-white">
              <Image
                src={activeCourseImage}
                alt=""
                fill
                className="object-cover p-1"
                sizes="36px"
              />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-[#7c7766]">
                Active course
              </p>
              <p className="truncate text-sm font-bold text-[#1d1b15]">
                {activeCourseTitle}
              </p>
            </div>
            <BookOpen className="ml-auto h-4 w-4 shrink-0 text-[#6e5e06]" />
          </div>
        </div>

        <dl className="mt-7 grid grid-cols-1 gap-x-7 sm:grid-cols-2 lg:grid-cols-3">
          {details.map((detail) => (
            <div
              key={detail.label}
              className="min-w-0 border-t border-[#ebe7dd] py-3.5"
            >
              <dt className="text-xs font-semibold text-[#7c7766]">
                {detail.label}
              </dt>
              <dd className="mt-1 truncate text-sm font-bold text-[#2c2a23]">
                {detail.value.replace(/[–—]/g, "-")}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
