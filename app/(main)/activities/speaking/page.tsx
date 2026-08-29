"use client";

import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  Mic2,
  Pause,
  RotateCcw,
  Sparkles,
  Square,
  Volume2,
} from "lucide-react";

import { ActivityShell } from "@/components/activities/activity-shell";
import styles from "@/components/activities/activity-motion.module.css";
import { Button } from "@/components/ui/button";
import { mockSpeakingPrompts } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type EvaluationResult = {
  transcript: string;
  pronunciationScore: number;
  fluencyScore: number;
  accuracyScore: number;
  feedback: string;
  phonemeBreakdown: { phoneme: string; score: number }[];
};

export default function SpeakingActivityPage() {
  const [promptIndex, setPromptIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] =
    useState<EvaluationResult | null>(null);
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const [isSamplePlaying, setIsSamplePlaying] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const evaluationRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prompt = mockSpeakingPrompts[promptIndex];

  const stopStream = () => {
    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    mediaStreamRef.current = null;
  };

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(
        () => setRecordingTime((current) => current + 1),
        1000
      );
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  useEffect(() => {
    return () => {
      stopStream();
      if (evaluationRef.current) clearTimeout(evaluationRef.current);
      window.speechSynthesis?.cancel();
    };
  }, []);

  const startRecording = async () => {
    setRecordingError(null);
    setEvaluationResult(null);
    setRecordingTime(0);

    if (
      !navigator.mediaDevices?.getUserMedia ||
      typeof MediaRecorder === "undefined"
    ) {
      setRecordingError("Voice recording is not supported in this browser.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch {
      setRecordingError(
        "Microphone access was blocked. Allow it in your browser settings and try again."
      );
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current = null;
    stopStream();
    setIsRecording(false);
    setIsEvaluating(true);

    evaluationRef.current = setTimeout(() => {
      setIsEvaluating(false);
      setEvaluationResult({
        transcript: prompt.targetSentence,
        pronunciationScore: 94,
        fluencyScore: 92,
        accuracyScore: 96,
        feedback:
          "Clear articulation and steady pacing. Keep the final consonants light and connect words without rushing.",
        phonemeBreakdown: prompt.keyPhonemes.map((phoneme, index) => ({
          phoneme,
          score: 91 + index * 3,
        })),
      });
    }, 1300);
  };

  const toggleSample = () => {
    if (isSamplePlaying) {
      window.speechSynthesis.cancel();
      setIsSamplePlaying(false);
      return;
    }

    if (!("speechSynthesis" in window)) {
      setRecordingError(
        "English model audio is not supported in this browser."
      );
      return;
    }

    const utterance = new SpeechSynthesisUtterance(prompt.targetSentence);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    utterance.onend = () => setIsSamplePlaying(false);
    utterance.onerror = () => {
      setIsSamplePlaying(false);
      setRecordingError("The English model voice could not be started.");
    };
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSamplePlaying(true);
  };

  const nextPrompt = () => {
    window.speechSynthesis?.cancel();
    setPromptIndex((current) => (current + 1) % mockSpeakingPrompts.length);
    setEvaluationResult(null);
    setRecordingError(null);
    setIsSamplePlaying(false);
    setRecordingTime(0);
  };

  return (
    <ActivityShell
      label="Speaking"
      icon={Mic2}
      title="Speak it with your own rhythm"
      description="Listen to the model sentence, record a short attempt, and review focused pronunciation feedback."
      step={promptIndex + 1}
      totalSteps={mockSpeakingPrompts.length}
      stepLabel={`${prompt.difficulty} read-aloud`}
      tip="Listen for the sentence melody first. Accuracy matters, but a steady pace usually sounds more natural than isolated words."
      evaluation="The browser records a temporary clip. A production attempt would send it for transcription and pronunciation scoring, then discard the raw audio."
    >
      <section className="overflow-hidden rounded-2xl border border-[#e3ded2] bg-white shadow-[0_14px_36px_rgba(76,67,40,0.06)]">
        <div className="border-b border-[#e5dbb8] bg-[#fff9ee] p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold text-[#6e5e06]">
                Read this sentence aloud
              </p>
              <h2 className="mt-3 font-heading text-2xl font-extrabold leading-9 tracking-[-0.03em] text-[#1d1b15] sm:text-3xl">
                &ldquo;{prompt.targetSentence}&rdquo;
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#5f5a49]">
                {prompt.translation}
              </p>
            </div>
            <button
              type="button"
              onClick={toggleSample}
              aria-label={
                isSamplePlaying
                  ? "Pause sample pronunciation"
                  : "Play sample pronunciation"
              }
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#d2c46c] bg-white text-[#6e5e06] shadow-[0_4px_0_#ddd2a0] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] active:translate-y-0.5 active:shadow-none motion-reduce:transform-none"
            >
              {isSamplePlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className="mt-5 rounded-xl border border-[#e4d8ad] bg-white p-4">
            <p className="font-mono text-xs leading-6 text-[#6e5e06]">
              {prompt.ipaGuide}
            </p>
          </div>
        </div>

        <div className="p-5 sm:p-7">
          {!isEvaluating && !evaluationResult && (
            <div className="flex flex-col items-center py-5 text-center">
              <div
                className="mb-5 flex h-16 items-center justify-center gap-1.5"
                aria-hidden="true"
              >
                {[20, 42, 30, 54, 38, 58, 28, 46, 22].map((height, index) => (
                  <span
                    key={index}
                    className={cn(
                      styles.recordingBar,
                      "w-2 rounded-full bg-[#6e5e06]",
                      !isRecording && "opacity-25"
                    )}
                    style={{ height }}
                  />
                ))}
              </div>

              {isRecording ? (
                <>
                  <p className="font-heading text-lg font-extrabold text-[#1d1b15]">
                    Listening to you
                  </p>
                  <p className="mt-1 text-sm text-[#6d6858]">
                    {recordingTime}s recorded. Your clip stays temporary.
                  </p>
                  <button
                    type="button"
                    onClick={stopRecording}
                    className="mt-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#7f2d25] bg-[#b4473b] text-white shadow-[0_7px_0_#7f2d25] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b4473b] focus-visible:ring-offset-2 active:translate-y-1 active:shadow-none motion-reduce:transform-none"
                    aria-label="Stop recording"
                  >
                    <Square className="h-7 w-7 fill-current" />
                  </button>
                  <p className="mt-3 text-xs font-bold text-[#87372e]">
                    Tap to finish
                  </p>
                </>
              ) : (
                <>
                  <p className="font-heading text-lg font-extrabold text-[#1d1b15]">
                    Ready to speak?
                  </p>
                  <p className="mt-1 max-w-md text-sm leading-6 text-[#6d6858]">
                    Press the microphone, read the sentence once, then stop when
                    you are done.
                  </p>
                  <button
                    type="button"
                    onClick={startRecording}
                    className="mt-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#443a01] bg-[#6e5e06] text-white shadow-[0_7px_0_#443a01] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] focus-visible:ring-offset-2 active:translate-y-1 active:shadow-none motion-reduce:transform-none"
                    aria-label="Start recording"
                  >
                    <Mic2 className="h-8 w-8" />
                  </button>
                </>
              )}

              {recordingError && (
                <p
                  className="mt-5 rounded-xl border border-[#e0aaa2] bg-[#fff4f1] p-3 text-xs font-bold text-[#87372e]"
                  role="alert"
                >
                  {recordingError}
                </p>
              )}
            </div>
          )}

          {isEvaluating && (
            <div className="py-12 text-center" aria-live="polite">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#d6c95f] border-t-[#6e5e06] motion-reduce:animate-none" />
              <p className="mt-5 font-heading text-base font-extrabold text-[#1d1b15]">
                Reviewing your pronunciation
              </p>
              <p className="mt-1 text-sm text-[#6d6858]">
                Checking clarity, pace, and word accuracy.
              </p>
            </div>
          )}

          {evaluationResult && (
            <div className={styles.celebrate} aria-live="polite">
              <div className="flex items-start gap-3 rounded-2xl border border-[#d1c25f] bg-[#fff9d6] p-4 text-[#534600]">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <h3 className="font-heading text-base font-extrabold">
                    Strong, clear attempt
                  </h3>
                  <p className="mt-1 text-sm leading-6">
                    {evaluationResult.feedback}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  ["Pronunciation", evaluationResult.pronunciationScore],
                  ["Fluency", evaluationResult.fluencyScore],
                  ["Accuracy", evaluationResult.accuracyScore],
                ].map(([label, score]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-[#e3ded2] bg-white p-4"
                  >
                    <p className="font-heading text-2xl font-extrabold text-[#6e5e06]">
                      {score}%
                    </p>
                    <p className="mt-1 text-xs font-bold text-[#6d6858]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-[#e3ded2] bg-[#fbf8f2] p-4">
                <p className="text-xs font-extrabold text-[#6e5e06]">
                  Sound focus
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {evaluationResult.phonemeBreakdown.map((item) => (
                    <span
                      key={item.phoneme}
                      className="rounded-lg border border-[#dcd6ca] bg-white px-3 py-2 font-mono text-xs font-bold text-[#1d1b15]"
                    >
                      {item.phoneme}{" "}
                      <span className="font-sans text-[#6e5e06]">
                        {item.score}%
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 border-t border-[#ece7dc] pt-5 sm:flex-row sm:justify-between">
                <Button
                  type="button"
                  variant="primaryOutline"
                  onClick={startRecording}
                  className="normal-case tracking-normal"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Try again
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={nextPrompt}
                  className="normal-case tracking-normal"
                >
                  Next prompt
                  <Sparkles className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </ActivityShell>
  );
}
