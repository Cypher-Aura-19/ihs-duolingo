"use client";

import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  Lightbulb,
  PenLine,
  RotateCcw,
  Sparkles,
} from "lucide-react";

import { ActivityShell } from "@/components/activities/activity-shell";
import styles from "@/components/activities/activity-motion.module.css";
import { Button } from "@/components/ui/button";
import { mockWritingPrompts } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type Evaluation = {
  score: number;
  grammarAccuracy: number;
  lexicalRichness: number;
  cohesionScore: number;
  feedback: string;
  suggestions: string[];
};

export default function WritingActivityPage() {
  const [essayText, setEssayText] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [showSample, setShowSample] = useState(false);
  const evaluationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const prompt = mockWritingPrompts[0];
  const wordCount = essayText.trim() ? essayText.trim().split(/\s+/).length : 0;
  const ready = wordCount >= prompt.minWords;

  useEffect(() => {
    return () => {
      if (evaluationTimeoutRef.current)
        clearTimeout(evaluationTimeoutRef.current);
    };
  }, []);

  const evaluate = () => {
    if (!ready || isEvaluating) return;
    setIsEvaluating(true);
    setEvaluation(null);
    evaluationTimeoutRef.current = setTimeout(() => {
      setIsEvaluating(false);
      setEvaluation({
        score: 93,
        grammarAccuracy: 95,
        lexicalRichness: 92,
        cohesionScore: 92,
        feedback:
          "Your reflection is clear and well connected. The vocabulary feels natural, and agreement stays consistent across the paragraph.",
        suggestions: [
          "Add one contrasting connector, such as “however” or “although,” to vary the sentence structure.",
          "Keep the strong closing idea about building trust through careful listening.",
        ],
      });
    }, 1300);
  };

  const clearEditor = () => {
    setEssayText("");
    setEvaluation(null);
    setShowSample(false);
  };

  return (
    <ActivityShell
      label="Writing"
      icon={PenLine}
      title="Turn a thought into a clear paragraph"
      description="Write a short English reflection, keep an eye on the brief, and submit when your idea feels complete."
      step={ready ? 2 : 1}
      totalSteps={2}
      stepLabel="Guided writing"
      tip="Draft the main idea first. Add connectors such as “however” or “therefore” only where the relationship is clear."
      evaluation="Open-ended writing needs interpretation. In production, the submitted text can be evaluated against a configured rubric and returned with focused feedback."
    >
      <section className="rounded-2xl border border-[#e3ded2] bg-white p-5 shadow-[0_14px_36px_rgba(76,67,40,0.06)] sm:p-7">
        <div className="rounded-2xl border border-[#d8cfaf] bg-[#fff9ee] p-5">
          <p className="text-xs font-extrabold text-[#6e5e06]">
            {prompt.topic}
          </p>
          <h2 className="mt-2 font-heading text-xl font-extrabold text-[#1d1b15]">
            {prompt.title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#5f5a49]">
            {prompt.prompt}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {prompt.rubricFocus.map((item) => (
              <span
                key={item}
                className="rounded-lg border border-[#dfd6b8] bg-white px-3 py-2 text-xs font-bold text-[#534600]"
              >
                {item.replace(" & ", " and ")}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between gap-4">
            <label
              htmlFor="english-reflection"
              className="text-xs font-extrabold text-[#1d1b15]"
            >
              Your English reflection
            </label>
            <span
              className={`text-xs font-extrabold ${ready ? "text-[#6e5e06]" : "text-[#7a7566]"}`}
              aria-live="polite"
            >
              {wordCount} words / {prompt.minWords} minimum
            </span>
          </div>
          <textarea
            id="english-reflection"
            value={essayText}
            onChange={(event) => {
              setEssayText(event.target.value);
              if (evaluation) setEvaluation(null);
            }}
            rows={10}
            spellCheck
            placeholder="Write your reflection here..."
            className="w-full resize-y rounded-2xl border-2 border-[#d8d1c4] bg-[#fbf8f2] p-5 text-base font-medium leading-7 text-[#1d1b15] outline-none transition-[border-color,background-color,box-shadow] placeholder:text-[#989282] focus:border-[#6e5e06] focus:bg-white focus:ring-2 focus:ring-[#d9cd7b]"
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-[#7a7566]">
              Recommended length: 40-80 words
            </p>
            <button
              type="button"
              onClick={() => setShowSample((current) => !current)}
              aria-expanded={showSample}
              className="inline-flex min-h-10 items-center gap-2 rounded-xl px-3 text-xs font-extrabold text-[#6e5e06] hover:bg-[#f3ede2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06]"
            >
              <Lightbulb className="h-4 w-4" />
              {showSample ? "Hide example" : "Need an example?"}
            </button>
          </div>
          {showSample && (
            <div
              className={cn(
                styles.celebrate,
                "mt-3 rounded-xl border border-[#d9cfad] bg-[#fff9ee] p-4 text-sm leading-6 text-[#5f5a49]"
              )}
            >
              <strong className="block text-[#6e5e06]">
                Example structure
              </strong>
              <span className="mt-1 block">{prompt.sampleAnswer}</span>
              <button
                type="button"
                onClick={() => {
                  setEssayText(prompt.sampleAnswer);
                  setShowSample(false);
                }}
                className="mt-3 min-h-9 rounded-lg border border-[#6e5e06] px-3 text-xs font-extrabold text-[#6e5e06] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06]"
              >
                Use this draft
              </button>
            </div>
          )}
        </div>

        {isEvaluating && (
          <div
            className="my-7 rounded-2xl border border-[#d8cfaf] bg-[#fff9ee] p-7 text-center"
            aria-live="polite"
          >
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#d6c95f] border-t-[#6e5e06] motion-reduce:animate-none" />
            <p className="mt-4 font-heading text-base font-extrabold text-[#1d1b15]">
              Reading your paragraph
            </p>
            <p className="mt-1 text-sm text-[#6d6858]">
              Checking grammar, word choice, and cohesion.
            </p>
          </div>
        )}

        {evaluation && (
          <div className={cn(styles.celebrate, "mt-7")} aria-live="polite">
            <div className="flex items-start gap-3 rounded-2xl border border-[#d1c25f] bg-[#fff9d6] p-5 text-[#534600]">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="font-heading text-lg font-extrabold">
                  Clear and well connected
                </p>
                <p className="mt-1 text-sm leading-6">{evaluation.feedback}</p>
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                ["Grammar", evaluation.grammarAccuracy],
                ["Vocabulary", evaluation.lexicalRichness],
                ["Cohesion", evaluation.cohesionScore],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[#e3ded2] bg-white p-4"
                >
                  <p className="font-heading text-2xl font-extrabold text-[#6e5e06]">
                    {value}%
                  </p>
                  <p className="mt-1 text-xs font-bold text-[#6d6858]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {evaluation.suggestions.map((suggestion) => (
                <div
                  key={suggestion}
                  className="flex items-start gap-2 rounded-xl border border-[#e3ded2] bg-[#fbf8f2] p-4 text-xs leading-5 text-[#5f5a49]"
                >
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#6e5e06]" />
                  {suggestion}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-7 flex flex-col-reverse gap-3 border-t border-[#ece7dc] pt-5 sm:flex-row sm:justify-between">
          <Button
            type="button"
            variant="primaryOutline"
            onClick={clearEditor}
            disabled={!essayText}
            className="normal-case tracking-normal"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Clear draft
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={evaluate}
            disabled={!ready || isEvaluating}
            className="normal-case tracking-normal"
          >
            Review my writing
            <Sparkles className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </ActivityShell>
  );
}
