"use client";

import { useEffect, useRef, useState } from "react";
import {
  Award,
  CheckCircle2,
  FileCheck2,
  Headphones,
  Mic2,
  RotateCcw,
  Sparkles,
  XCircle,
} from "lucide-react";

import { ActivityShell } from "@/components/activities/activity-shell";
import styles from "@/components/activities/activity-motion.module.css";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const parts = ["Vocabulary", "Grammar", "Listening", "Speaking"] as const;

const vocabularyOptions = ["Knowledge", "Breakfast", "Luggage", "Telephone"];

const grammarOptions = [
  "The professor explains the lesson in the library.",
  "Explains professor library the in lesson the.",
  "The lesson professor explains in library the.",
  "Library in professor the explains lesson the.",
];

const listeningOptions = [
  "Good morning",
  "Good evening",
  "See you later",
  "Please",
];

export default function MilestoneActivityPage() {
  const [part, setPart] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [speakingVerified, setSpeakingVerified] = useState(false);
  const [checkingSpeech, setCheckingSpeech] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const speechTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
      window.speechSynthesis?.cancel();
    };
  }, []);

  const checkSpeech = () => {
    setCheckingSpeech(true);
    speechTimeoutRef.current = setTimeout(() => {
      setCheckingSpeech(false);
      setSpeakingVerified(true);
    }, 1300);
  };

  const playListeningPrompt = () => {
    if (isListening) {
      window.speechSynthesis.cancel();
      setIsListening(false);
      return;
    }
    if (!("speechSynthesis" in window)) return;

    const utterance = new SpeechSynthesisUtterance(
      "Good morning. Welcome to the faculty of humanities and social sciences."
    );
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    utterance.onend = () => setIsListening(false);
    utterance.onerror = () => setIsListening(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsListening(true);
  };

  const score =
    [0, 1, 2].reduce(
      (total, index) => total + (answers[index] === 0 ? 25 : 0),
      0
    ) + (speakingVerified ? 25 : 0);
  const passed = score >= 70 && speakingVerified;
  const currentComplete =
    part === 3 ? speakingVerified : answers[part] !== undefined;

  const resetExam = () => {
    setPart(0);
    setAnswers({});
    setSpeakingVerified(false);
    setCheckingSpeech(false);
    setSubmitted(false);
    window.speechSynthesis?.cancel();
    setIsListening(false);
  };

  return (
    <ActivityShell
      label="Milestone"
      icon={FileCheck2}
      title="Bring the four core skills together"
      description="Complete vocabulary, grammar, listening, and a required speaking check. You need 70% or more to pass."
      step={submitted ? 4 : part + 1}
      totalSteps={4}
      stepLabel={submitted ? "Assessment result" : `${parts[part]} section`}
      tip="Do not rush the final answer. You can move between completed sections before submitting the assessment."
      evaluation="Structured answers use deterministic checks. Speaking is mandatory and would use speech processing in production before the milestone can complete."
    >
      <section className="rounded-2xl border border-[#e3ded2] bg-white p-5 shadow-[0_14px_36px_rgba(76,67,40,0.06)] sm:p-7">
        {!submitted ? (
          <>
            <div
              className="grid grid-cols-2 gap-2 rounded-2xl border border-[#dcd6ca] bg-[#f6f1e8] p-2 sm:grid-cols-4"
              aria-label="Assessment sections"
            >
              {parts.map((label, index) => {
                const complete =
                  index === 3 ? speakingVerified : answers[index] !== undefined;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setPart(index)}
                    className={`min-h-12 rounded-xl px-3 text-xs font-extrabold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] ${
                      part === index
                        ? "bg-white text-[#6e5e06] shadow-sm"
                        : "text-[#6d6858] hover:text-[#1d1b15]"
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {complete && (
                        <CheckCircle2 className="h-4 w-4 text-[#6e5e06]" />
                      )}
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="min-h-[410px] py-7">
              {part === 0 && (
                <ExamQuestion
                  label="Vocabulary"
                  question="Which term means scholarly knowledge acquired through research?"
                  options={vocabularyOptions}
                  selected={answers[0]}
                  onSelect={(answer) =>
                    setAnswers((current) => ({ ...current, 0: answer }))
                  }
                />
              )}

              {part === 1 && (
                <ExamQuestion
                  label="Grammar"
                  question="Select the grammatically natural formal sentence."
                  options={grammarOptions}
                  selected={answers[1]}
                  onSelect={(answer) =>
                    setAnswers((current) => ({ ...current, 1: answer }))
                  }
                />
              )}

              {part === 2 && (
                <div>
                  <p className="text-xs font-extrabold text-[#6e5e06]">
                    Listening
                  </p>
                  <h2 className="mt-2 font-heading text-xl font-extrabold leading-8 text-[#1d1b15]">
                    What greeting is used in the formal address?
                  </h2>
                  <div className="mt-5 rounded-2xl border border-[#d8cfaf] bg-[#fff9ee] p-4">
                    <div className="mb-3 flex items-center gap-2 text-xs font-extrabold text-[#534600]">
                      <Headphones className="h-4 w-4" />
                      Listen before answering
                    </div>
                    <button
                      type="button"
                      onClick={playListeningPrompt}
                      className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#6e5e06] bg-white px-4 text-sm font-extrabold text-[#6e5e06] shadow-[0_3px_0_#d8cfaf] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] active:translate-y-0.5 active:shadow-none motion-reduce:transform-none"
                    >
                      <Headphones className="h-4 w-4" />
                      {isListening
                        ? "Stop English prompt"
                        : "Play English prompt"}
                    </button>
                  </div>
                  <OptionGrid
                    options={listeningOptions}
                    selected={answers[2]}
                    onSelect={(answer) =>
                      setAnswers((current) => ({ ...current, 2: answer }))
                    }
                  />
                </div>
              )}

              {part === 3 && (
                <div className="text-center">
                  <p className="text-xs font-extrabold text-[#6e5e06]">
                    Required speaking check
                  </p>
                  <h2 className="mx-auto mt-3 max-w-xl font-heading text-2xl font-extrabold leading-9 text-[#1d1b15]">
                    &ldquo;Knowledge is the foundation of meaningful
                    progress.&rdquo;
                  </h2>
                  <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#6d6858]">
                    Say the sentence at a natural pace. This requirement must be
                    complete before submission.
                  </p>
                  <div
                    className="mx-auto mt-7 flex h-16 items-center justify-center gap-1.5"
                    aria-hidden="true"
                  >
                    {[22, 40, 28, 52, 34, 58, 30, 46, 24].map(
                      (height, index) => (
                        <span
                          key={index}
                          className={cn(
                            styles.recordingBar,
                            "w-2 rounded-full bg-[#6e5e06]",
                            !checkingSpeech && "opacity-25"
                          )}
                          style={{ height }}
                        />
                      )
                    )}
                  </div>
                  {speakingVerified ? (
                    <div
                      className={cn(
                        styles.celebrate,
                        "mx-auto mt-5 flex max-w-md items-start gap-3 rounded-2xl border border-[#d1c25f] bg-[#fff9d6] p-4 text-left text-[#534600]"
                      )}
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                      <div>
                        <p className="font-heading text-sm font-extrabold">
                          Speaking requirement complete
                        </p>
                        <p className="mt-1 text-xs leading-5">
                          Your practice sample met the pronunciation threshold.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={checkSpeech}
                      disabled={checkingSpeech}
                      className="mx-auto mt-5 flex h-20 w-20 items-center justify-center rounded-full border border-[#443a01] bg-[#6e5e06] text-white shadow-[0_7px_0_#443a01] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] focus-visible:ring-offset-2 active:translate-y-1 active:shadow-none disabled:opacity-60 motion-reduce:transform-none"
                      aria-label="Start speaking check"
                    >
                      {checkingSpeech ? (
                        <span className="border-3 h-7 w-7 animate-spin rounded-full border-white border-t-transparent motion-reduce:animate-none" />
                      ) : (
                        <Mic2 className="h-8 w-8" />
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-[#ece7dc] pt-5 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="button"
                variant="primaryOutline"
                onClick={() => setPart((current) => Math.max(0, current - 1))}
                disabled={part === 0}
                className="normal-case tracking-normal"
              >
                Previous section
              </Button>
              {part < 3 ? (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setPart((current) => current + 1)}
                  disabled={!currentComplete}
                  className="normal-case tracking-normal"
                >
                  Continue to {parts[part + 1]}
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setSubmitted(true)}
                  disabled={
                    !speakingVerified ||
                    answers[0] === undefined ||
                    answers[1] === undefined ||
                    answers[2] === undefined
                  }
                  className="normal-case tracking-normal"
                >
                  Submit assessment
                  <Award className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </>
        ) : (
          <div className={styles.celebrate}>
            <div
              className={`rounded-2xl border p-6 text-center ${passed ? "border-[#d1c25f] bg-[#fff9d6] text-[#534600]" : "border-[#e0aaa2] bg-[#fff4f1] text-[#87372e]"}`}
            >
              {passed ? (
                <Sparkles className="mx-auto h-8 w-8" />
              ) : (
                <XCircle className="mx-auto h-8 w-8" />
              )}
              <p className="mt-3 text-xs font-extrabold">Final score</p>
              <h2 className="mt-1 font-heading text-4xl font-extrabold">
                {score}%
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6">
                {passed
                  ? "You passed the milestone and completed the required speaking section."
                  : "You need at least 70% and a completed speaking section. Review and try again."}
              </p>
            </div>

            {passed && (
              <div className="mt-6 rounded-2xl border-2 border-[#b8a744] bg-white p-5 shadow-[0_12px_0_#e1d59a] sm:p-7">
                <div className="rounded-xl border border-[#d8cfaf] bg-[#fff9ee] p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-[#dcc669] bg-[#fae282] text-[#534600]">
                    <Award className="h-6 w-6" />
                  </div>
                  <p className="mt-4 text-xs font-extrabold text-[#6e5e06]">
                    Certificate preview
                  </p>
                  <h3 className="mt-2 font-heading text-2xl font-extrabold text-[#1d1b15]">
                    English Foundations
                  </h3>
                  <p className="mt-2 text-sm text-[#5f5a49]">
                    Awarded to Guest Scholar for completing the Foundations and
                    Articulation milestone.
                  </p>
                  <div className="mt-5 grid gap-2 border-t border-[#e5dbb8] pt-4 text-xs text-[#6d6858] sm:grid-cols-2">
                    <span>Score: {score}%</span>
                    <span>Verification: CERT-IHS-2026-9901</span>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-7 flex justify-start border-t border-[#ece7dc] pt-5">
              <Button
                type="button"
                variant="primaryOutline"
                onClick={resetExam}
                className="normal-case tracking-normal"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Retake assessment
              </Button>
            </div>
          </div>
        )}
      </section>
    </ActivityShell>
  );
}

function ExamQuestion({
  label,
  question,
  options,
  selected,
  onSelect,
}: {
  label: string;
  question: string;
  options: string[];
  selected: number | undefined;
  onSelect: (answer: number) => void;
}) {
  return (
    <div>
      <p className="text-xs font-extrabold text-[#6e5e06]">{label}</p>
      <h2 className="mt-2 font-heading text-xl font-extrabold leading-8 text-[#1d1b15]">
        {question}
      </h2>
      <OptionGrid options={options} selected={selected} onSelect={onSelect} />
    </div>
  );
}

function OptionGrid({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected: number | undefined;
  onSelect: (answer: number) => void;
}) {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {options.map((option, index) => (
        <button
          key={option}
          type="button"
          onClick={() => onSelect(index)}
          className={`min-h-16 rounded-xl border-2 p-4 text-left text-sm font-bold transition-[transform,border-color,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] active:scale-[0.99] motion-reduce:transform-none ${
            selected === index
              ? "border-[#6e5e06] bg-[#fff9d6] text-[#534600]"
              : "border-[#e3ded2] bg-white text-[#1d1b15] hover:border-[#b8a744]"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
