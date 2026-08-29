"use client";

import { AlertCircle, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ActivitiesError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <div className="mx-auto max-w-[720px] px-4 py-16 sm:px-6">
      <div className="rounded-2xl border border-[#e3ded2] bg-white p-8 text-center shadow-[0_12px_32px_rgba(76,67,40,0.06)]">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f5edbd] text-[#594c05]">
          <AlertCircle className="h-6 w-6" />
        </span>
        <h1 className="mt-5 font-heading text-2xl font-extrabold text-[#1d1b15]">
          This activity did not load
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#686354]">
          Your progress is safe. Try opening the practice activity again.
        </p>
        <Button
          variant="secondary"
          onClick={retry}
          className="mt-6 normal-case tracking-normal"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Try again
        </Button>
      </div>
    </div>
  );
}
