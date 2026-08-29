"use client";

import { useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Layers3,
  RotateCcw,
  Sparkles,
  Volume2,
} from "lucide-react";

import { ActivityShell } from "@/components/activities/activity-shell";
import styles from "@/components/activities/activity-motion.module.css";
import { Button } from "@/components/ui/button";
import { mockFlashcards, mockVocabularyPairs } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function VocabularyActivityPage() {
  const [mode, setMode] = useState<"flashcards" | "matching">("flashcards");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedMeaning, setSelectedMeaning] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [matchMessage, setMatchMessage] = useState<string | null>(null);

  const card = mockFlashcards[currentCardIndex];
  const meanings = [...mockVocabularyPairs].reverse();

  const showCard = (index: number) => {
    setIsFlipped(false);
    setCurrentCardIndex(index);
  };

  const checkMatch = (termId: string, meaningId: string) => {
    if (termId === meaningId) {
      setMatchedPairs((current) =>
        current.includes(termId) ? current : [...current, termId]
      );
      setMatchMessage("That pair belongs together.");
    } else {
      setMatchMessage("Not quite. Try a different meaning.");
    }
    setSelectedTerm(null);
    setSelectedMeaning(null);
  };

  const selectTerm = (id: string) => {
    if (matchedPairs.includes(id)) return;
    setMatchMessage(null);
    if (selectedMeaning) {
      checkMatch(id, selectedMeaning);
      return;
    }
    setSelectedTerm(id);
  };

  const selectMeaning = (id: string) => {
    if (matchedPairs.includes(id)) return;
    setMatchMessage(null);
    if (selectedTerm) {
      checkMatch(selectedTerm, id);
      return;
    }
    setSelectedMeaning(id);
  };

  const resetMatching = () => {
    setMatchedPairs([]);
    setSelectedTerm(null);
    setSelectedMeaning(null);
    setMatchMessage(null);
  };

  return (
    <ActivityShell
      label="Vocabulary"
      icon={Layers3}
      title="Build words you can actually recall"
      description="Study each word from both sides, then switch to matching for a quick memory check."
      step={
        mode === "flashcards"
          ? currentCardIndex + 1
          : Math.max(1, matchedPairs.length)
      }
      totalSteps={
        mode === "flashcards"
          ? mockFlashcards.length
          : mockVocabularyPairs.length
      }
      stepLabel={mode === "flashcards" ? "Flashcard deck" : "Matching round"}
      tip="Say the English word before flipping. Active recall makes the meaning easier to retrieve later."
      evaluation="Flashcards are self-paced. Matching pairs are checked instantly with deterministic activity logic."
    >
      <section className="rounded-2xl border border-[#e3ded2] bg-white p-4 shadow-[0_14px_36px_rgba(76,67,40,0.06)] sm:p-6">
        <div className="mb-6 flex flex-col gap-4 border-b border-[#ece7dc] pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-heading text-lg font-extrabold text-[#1d1b15]">
              {mode === "flashcards" ? "Focused flashcards" : "Match the pairs"}
            </h2>
            <p className="mt-1 text-sm text-[#6d6858]">
              {mode === "flashcards"
                ? "Tap a card to turn it over."
                : "Choose one English word and its matching meaning."}
            </p>
          </div>
          <div
            className="grid grid-cols-2 rounded-xl border border-[#dcd6ca] bg-[#f6f1e8] p-1"
            role="tablist"
            aria-label="Vocabulary activity mode"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === "flashcards"}
              onClick={() => setMode("flashcards")}
              className={`min-h-10 rounded-lg px-3 text-xs font-extrabold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] ${
                mode === "flashcards"
                  ? "bg-white text-[#6e5e06] shadow-sm"
                  : "text-[#6d6858] hover:text-[#1d1b15]"
              }`}
            >
              Flashcards
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "matching"}
              onClick={() => setMode("matching")}
              className={`min-h-10 rounded-lg px-3 text-xs font-extrabold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] ${
                mode === "matching"
                  ? "bg-white text-[#6e5e06] shadow-sm"
                  : "text-[#6d6858] hover:text-[#1d1b15]"
              }`}
            >
              Matching
            </button>
          </div>
        </div>

        {mode === "flashcards" ? (
          <div>
            <button
              type="button"
              aria-pressed={isFlipped}
              aria-label={isFlipped ? "Show word side" : "Show definition side"}
              onClick={() => setIsFlipped((current) => !current)}
              className={cn(
                styles.flipScene,
                "block w-full rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] focus-visible:ring-offset-4"
              )}
            >
              <span
                className={cn(styles.flipCard, isFlipped && styles.flipped)}
              >
                <span
                  className={cn(
                    styles.flipFace,
                    "flex flex-col rounded-2xl border-2 border-[#d7ca77] bg-[#fff9ee] p-6 shadow-[0_12px_0_#e0d4a2] sm:p-8"
                  )}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-xs font-extrabold text-[#6e5e06]">
                      {card.partOfSpeech}
                    </span>
                    <span className="text-xs font-bold text-[#7a7566]">
                      Tap to reveal
                    </span>
                  </span>
                  <span className="my-auto block py-10 text-center">
                    <span className="block font-heading text-3xl font-extrabold tracking-[-0.04em] text-[#1d1b15] sm:text-4xl">
                      {card.term}
                    </span>
                    <span className="mt-3 block font-mono text-sm text-[#6e5e06]">
                      {card.phonetic}
                    </span>
                  </span>
                  <span className="flex items-center justify-center gap-2 text-xs font-bold text-[#6d6858]">
                    <Volume2 className="h-4 w-4" aria-hidden="true" />
                    Say it aloud, then flip
                  </span>
                </span>

                <span
                  className={cn(
                    styles.flipFace,
                    styles.flipBack,
                    "flex flex-col rounded-2xl border-2 border-[#6e5e06] bg-[#6e5e06] p-6 text-[#fffdf6] shadow-[0_12px_0_#443a01] sm:p-8"
                  )}
                >
                  <span className="flex items-center justify-between gap-3 text-xs font-extrabold text-[#fae282]">
                    Definition
                    <span className="text-[#fff7d1]">Tap to return</span>
                  </span>
                  <span className="my-auto block py-7">
                    <span className="block font-heading text-xl font-extrabold leading-8 sm:text-2xl">
                      {card.meaning}
                    </span>
                    <span className="mt-5 block rounded-xl border border-[#9b8d39] bg-[#5c4f05] p-4">
                      <span className="block text-sm font-bold leading-6">
                        {card.exampleSentence}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-[#f3e9b2]">
                        {card.exampleTranslation}
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </button>

            <div className="mt-7 flex items-center justify-between gap-3">
              <Button
                type="button"
                variant="primaryOutline"
                onClick={() =>
                  showCard(
                    (currentCardIndex - 1 + mockFlashcards.length) %
                      mockFlashcards.length
                  )
                }
                className="normal-case tracking-normal"
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Previous
              </Button>
              <div
                className="hidden gap-2 sm:flex"
                aria-label="Choose flashcard"
              >
                {mockFlashcards.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Show card ${index + 1}`}
                    onClick={() => showCard(index)}
                    className={`h-2.5 w-8 rounded-sm border ${index === currentCardIndex ? "border-[#6e5e06] bg-[#6e5e06]" : "border-[#d9d3c6] bg-[#f3ede2]"}`}
                  />
                ))}
              </div>
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  showCard((currentCardIndex + 1) % mockFlashcards.length)
                }
                className="normal-case tracking-normal"
              >
                Next card
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4 flex items-center justify-between gap-4">
              <p
                aria-live="polite"
                className={`text-sm font-bold ${matchMessage?.startsWith("Not") ? "text-[#a23b32]" : "text-[#6e5e06]"}`}
              >
                {matchedPairs.length === mockVocabularyPairs.length
                  ? "Every pair is complete."
                  : (matchMessage ??
                    `${matchedPairs.length} of ${mockVocabularyPairs.length} matched`)}
              </p>
              <button
                type="button"
                onClick={resetMatching}
                className="inline-flex min-h-10 items-center gap-2 rounded-xl px-3 text-xs font-extrabold text-[#6e5e06] hover:bg-[#f3ede2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06]"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
            </div>

            {matchedPairs.length === mockVocabularyPairs.length && (
              <div
                className={cn(
                  styles.celebrate,
                  "mb-5 flex items-center gap-3 rounded-2xl border border-[#d1c25f] bg-[#fff9d6] p-4 text-[#534600]"
                )}
              >
                <Sparkles className="h-5 w-5" />
                <div>
                  <p className="font-heading text-sm font-extrabold">
                    Deck mastered
                  </p>
                  <p className="text-xs">
                    You connected all six meanings correctly.
                  </p>
                </div>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2.5">
                <h3 className="mb-3 text-xs font-extrabold text-[#6e5e06]">
                  Word
                </h3>
                {mockVocabularyPairs.map((item) => {
                  const matched = matchedPairs.includes(item.term);
                  const selected = selectedTerm === item.term;
                  return (
                    <button
                      key={item.term}
                      type="button"
                      disabled={matched}
                      onClick={() => selectTerm(item.term)}
                      className={`flex min-h-14 w-full items-center justify-between rounded-xl border-2 px-4 text-left text-sm font-extrabold transition-[transform,border-color,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] active:scale-[0.98] motion-reduce:transform-none ${
                        matched
                          ? "border-[#b8aa55] bg-[#f6efbd] text-[#6e5e06]"
                          : selected
                            ? "border-[#6e5e06] bg-[#fff9d6] text-[#534600]"
                            : "border-[#e3ded2] bg-white text-[#1d1b15] hover:border-[#b8a744]"
                      }`}
                    >
                      {item.term}
                      {matched && <Check className="h-4 w-4" />}
                    </button>
                  );
                })}
              </div>
              <div className="space-y-2.5">
                <h3 className="mb-3 text-xs font-extrabold text-[#6e5e06]">
                  Meaning
                </h3>
                {meanings.map((item) => {
                  const matched = matchedPairs.includes(item.term);
                  const selected = selectedMeaning === item.term;
                  return (
                    <button
                      key={item.meaning}
                      type="button"
                      disabled={matched}
                      onClick={() => selectMeaning(item.term)}
                      className={`flex min-h-14 w-full items-center justify-between rounded-xl border-2 px-4 text-left text-sm font-bold transition-[transform,border-color,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e5e06] active:scale-[0.98] motion-reduce:transform-none ${
                        matched
                          ? "border-[#b8aa55] bg-[#f6efbd] text-[#6e5e06]"
                          : selected
                            ? "border-[#6e5e06] bg-[#fff9d6] text-[#534600]"
                            : "border-[#e3ded2] bg-white text-[#1d1b15] hover:border-[#b8a744]"
                      }`}
                    >
                      {item.meaning}
                      {matched && <Check className="h-4 w-4" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </section>
    </ActivityShell>
  );
}
