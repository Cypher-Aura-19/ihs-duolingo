"use client";

import { useState } from "react";
import {
  CheckCircle2,
  HelpCircle,
  Puzzle,
  RotateCcw,
  Sparkles,
  XCircle,
} from "lucide-react";

import { ActivityShell } from "@/components/activities/activity-shell";
import styles from "@/components/activities/activity-motion.module.css";
import { Button } from "@/components/ui/button";
import { mockGrammarExercises } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const shuffledTokens = (index: number) => {
  const tokens = [...mockGrammarExercises[index].tokens];
  return index % 2 === 0
    ? tokens.reverse()
    : [...tokens.slice(2), ...tokens.slice(0, 2)];
};

export default function GrammarActivityPage() {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [availableTokens, setAvailableTokens] = useState(() =>
    shuffledTokens(0)
  );
  const [assembledTokens, setAssembledTokens] = useState<string[]>([]);
  const [status, setStatus] = useState<"none" | "correct" | "wrong">("none");
  const [showHint, setShowHint] = useState(false);

  const exercise = mockGrammarExercises[exerciseIndex];

  const clearWrongState = () => {
    if (status === "wrong") setStatus("none");
  };

  const selectToken = (token: string, index: number) => {
    if (status === "correct") return;
    clearWrongState();
    setAssembledTokens((current) => [...current, token]);
    setAvailableTokens((current) =>
      current.filter((_, tokenIndex) => tokenIndex !== index)
    );
  };

  const removeToken = (token: string, index: number) => {
    if (status === "correct") return;
    clearWrongState();
    setAvailableTokens((current) => [...current, token]);
    setAssembledTokens((current) =>
      current.filter((_, tokenIndex) => tokenIndex !== index)
    );
  };

  const reset = () => {
    setAssembledTokens([]);
    setAvailableTokens(shuffledTokens(exerciseIndex));
    setStatus("none");
  };

  const check = () => {
    const answer = assembledTokens.join(" ").trim().toLocaleLowerCase("en");
    setStatus(
      answer === exercise.correctSentence.trim().toLocaleLowerCase("en")
        ? "correct"
        : "wrong"
    );
  };

  const next = () => {
    const nextIndex = (exerciseIndex + 1) % mockGrammarExercises.length;
    setExerciseIndex(nextIndex);
    setAvailableTokens(shuffledTokens(nextIndex));
    setAssembledTokens([]);
    setStatus("none");
    setShowHint(false);
  };

  return (
    <ActivityShell
      label="Grammar"
      icon={Puzzle}
      title="Make the sentence click"
      description="Build a natural English sentence from the word tiles. You can remove any tile and try again before checking."
      step={exerciseIndex + 1}
      totalSteps={mockGrammarExercises.length}
      stepLabel="Sentence builder"
      tip="Find the subject and verb first. Add the object and location phrase after the core sentence makes sense."
      evaluation="Your tile order is compared with the expected sentence. No AI is needed for this structured exercise."
    >
      <section className="rounded-2xl border border-[#e3ded2] bg-white p-5 shadow-[0_14px_36px_rgba(76,67,40,0.06)] sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-extrabold text-[#6e5e06]">
              Build this English sentence
            </p>
            <h2 className="mt-2 font-heading text-xl font-extrabold leading-8 text-[#1d1b15]">
              &ldquo;{exercise.translation}&rdquo;
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setShowHint((current) => !current)}
            aria-expanded={showHint}
            className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xl px-3 text-xs font-extrabold text-[#6e5e06] hover:bg-[#f3ede2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06]"
          >
            <HelpCircle className="h-4 w-4" />
            {showHint ? "Hide hint" : "Show hint"}
          </button>
        </div>

        {showHint && (
          <div
            className={cn(
              styles.celebrate,
              "mt-5 rounded-xl border border-[#d9cfad] bg-[#fff9ee] p-4 text-sm leading-6 text-[#5f5a49]"
            )}
          >
            <strong className="text-[#6e5e06]">Grammar hint:</strong>{" "}
            {exercise.ruleHint.replace("Rule: ", "")}
          </div>
        )}

        <div className="mt-7">
          <div className="mb-2 flex items-center justify-between text-xs font-bold text-[#6d6858]">
            <span>Your sentence</span>
            <span>{assembledTokens.length} words placed</span>
          </div>
          <div
            className={`flex min-h-28 flex-wrap content-start gap-2.5 rounded-2xl border-2 border-dashed p-4 transition-colors ${
              status === "correct"
                ? "border-[#9b8d39] bg-[#fff9d6]"
                : status === "wrong"
                  ? "border-[#c77b70] bg-[#fff4f1]"
                  : "border-[#d8d1c4] bg-[#fbf8f2]"
            }`}
            aria-live="polite"
          >
            {assembledTokens.length === 0 ? (
              <p className="m-auto text-center text-sm font-semibold text-[#8a8576]">
                Choose the words below in sentence order.
              </p>
            ) : (
              assembledTokens.map((token, index) => (
                <button
                  key={`${token}-${index}`}
                  type="button"
                  onClick={() => removeToken(token, index)}
                  className="min-h-11 rounded-xl border border-[#6e5e06] bg-[#fff9d6] px-4 text-sm font-extrabold text-[#534600] shadow-[0_3px_0_#d4c35c] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] active:translate-y-0.5 active:shadow-none motion-reduce:transform-none"
                >
                  {token}
                </button>
              ))
            )}
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-3 text-xs font-extrabold text-[#6d6858]">
            Word bank
          </p>
          <div className="flex min-h-14 flex-wrap gap-2.5">
            {availableTokens.map((token, index) => (
              <button
                key={`${token}-${index}`}
                type="button"
                onClick={() => selectToken(token, index)}
                className="min-h-11 rounded-xl border-2 border-[#e3ded2] bg-white px-4 text-sm font-extrabold text-[#1d1b15] shadow-[0_3px_0_#e3ded2] transition-[transform,border-color,background-color] hover:border-[#b8a744] hover:bg-[#fffdf6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] active:translate-y-0.5 active:shadow-none motion-reduce:transform-none"
              >
                {token}
              </button>
            ))}
          </div>
        </div>

        {status !== "none" && (
          <div
            className={cn(
              styles.celebrate,
              "mt-6 flex items-start gap-3 rounded-2xl border p-4",
              status === "correct"
                ? "border-[#d1c25f] bg-[#fff9d6] text-[#534600]"
                : "border-[#e0aaa2] bg-[#fff4f1] text-[#87372e]"
            )}
          >
            {status === "correct" ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
            ) : (
              <XCircle className="mt-0.5 h-5 w-5 shrink-0" />
            )}
            <div>
              <p className="font-heading text-sm font-extrabold">
                {status === "correct" ? "That sounds natural" : "Almost there"}
              </p>
              <p className="mt-1 text-xs leading-5">
                {status === "correct"
                  ? `Correct: ${exercise.correctSentence}.`
                  : "Move a tile and check the sentence again. The hint can help with the basic order."}
              </p>
            </div>
          </div>
        )}

        <div className="mt-7 flex flex-col-reverse gap-3 border-t border-[#ece7dc] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="primaryOutline"
            onClick={reset}
            disabled={assembledTokens.length === 0}
            className="normal-case tracking-normal"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset tiles
          </Button>
          {status === "correct" ? (
            <Button
              type="button"
              variant="secondary"
              onClick={next}
              className="normal-case tracking-normal"
            >
              Next sentence
              <Sparkles className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              variant="secondary"
              onClick={check}
              disabled={availableTokens.length > 0}
              className="normal-case tracking-normal"
            >
              Check sentence
            </Button>
          )}
        </div>
      </section>
    </ActivityShell>
  );
}
