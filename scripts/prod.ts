import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

const challengeDefinitions = [
  { type: "SELECT" as const, question: 'Which one of these is "the man"?' },
  { type: "SELECT" as const, question: 'Which one of these is "the woman"?' },
  { type: "SELECT" as const, question: 'Which one of these is "the boy"?' },
  { type: "ASSIST" as const, question: 'Choose the word "man".' },
  { type: "SELECT" as const, question: 'Which one of these is "the zombie"?' },
  { type: "SELECT" as const, question: 'Which one of these is "the robot"?' },
  { type: "SELECT" as const, question: 'Which one of these is "the girl"?' },
  { type: "ASSIST" as const, question: 'Choose the word "zombie".' },
];

const optionSets = [
  [
    { text: "man", correct: true, imageSrc: "/man.svg" },
    { text: "woman", correct: false, imageSrc: "/woman.svg" },
    { text: "boy", correct: false, imageSrc: "/boy.svg" },
  ],
  [
    { text: "woman", correct: true, imageSrc: "/woman.svg" },
    { text: "boy", correct: false, imageSrc: "/boy.svg" },
    { text: "man", correct: false, imageSrc: "/man.svg" },
  ],
  [
    { text: "woman", correct: false, imageSrc: "/woman.svg" },
    { text: "man", correct: false, imageSrc: "/man.svg" },
    { text: "boy", correct: true, imageSrc: "/boy.svg" },
  ],
  [
    { text: "woman", correct: false, imageSrc: null },
    { text: "man", correct: true, imageSrc: null },
    { text: "boy", correct: false, imageSrc: null },
  ],
  [
    { text: "man", correct: false, imageSrc: "/man.svg" },
    { text: "woman", correct: false, imageSrc: "/woman.svg" },
    { text: "zombie", correct: true, imageSrc: "/zombie.svg" },
  ],
  [
    { text: "robot", correct: true, imageSrc: "/robot.svg" },
    { text: "zombie", correct: false, imageSrc: "/zombie.svg" },
    { text: "boy", correct: false, imageSrc: "/boy.svg" },
  ],
  [
    { text: "girl", correct: true, imageSrc: "/girl.svg" },
    { text: "zombie", correct: false, imageSrc: "/zombie.svg" },
    { text: "man", correct: false, imageSrc: "/man.svg" },
  ],
  [
    { text: "woman", correct: false, imageSrc: null },
    { text: "zombie", correct: true, imageSrc: null },
    { text: "boy", correct: false, imageSrc: null },
  ],
];

const main = async () => {
  try {
    console.log("Seeding database");

    await Promise.all([
      db.delete(schema.userProgress),
      db.delete(schema.challenges),
      db.delete(schema.units),
      db.delete(schema.lessons),
      db.delete(schema.courses),
      db.delete(schema.challengeOptions),
      db.delete(schema.userSubscription),
    ]);

    const [course] = await db
      .insert(schema.courses)
      .values([{ title: "English", imageSrc: "/en.svg" }])
      .returning();

    const units = await db
      .insert(schema.units)
      .values([
        {
          courseId: course.id,
          title: "Unit 1",
          description: "Learn the basics of English",
          order: 1,
        },
        {
          courseId: course.id,
          title: "Unit 2",
          description: "Build intermediate English skills",
          order: 2,
        },
      ])
      .returning();

    for (const unit of units) {
      const lessonTitles =
        unit.order === 1
          ? ["Nouns", "Verbs", "Adjectives", "Phrases", "Sentences"]
          : ["Greetings", "Food", "Travel", "Directions", "Shopping"];
      const lessons = await db
        .insert(schema.lessons)
        .values(
          lessonTitles.map((title, index) => ({
            unitId: unit.id,
            title,
            order: index + 1,
          }))
        )
        .returning();

      for (const lesson of lessons) {
        const challenges = await db
          .insert(schema.challenges)
          .values(
            challengeDefinitions.map((challenge, index) => ({
              lessonId: lesson.id,
              type: challenge.type,
              question: challenge.question,
              order: index + 1,
            }))
          )
          .returning();

        for (const challenge of challenges) {
          const options = optionSets[challenge.order - 1];
          await db.insert(schema.challengeOptions).values(
            options.map((option) => ({
              challengeId: challenge.id,
              text: option.text,
              correct: option.correct,
              imageSrc: option.imageSrc,
              audioSrc: null,
            }))
          );
        }
      }
    }

    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

void main();
