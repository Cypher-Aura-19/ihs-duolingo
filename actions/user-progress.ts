"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { MAX_HEARTS, POINTS_TO_REFILL } from "@/constants";
import db from "@/db/drizzle";
import {
  getCourseById,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { auth, currentUser } from "@/lib/auth";
import { mockStore } from "@/lib/mock-data";

export const upsertUserProgress = async (courseId: number) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) throw new Error("Unauthorized.");

  const course = await getCourseById(courseId);

  if (!course) throw new Error("Course not found.");

  mockStore.setActiveCourse(courseId);

  try {
    const existingUserProgress = await db.query.userProgress.findFirst({
      where: eq(userProgress.userId, userId),
    });

    if (existingUserProgress) {
      await db
        .update(userProgress)
        .set({
          activeCourseId: courseId,
          userName: user.firstName || "User",
          userImageSrc: user.imageUrl || "/mascot.svg",
        })
        .where(eq(userProgress.userId, userId));
    } else {
      await db.insert(userProgress).values({
        userId,
        activeCourseId: courseId,
        userName: user.firstName || "User",
        userImageSrc: user.imageUrl || "/mascot.svg",
      });
    }
  } catch (e) {
    console.warn("DB update skipped in standalone mode");
  }

  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/learn");
};

export const reduceHearts = async (challengeId: number) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized.");

  const currentUserProgress = await getUserProgress();
  const userSubscription = await getUserSubscription();

  if (!currentUserProgress) throw new Error("User progress not found.");

  if (userSubscription?.isActive) return { error: "subscription" };

  if (currentUserProgress.hearts === 0) return { error: "hearts" };

  mockStore.reduceHearts();

  try {
    const challenge = await db.query.challenges.findFirst({
      where: eq(challenges.id, challengeId),
    });

    if (challenge) {
      const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
          eq(challengeProgress.userId, userId),
          eq(challengeProgress.challengeId, challengeId)
        ),
      });

      if (!existingChallengeProgress) {
        await db
          .update(userProgress)
          .set({
            hearts: Math.max(currentUserProgress.hearts - 1, 0),
          })
          .where(eq(userProgress.userId, userId));
      }
    }
  } catch (e) {
    console.warn("DB update skipped in standalone mode");
  }

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson`);
};

export const refillHearts = async () => {
  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) throw new Error("User progress not found.");
  if (currentUserProgress.hearts === MAX_HEARTS)
    throw new Error("Hearts are already full.");
  if (currentUserProgress.points < POINTS_TO_REFILL)
    throw new Error("Not enough points.");

  mockStore.refillHearts();

  try {
    await db
      .update(userProgress)
      .set({
        hearts: MAX_HEARTS,
        points: currentUserProgress.points - POINTS_TO_REFILL,
      })
      .where(eq(userProgress.userId, currentUserProgress.userId));
  } catch (e) {
    console.warn("DB update skipped in standalone mode");
  }

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
};
