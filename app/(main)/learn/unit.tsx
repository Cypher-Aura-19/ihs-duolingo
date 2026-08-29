import { lessons, units } from "@/db/schema";

import { LessonButton } from "./lesson-button";
import { UnitBanner } from "./unit-banner";

type UnitProps = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: (typeof lessons.$inferSelect & {
    completed: boolean;
  })[];
  activeLesson:
    | (typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect;
      })
    | undefined;
  activeLessonPercentage: number;
};

export const Unit = ({
  order,
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: UnitProps) => {
  const completedLessons = lessons.filter((lesson) => lesson.completed).length;
  const isActiveUnit = lessons.some((lesson) => lesson.id === activeLesson?.id);

  return (
    <section id={`unit-${order}`}>
      <UnitBanner
        title={title}
        description={description}
        completedLessons={completedLessons}
        totalLessons={lessons.length}
        isActive={isActiveUnit}
      />

      <div className="relative mx-auto max-w-[620px] py-8">
        {lessons.map((lesson, index) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed && !isCurrent;

          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              title={lesson.title}
              lessonNumber={lesson.order}
              index={index}
              totalCount={lessons.length}
              current={isCurrent}
              locked={isLocked}
              percentage={activeLessonPercentage}
            />
          );
        })}
      </div>
    </section>
  );
};
