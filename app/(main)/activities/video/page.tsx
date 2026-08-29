"use client";

import { useRef, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  PlaySquare,
  Sparkles,
  XCircle,
} from "lucide-react";

import { ActivityShell } from "@/components/activities/activity-shell";
import styles from "@/components/activities/activity-motion.module.css";
import { Button } from "@/components/ui/button";
import { mockVideoLessons } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const timeToSeconds = (time: string) => {
  const [minutes, seconds] = time.split(":").map(Number);
  return minutes * 60 + seconds;
};

export default function VideoActivityPage() {
  const lesson = mockVideoLessons[0];
  const checkpoint = lesson.checkpoints[0];
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const chooseChapter = async (index: number, time: string) => {
    setActiveChapter(index);
    if (!videoRef.current) return;
    videoRef.current.currentTime = timeToSeconds(time);
    try {
      await videoRef.current.play();
    } catch {
      setVideoError(true);
    }
  };

  const isCorrect = selectedAnswer === checkpoint.correctIndex;

  return (
    <ActivityShell
      label="Video"
      icon={PlaySquare}
      title="Watch with a purpose"
      description="Use the lesson chapters to move at your pace, then answer a checkpoint before completing the activity."
      step={checked ? 2 : 1}
      totalSteps={2}
      stepLabel={`${lesson.duration} video lesson`}
      tip="Pause after each chapter and explain the main rule in your own words. Retrieval keeps video learning active."
      evaluation="The video is course content. The checkpoint is evaluated with normal application logic and can be required for completion."
    >
      <section className="overflow-hidden rounded-2xl border border-[#e3ded2] bg-white shadow-[0_14px_36px_rgba(76,67,40,0.06)]">
        <div className="p-5 sm:p-7">
          <p className="text-xs font-extrabold text-[#6e5e06]">Video lesson</p>
          <h2 className="mt-2 font-heading text-xl font-extrabold leading-8 text-[#1d1b15]">
            {lesson.title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#6d6858]">
            With {lesson.instructor}
          </p>
        </div>

        <div className="bg-[#25231d]">
          <video
            ref={videoRef}
            controls
            playsInline
            preload="metadata"
            poster="/hero.svg"
            src={lesson.videoUrl}
            className="aspect-video w-full object-cover"
            onError={() => setVideoError(true)}
          >
            Your browser does not support video playback.
          </video>
        </div>

        {videoError && (
          <p
            className="m-5 rounded-xl border border-[#e0aaa2] bg-[#fff4f1] p-3 text-xs font-bold text-[#87372e]"
            role="alert"
          >
            The lesson video could not be loaded. Check your connection and try
            again.
          </p>
        )}

        <div className="grid gap-6 p-5 sm:p-7 xl:grid-cols-[minmax(0,1fr)_240px]">
          <div>
            <div className="mb-4 flex items-center justify-between gap-4">
              <h3 className="font-heading text-base font-extrabold text-[#1d1b15]">
                Lesson chapters
              </h3>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6d6858]">
                <Clock3 className="h-4 w-4 text-[#6e5e06]" />
                {lesson.duration}
              </span>
            </div>
            <div className="grid gap-2.5">
              {lesson.timestamps.map((chapter, index) => (
                <button
                  key={chapter.time}
                  type="button"
                  onClick={() => chooseChapter(index, chapter.time)}
                  aria-pressed={activeChapter === index}
                  className={`flex min-h-14 items-center justify-between gap-4 rounded-xl border px-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] ${
                    activeChapter === index
                      ? "border-[#6e5e06] bg-[#fff9d6]"
                      : "border-[#e3ded2] bg-white hover:border-[#b8a744]"
                  }`}
                >
                  <span className="text-sm font-bold text-[#1d1b15]">
                    {chapter.title}
                  </span>
                  <span className="shrink-0 font-mono text-xs font-bold text-[#6e5e06]">
                    {chapter.time}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl border border-[#d8cfaf] bg-[#fff9ee] p-5">
            <h3 className="font-heading text-sm font-extrabold text-[#1d1b15]">
              Keep these ideas
            </h3>
            <div className="mt-4 space-y-4">
              {lesson.keyTakeaways.map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-3 text-xs leading-5 text-[#5f5a49]"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-[#d9cc86] bg-white font-heading text-[11px] font-extrabold text-[#6e5e06]">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="border-t border-[#ece7dc] bg-[#fbf8f2] p-5 sm:p-7">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-extrabold text-[#6e5e06]">
                Checkpoint at {checkpoint.time}
              </p>
              <h3 className="mt-2 font-heading text-base font-extrabold leading-6 text-[#1d1b15]">
                {checkpoint.question}
              </h3>
            </div>
          </div>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {checkpoint.options.map((option, index) => {
              const selected = selectedAnswer === index;
              const isAnswer = index === checkpoint.correctIndex;
              const optionStyle =
                checked && isAnswer
                  ? "border-[#9b8d39] bg-[#fff9d6] text-[#534600]"
                  : checked && selected && !isAnswer
                    ? "border-[#c77b70] bg-[#fff4f1] text-[#87372e]"
                    : selected
                      ? "border-[#6e5e06] bg-[#fff9d6] text-[#534600]"
                      : "border-[#ded8cc] bg-white text-[#1d1b15] hover:border-[#b8a744]";
              return (
                <button
                  key={option}
                  type="button"
                  disabled={checked}
                  onClick={() => setSelectedAnswer(index)}
                  className={`min-h-14 rounded-xl border-2 px-4 py-3 text-left text-sm font-bold transition-[transform,border-color,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] active:scale-[0.99] motion-reduce:transform-none ${optionStyle}`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {checked && (
            <div
              className={cn(
                styles.celebrate,
                `mt-4 flex items-start gap-2 rounded-xl border p-4 text-xs leading-5 ${isCorrect ? "border-[#d1c25f] bg-[#fff9d6] text-[#534600]" : "border-[#e0aaa2] bg-[#fff4f1] text-[#87372e]"}`
              )}
              aria-live="polite"
            >
              {isCorrect ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              ) : (
                <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
              )}
              <span>
                {isCorrect
                  ? "Correct. Hacer changes to hago in the first-person present form."
                  : "Review the irregular stem example, then try the checkpoint again."}
              </span>
            </div>
          )}

          <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            {checked && !isCorrect ? (
              <Button
                type="button"
                variant="primaryOutline"
                onClick={() => {
                  setChecked(false);
                  setSelectedAnswer(null);
                }}
                className="normal-case tracking-normal"
              >
                Try again
              </Button>
            ) : (
              <span />
            )}
            <Button
              type="button"
              variant="secondary"
              onClick={() => setChecked(true)}
              disabled={selectedAnswer === null || checked}
              className="normal-case tracking-normal"
            >
              Check answer
              <Sparkles className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </ActivityShell>
  );
}
