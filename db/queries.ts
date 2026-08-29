import { cache } from "react";

import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth";
import { mockCourses, mockStore } from "@/lib/mock-data";

import db from "./drizzle";
import {
  challengeOptions,
  challengeProgress,
  challenges,
  courses,
  lessons,
  units,
  userProgress,
  userSubscription,
} from "./schema";

const DAY_IN_MS = 86_400_000;

export const getCourses = cache(async () => {
  try {
    const data = await db.query.courses.findMany();
    if (data && data.length > 0) return data;
  } catch (e) {
    console.warn("Using fallback courses dataset");
  }

  return mockCourses;
});

export const getUserProgress = cache(async () => {
  const { userId } = await auth();

  if (!userId) return null;

  try {
    const data = await db.query.userProgress.findFirst({
      where: eq(userProgress.userId, userId),
      with: {
        activeCourse: true,
      },
    });

    if (data && data.activeCourse) return data;
  } catch (e) {
    console.warn("Using fallback user progress");
  }

  return mockStore.getUserProgress(userId);
});

export const getUnits = cache(async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();

  if (!userId || !userProgress?.activeCourseId) return [];

  try {
    const data = await db.query.units.findMany({
      where: eq(units.courseId, userProgress.activeCourseId),
      orderBy: (units, { asc }) => [asc(units.order)],
      with: {
        lessons: {
          orderBy: (lessons, { asc }) => [asc(lessons.order)],
          with: {
            challenges: {
              orderBy: (challenges, { asc }) => [asc(challenges.order)],
              with: {
                challengeProgress: {
                  where: eq(challengeProgress.userId, userId),
                },
              },
            },
          },
        },
      },
    });

    if (data && data.length > 0) {
      const normalizedData = data.map((unit) => {
        const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
          if (lesson.challenges.length === 0)
            return { ...lesson, completed: false };

          const allCompletedChallenges = lesson.challenges.every((challenge) => {
            return (
              challenge.challengeProgress &&
              challenge.challengeProgress.length > 0 &&
              challenge.challengeProgress.every((progress) => progress.completed)
            );
          });

          return { ...lesson, completed: allCompletedChallenges };
        });

        return { ...unit, lessons: lessonsWithCompletedStatus };
      });

      return normalizedData;
    }
  } catch (e) {
    console.warn("Using fallback units dataset");
  }

  return mockStore.getUnits(userProgress.activeCourseId, userId);
});

export const getCourseById = cache(async (courseId: number) => {
  try {
    const data = await db.query.courses.findFirst({
      where: eq(courses.id, courseId),
      with: {
        units: {
          orderBy: (units, { asc }) => [asc(units.order)],
          with: {
            lessons: {
              orderBy: (lessons, { asc }) => [asc(lessons.order)],
            },
          },
        },
      },
    });

    if (data) return data;
  } catch (e) {
    console.warn("Using fallback course data");
  }

  const course = mockStore.getCourse(courseId) || mockCourses[0];
  const units = mockUnitsFallback(courseId);
  return {
    ...course,
    units,
  };
});

function mockUnitsFallback(courseId: number) {
  return [
    {
      id: 1,
      courseId,
      title: "Unit 1",
      description: "Learn the basics",
      order: 1,
      lessons: [{ id: 1, unitId: 1, title: "Nouns", order: 1 }],
    },
  ];
}

export const getCourseProgress = cache(async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();

  if (!userId || !userProgress?.activeCourseId) return null;

  try {
    const unitsInActiveCourse = await db.query.units.findMany({
      orderBy: (units, { asc }) => [asc(units.order)],
      where: eq(units.courseId, userProgress.activeCourseId),
      with: {
        lessons: {
          orderBy: (lessons, { asc }) => [asc(lessons.order)],
          with: {
            unit: true,
            challenges: {
              with: {
                challengeProgress: {
                  where: eq(challengeProgress.userId, userId),
                },
              },
            },
          },
        },
      },
    });

    if (unitsInActiveCourse && unitsInActiveCourse.length > 0) {
      const firstUncompletedLesson = unitsInActiveCourse
        .flatMap((unit) => unit.lessons)
        .find((lesson) => {
          return lesson.challenges.some((challenge) => {
            return (
              !challenge.challengeProgress ||
              challenge.challengeProgress.length === 0 ||
              challenge.challengeProgress.some((progress) => !progress.completed)
            );
          });
        });

      return {
        activeLesson: firstUncompletedLesson,
        activeLessonId: firstUncompletedLesson?.id,
      };
    }
  } catch (e) {
    console.warn("Using fallback course progress");
  }

  const allUnits = mockStore.getUnits(userProgress.activeCourseId, userId);
  const firstUncompletedLesson = allUnits
    .flatMap((u) => u.lessons || [])
    .find((l) => !l.completed);

  const activeLesson = firstUncompletedLesson || allUnits[0]?.lessons?.[0];

  return {
    activeLesson: activeLesson ? { ...activeLesson, unit: allUnits[0] } : undefined,
    activeLessonId: activeLesson?.id || 1,
  };
});

export const getLesson = cache(async (id?: number) => {
  const { userId } = await auth();

  if (!userId) return null;

  const courseProgress = await getCourseProgress();
  const lessonId = id || courseProgress?.activeLessonId || 1;

  try {
    const data = await db.query.lessons.findFirst({
      where: eq(lessons.id, lessonId),
      with: {
        challenges: {
          orderBy: (challenges, { asc }) => [asc(challenges.order)],
          with: {
            challengeOptions: true,
            challengeProgress: {
              where: eq(challengeProgress.userId, userId),
            },
          },
        },
      },
    });

    if (data && data.challenges && data.challenges.length > 0) {
      const normalizedChallenges = data.challenges.map((challenge) => {
        const completed =
          challenge.challengeProgress &&
          challenge.challengeProgress.length > 0 &&
          challenge.challengeProgress.every((progress) => progress.completed);

        return {
          ...challenge,
          completed: !!completed,
          challengeOptions: challenge.challengeOptions,
        };
      });

      return { ...data, challenges: normalizedChallenges };
    }
  } catch (e) {
    console.warn("Using fallback lesson data");
  }

  return mockStore.getLesson(lessonId, userId);
});

export const getLessonPercentage = cache(async () => {
  const courseProgress = await getCourseProgress();

  if (!courseProgress?.activeLessonId) return 0;

  const lesson = await getLesson(courseProgress?.activeLessonId);

  if (!lesson || !lesson.challenges || lesson.challenges.length === 0) return 0;

  const completedChallenges = lesson.challenges.filter(
    (challenge) => challenge.completed
  );

  const percentage = Math.round(
    (completedChallenges.length / lesson.challenges.length) * 100
  );

  return percentage;
});

export const getUserSubscription = cache(async () => {
  const { userId } = await auth();

  if (!userId) return null;

  try {
    const data = await db.query.userSubscription.findFirst({
      where: eq(userSubscription.userId, userId),
    });

    if (data) {
      const isActive =
        !!data.stripePriceId &&
        data.stripeCurrentPeriodEnd?.getTime() + DAY_IN_MS > Date.now();

      return {
        ...data,
        isActive: !!isActive,
      };
    }
  } catch (e) {
    console.warn("Using fallback user subscription");
  }

  return mockStore.userSubscription;
});

export const getTopTenUsers = cache(async () => {
  const { userId } = await auth();

  if (!userId) return [];

  try {
    const data = await db.query.userProgress.findMany({
      orderBy: (userProgress, { desc }) => [desc(userProgress.points)],
      limit: 10,
      columns: {
        userId: true,
        userName: true,
        userImageSrc: true,
        points: true,
      },
    });

    if (data && data.length > 0) return data;
  } catch (e) {
    console.warn("Using fallback top users");
  }

  return mockStore.getLeaderboard();
});

export const getStudentProfile = cache(async () => {
  const { userId } = await auth();

  if (!userId) return null;

  return mockStore.getStudentProfile(userId);
});


