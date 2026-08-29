"use client";

import { useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  XCircle,
} from "lucide-react";

import { ActivityShell } from "@/components/activities/activity-shell";
import styles from "@/components/activities/activity-motion.module.css";
import { Button } from "@/components/ui/button";
import { mockReadingPassage } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function ReadingActivityPage() {
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [submitted, setSubmitted] = useState(false);
  const [activeGlossaryTerm, setActiveGlossaryTerm] = useState(
    mockReadingPassage.glossary[0].term
  );

  const passage = mockReadingPassage;
  const score = Math.round(
    (passage.questions.filter(
      (question, index) => selectedAnswers[index] === question.correctIndex
    ).length /
      passage.questions.length) *
      100
  );

  const reset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  return (
    <ActivityShell
      label="Reading"
      icon={BookOpen}
      title="Read slowly enough to notice the idea"
      description="Explore the passage with an inline glossary, then answer two questions about meaning and evidence."
      step={Object.keys(selectedAnswers).length || 1}
      totalSteps={passage.questions.length}
      stepLabel={passage.difficulty}
      tip="Read each paragraph once for its main point. Use the glossary only after you have guessed a word from context."
      evaluation="Each comprehension answer is checked against the configured correct option and explanation. A score of 70% counts toward the milestone."
    >
      <section className="rounded-2xl border border-[#e3ded2] bg-white p-5 shadow-[0_14px_36px_rgba(76,67,40,0.06)] sm:p-7">
        <div className="mb-6">
          <p className="text-xs font-extrabold text-[#6e5e06]">
            English reading
          </p>
          <h2 className="mt-2 font-heading text-xl font-extrabold leading-8 text-[#1d1b15]">
            {passage.title}
          </h2>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_220px]">
          <article className="rounded-2xl border border-[#d8d1c4] bg-[#fbf8f2] p-5 text-base leading-8 text-[#28251d] sm:p-6">
            {passage.passage.split("\n\n").map((paragraph) => (
              <p key={paragraph} className="mb-5 last:mb-0">
                {paragraph}
              </p>
            ))}
          </article>

          <aside
            className="rounded-2xl border border-[#d8cfaf] bg-[#fff9ee] p-4"
            aria-label="Passage glossary"
          >
            <h3 className="font-heading text-sm font-extrabold text-[#1d1b15]">
              Words in context
            </h3>
            <div className="mt-3 flex flex-wrap gap-2 xl:flex-col">
              {passage.glossary.map((item) => (
                <button
                  key={item.term}
                  type="button"
                  onClick={() => setActiveGlossaryTerm(item.term)}
                  aria-pressed={activeGlossaryTerm === item.term}
                  className={`min-h-10 rounded-xl border px-3 text-left text-xs font-extrabold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] ${
                    activeGlossaryTerm === item.term
                      ? "border-[#6e5e06] bg-[#6e5e06] text-white"
                      : "border-[#dfd6b8] bg-white text-[#534600] hover:border-[#b8a744]"
                  }`}
                >
                  {item.term}
                </button>
              ))}
            </div>
            <div
              className="mt-4 border-t border-[#e5dbb8] pt-4 text-xs leading-5 text-[#5f5a49]"
              aria-live="polite"
            >
              <strong className="block text-[#6e5e06]">
                {activeGlossaryTerm}
              </strong>
              <span className="mt-1 block">
                {
                  passage.glossary.find(
                    (item) => item.term === activeGlossaryTerm
                  )?.definition
                }
              </span>
            </div>
          </aside>
        </div>

        <div className="mt-8 border-t border-[#ece7dc] pt-7">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold text-[#6e5e06]">
                Comprehension check
              </p>
              <h3 className="mt-1 font-heading text-lg font-extrabold text-[#1d1b15]">
                What did the passage actually say?
              </h3>
            </div>
            <span className="hidden text-xs font-bold text-[#6d6858] sm:block">
              Choose one answer per question
            </span>
          </div>

          <div className="space-y-7">
            {passage.questions.map((question, questionIndex) => {
              const selected = selectedAnswers[questionIndex];
              const isCorrect = selected === question.correctIndex;
              return (
                <fieldset key={question.question}>
                  <legend className="mb-3 text-sm font-extrabold leading-6 text-[#1d1b15]">
                    {questionIndex + 1}. {question.question}
                  </legend>
                  <div className="grid gap-2.5">
                    {question.options.map((option, optionIndex) => {
                      const isSelected = selected === optionIndex;
                      const isAnswer = optionIndex === question.correctIndex;
                      const checkedStyle =
                        submitted && isAnswer
                          ? "border-[#9b8d39] bg-[#fff9d6] text-[#534600]"
                          : submitted && isSelected && !isCorrect
                            ? "border-[#c77b70] bg-[#fff4f1] text-[#87372e]"
                            : isSelected
                              ? "border-[#6e5e06] bg-[#fff9d6] text-[#534600]"
                              : "border-[#e3ded2] bg-white text-[#1d1b15] hover:border-[#b8a744]";
                      return (
                        <button
                          key={option}
                          type="button"
                          disabled={submitted}
                          onClick={() =>
                            setSelectedAnswers((current) => ({
                              ...current,
                              [questionIndex]: optionIndex,
                            }))
                          }
                          className={`min-h-14 rounded-xl border-2 px-4 py-3 text-left text-sm font-bold transition-[transform,border-color,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] active:scale-[0.99] motion-reduce:transform-none ${checkedStyle}`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                  {submitted && (
                    <div
                      className={cn(
                        styles.celebrate,
                        `mt-3 flex items-start gap-2 rounded-xl border p-3 text-xs leading-5 ${isCorrect ? "border-[#d1c25f] bg-[#fff9d6] text-[#534600]" : "border-[#e0aaa2] bg-[#fff4f1] text-[#87372e]"}`
                      )}
                    >
                      {isCorrect ? (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                      ) : (
                        <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      )}
                      <span>{question.explanation}</span>
                    </div>
                  )}
                </fieldset>
              );
            })}
          </div>
        </div>

        {submitted && (
          <div
            className={cn(
              styles.celebrate,
              `mt-7 flex items-center justify-between gap-4 rounded-2xl border p-5 ${score >= 70 ? "border-[#d1c25f] bg-[#fff9d6] text-[#534600]" : "border-[#e0aaa2] bg-[#fff4f1] text-[#87372e]"}`
            )}
            aria-live="polite"
          >
            <div>
              <p className="font-heading text-lg font-extrabold">
                Reading score: {score}%
              </p>
              <p className="mt-1 text-xs">
                {score >= 70
                  ? "This reading requirement is complete."
                  : "Review the evidence and try the questions again."}
              </p>
            </div>
            <Sparkles className="h-6 w-6 shrink-0" />
          </div>
        )}

        <div className="mt-7 flex flex-col-reverse gap-3 border-t border-[#ece7dc] pt-5 sm:flex-row sm:justify-between">
          <Button
            type="button"
            variant="primaryOutline"
            onClick={reset}
            disabled={!Object.keys(selectedAnswers).length}
            className="normal-case tracking-normal"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset answers
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setSubmitted(true)}
            disabled={
              submitted ||
              Object.keys(selectedAnswers).length < passage.questions.length
            }
            className="normal-case tracking-normal"
          >
            Check my reading
          </Button>
        </div>
      </section>
    </ActivityShell>
  );
}
