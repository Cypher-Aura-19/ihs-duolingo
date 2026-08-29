import { BookOpen } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { UserProgress } from "@/components/user-progress";
import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";

import { Header } from "./header";
import { LearnSidebar } from "./learn-sidebar";
import { Unit } from "./unit";

const LearnPage = async () => {
  const [
    userProgress,
    units,
    courseProgress,
    lessonPercentage,
    userSubscription,
  ] = await Promise.all([
    getUserProgress(),
    getUnits(),
    getCourseProgress(),
    getLessonPercentage(),
    getUserSubscription(),
  ]);

  if (!courseProgress || !userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;
  const totalLessons = units.reduce(
    (total, unit) => total + unit.lessons.length,
    0
  );
  const completedLessons = units.reduce(
    (total, unit) =>
      total + unit.lessons.filter((lesson) => lesson.completed).length,
    0
  );
  const activeUnit = units.find((unit) =>
    unit.lessons.some((lesson) => lesson.id === courseProgress.activeLesson?.id)
  );

  return (
    <div className="mx-auto max-w-[1160px] px-4 pb-16 sm:px-6">
      <div className="mb-4 rounded-2xl border border-[#e3ded2] bg-white p-2 shadow-[0_8px_24px_rgba(76,67,40,0.05)] xl:hidden">
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,760px)_320px] xl:items-start">
        <main className="min-w-0">
          <Header title={userProgress.activeCourse.title} />

          {units.length > 0 ? (
            <div className="space-y-10">
              {units.map((unit) => (
                <Unit
                  key={unit.id}
                  id={unit.id}
                  order={unit.order}
                  description={unit.description}
                  title={unit.title}
                  lessons={unit.lessons}
                  activeLesson={courseProgress.activeLesson}
                  activeLessonPercentage={lessonPercentage}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[#e3ded2] bg-white p-10 text-center shadow-[0_12px_32px_rgba(76,67,40,0.05)]">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f5edbd] text-[#594c05]">
                <BookOpen className="h-6 w-6" />
              </span>
              <h2 className="mt-4 font-heading text-xl font-extrabold text-[#1d1b15]">
                No lessons here yet
              </h2>
              <p className="mx-auto mt-2 max-w-sm text-sm text-[#686354]">
                Choose another course while new lessons are being prepared.
              </p>
              <Link
                href="/courses"
                className="mt-5 inline-flex rounded-xl bg-[#6e5e06] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#5c4e04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] focus-visible:ring-offset-2 active:translate-y-px"
              >
                Browse courses
              </Link>
            </div>
          )}
        </main>

        <aside className="hidden xl:block">
          <LearnSidebar
            courseTitle={userProgress.activeCourse.title}
            courseImage={userProgress.activeCourse.imageSrc}
            currentUnitTitle={
              activeUnit?.title ?? units[0]?.title ?? "Course overview"
            }
            currentLessonTitle={
              courseProgress.activeLesson?.title ?? "Course complete"
            }
            completedLessons={completedLessons}
            totalLessons={totalLessons}
            lessonPercentage={lessonPercentage}
          >
            <UserProgress
              activeCourse={userProgress.activeCourse}
              hearts={userProgress.hearts}
              points={userProgress.points}
              hasActiveSubscription={isPro}
            />
          </LearnSidebar>
        </aside>
      </div>
    </div>
  );
};

export default LearnPage;
