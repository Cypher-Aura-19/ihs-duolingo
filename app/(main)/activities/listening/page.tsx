"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Headphones,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  XCircle,
} from "lucide-react";

import { ActivityShell } from "@/components/activities/activity-shell";
import styles from "@/components/activities/activity-motion.module.css";
import { Button } from "@/components/ui/button";
import { mockListeningActivities } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type Speed = 0.75 | 1 | 1.25;

const normalizePhrase = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("en")
    .replace(/[^a-z\s]/g, "")
    .trim()
    .replace(/\s+/g, " ");

export default function ListeningActivityPage() {
  const [activityIndex, setActivityIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<Speed>(1);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [dictationInput, setDictationInput] = useState("");
  const [dictationStatus, setDictationStatus] = useState<
    "none" | "correct" | "wrong"
  >("none");
  const [showTranscript, setShowTranscript] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const activity = mockListeningActivities[activityIndex];
  const selectedOption = activity.options.find(
    (option) => option.id === selectedOptionId
  );

  useEffect(() => {
    return () => window.speechSynthesis?.cancel();
  }, []);

  const togglePlay = () => {
    setAudioError(false);
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    if (!("speechSynthesis" in window)) {
      setAudioError(true);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(activity.transcript);
    utterance.lang = "en-US";
    utterance.rate = playbackSpeed;
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => {
      setAudioError(true);
      setIsPlaying(false);
    };
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const changeSpeed = (speed: Speed) => {
    setPlaybackSpeed(speed);
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const checkDictation = () => {
    const inputWords = normalizePhrase(dictationInput)
      .split(" ")
      .filter(Boolean);
    const targetWords = normalizePhrase(activity.dictationTarget)
      .split(" ")
      .filter(Boolean);
    const correctWords = inputWords.filter(
      (word, index) => word === targetWords[index]
    ).length;
    const closeEnough =
      inputWords.length >= targetWords.length - 1 &&
      correctWords / targetWords.length >= 0.8;
    setDictationStatus(closeEnough ? "correct" : "wrong");
  };

  const next = () => {
    window.speechSynthesis?.cancel();
    setActivityIndex(
      (current) => (current + 1) % mockListeningActivities.length
    );
    setIsPlaying(false);
    setSelectedOptionId(null);
    setDictationInput("");
    setDictationStatus("none");
    setShowTranscript(false);
    setAudioError(false);
  };

  return (
    <ActivityShell
      label="Listening"
      icon={Headphones}
      title="Listen for meaning, then for detail"
      description="Play a short English clip, answer one comprehension question, and finish with dictation."
      step={activityIndex + 1}
      totalSteps={mockListeningActivities.length}
      stepLabel="Listening studio"
      tip="Listen once without reading. On the second play, focus on names, times, and other specific details."
      evaluation="Multiple choice and dictation are checked by normal application logic. The model clip uses your browser’s English voice."
    >
      <section className="rounded-2xl border border-[#e3ded2] bg-white p-5 shadow-[0_14px_36px_rgba(76,67,40,0.06)] sm:p-7">
        <div className="mb-6">
          <p className="text-xs font-extrabold text-[#6e5e06]">
            Track {activityIndex + 1}
          </p>
          <h2 className="mt-2 font-heading text-xl font-extrabold text-[#1d1b15]">
            {activity.title}
          </h2>
        </div>

        <div className="rounded-2xl border border-[#d8cfaf] bg-[#fff9ee] p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause audio" : "Play audio"}
              className="flex h-16 w-16 shrink-0 items-center justify-center self-center rounded-full border border-[#443a01] bg-[#6e5e06] text-white shadow-[0_6px_0_#443a01] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] focus-visible:ring-offset-2 active:translate-y-1 active:shadow-none motion-reduce:transform-none sm:self-auto"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="ml-0.5 h-6 w-6" />
              )}
            </button>
            <div className="min-w-0 flex-1">
              <div
                className="flex h-14 items-center justify-center gap-1.5 rounded-xl border border-[#e3d8b5] bg-white px-4"
                aria-hidden="true"
              >
                {[
                  18, 30, 44, 26, 48, 34, 20, 40, 28, 46, 24, 36, 18, 32, 22,
                ].map((height, index) => (
                  <span
                    key={index}
                    className={cn(
                      styles.recordingBar,
                      "w-1.5 rounded-full bg-[#6e5e06]",
                      !isPlaying && "opacity-45"
                    )}
                    style={{ height }}
                  />
                ))}
              </div>
              <p className="mt-2 text-center text-xs font-bold text-[#6d6858] sm:text-left">
                {isPlaying
                  ? "Playing English model audio"
                  : "Ready when you are"}
              </p>
            </div>
            <div
              className="grid grid-cols-3 rounded-xl border border-[#dcd6ca] bg-white p-1"
              aria-label="Playback speed"
            >
              {([0.75, 1, 1.25] as Speed[]).map((speed) => (
                <button
                  key={speed}
                  type="button"
                  onClick={() => changeSpeed(speed)}
                  aria-pressed={playbackSpeed === speed}
                  className={`min-h-9 rounded-lg px-2 text-xs font-extrabold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] ${
                    playbackSpeed === speed
                      ? "bg-[#6e5e06] text-white"
                      : "text-[#6d6858] hover:bg-[#f3ede2]"
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>
          {audioError && (
            <p
              className="mt-4 rounded-xl border border-[#e0aaa2] bg-[#fff4f1] p-3 text-xs font-bold text-[#87372e]"
              role="alert"
            >
              Your browser’s English voice could not be started. Try again or
              reveal the transcript.
            </p>
          )}
        </div>

        <div className="mt-7">
          <p className="text-xs font-extrabold text-[#6e5e06]">Comprehension</p>
          <h3 className="mt-2 font-heading text-base font-extrabold leading-6 text-[#1d1b15]">
            {activity.question}
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {activity.options.map((option) => {
              const selected = selectedOptionId === option.id;
              const showCorrect = selected && option.correct;
              const showWrong = selected && !option.correct;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedOptionId(option.id)}
                  className={`min-h-16 rounded-xl border-2 p-4 text-left text-sm font-bold transition-[transform,border-color,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] active:scale-[0.99] motion-reduce:transform-none ${
                    showCorrect
                      ? "border-[#9b8d39] bg-[#fff9d6] text-[#534600]"
                      : showWrong
                        ? "border-[#c77b70] bg-[#fff4f1] text-[#87372e]"
                        : "border-[#e3ded2] bg-white text-[#1d1b15] hover:border-[#b8a744]"
                  }`}
                >
                  {option.text}
                </button>
              );
            })}
          </div>
          {selectedOption && (
            <p
              className={`mt-3 flex items-center gap-2 text-xs font-bold ${selectedOption.correct ? "text-[#6e5e06]" : "text-[#87372e]"}`}
              aria-live="polite"
            >
              {selectedOption.correct ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              {selectedOption.correct
                ? "Correct. You caught the key detail."
                : "Listen once more and focus on the named detail."}
            </p>
          )}
        </div>

        <div className="mt-8 rounded-2xl border border-[#e3ded2] bg-[#fbf8f2] p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-extrabold text-[#6e5e06]">Dictation</p>
              <h3 className="mt-1 font-heading text-base font-extrabold text-[#1d1b15]">
                Type the first phrase you hear
              </h3>
            </div>
            <button
              type="button"
              onClick={() => {
                setDictationInput("");
                setDictationStatus("none");
              }}
              aria-label="Reset dictation"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-[#6e5e06] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06]"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="dictation-answer">
              Dictation answer
            </label>
            <input
              id="dictation-answer"
              value={dictationInput}
              onChange={(event) => {
                setDictationInput(event.target.value);
                if (dictationStatus !== "none") setDictationStatus("none");
              }}
              placeholder="Type the English phrase"
              autoComplete="off"
              className="min-h-12 flex-1 rounded-xl border-2 border-[#d8d1c4] bg-white px-4 text-sm font-semibold text-[#1d1b15] outline-none transition-colors placeholder:text-[#989282] focus:border-[#6e5e06] focus:ring-2 focus:ring-[#d9cd7b]"
            />
            <Button
              type="button"
              variant="secondary"
              onClick={checkDictation}
              disabled={!dictationInput.trim()}
              className="normal-case tracking-normal"
            >
              Check dictation
            </Button>
          </div>
          {dictationStatus !== "none" && (
            <div
              className={cn(
                styles.celebrate,
                `mt-4 rounded-xl border p-3 text-xs font-bold ${dictationStatus === "correct" ? "border-[#d1c25f] bg-[#fff9d6] text-[#534600]" : "border-[#e0aaa2] bg-[#fff4f1] text-[#87372e]"}`
              )}
              aria-live="polite"
            >
              {dictationStatus === "correct"
                ? "Nice work. Your transcription matches the phrase."
                : `Review the phrase: “${activity.dictationTarget}”.`}
            </div>
          )}
        </div>

        <div className="mt-7 flex flex-col-reverse gap-3 border-t border-[#ece7dc] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => setShowTranscript((current) => !current)}
            aria-expanded={showTranscript}
            className="min-h-11 rounded-xl px-3 text-sm font-extrabold text-[#6e5e06] hover:bg-[#f3ede2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06]"
          >
            {showTranscript ? "Hide transcript" : "Show transcript"}
          </button>
          <Button
            type="button"
            variant="secondary"
            onClick={next}
            className="normal-case tracking-normal"
          >
            Next track
            <Sparkles className="ml-2 h-4 w-4" />
          </Button>
        </div>
        {showTranscript && (
          <div
            className={cn(
              styles.celebrate,
              "mt-4 rounded-xl border border-[#d9cfad] bg-[#fff9ee] p-4 text-sm leading-6 text-[#5f5a49]"
            )}
          >
            <strong className="text-[#1d1b15]">Transcript:</strong>{" "}
            {activity.transcript}
          </div>
        )}
      </section>
    </ActivityShell>
  );
}
