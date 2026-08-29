import { useCallback } from "react";

import Image from "next/image";
import { useAudio, useKey } from "react-use";

import { challenges } from "@/db/schema";
import { cn } from "@/lib/utils";

type CardProps = {
  id: number;
  text: string;
  imageSrc: string | null;
  audioSrc: string | null;
  shortcut: string;
  selected?: boolean;
  onClick: () => void;
  status?: "correct" | "wrong" | "none";
  disabled?: boolean;
  type: (typeof challenges.$inferSelect)["type"];
};

export const Card = ({
  text,
  imageSrc,
  audioSrc,
  shortcut,
  selected,
  onClick,
  status,
  disabled,
  type,
}: CardProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [audio, _, controls] = useAudio({ src: audioSrc || "" });

  const handleClick = useCallback(() => {
    if (disabled) return;

    void controls.play();
    onClick();
  }, [disabled, onClick, controls]);

  useKey(shortcut, handleClick, {}, [handleClick]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "h-full cursor-pointer rounded-xl border-2 border-b-4 border-[#e8e2d7] bg-white p-4 hover:bg-[#f9f3e8] active:border-b-2 lg:p-6 shadow-sm",
        selected && "border-[#dcc669] bg-[#fff9ee] hover:bg-[#fff9ee]",
        selected &&
          status === "correct" &&
          "border-[#6e5e06] bg-[#f0d97a]/30 hover:bg-[#f0d97a]/30",
        selected &&
          status === "wrong" &&
          "border-[#ba1a1a] bg-[#ffdad6]/40 hover:bg-[#ffdad6]/40",
        disabled && "pointer-events-none hover:bg-white",
        type === "ASSIST" && "w-full lg:p-3"
      )}
    >
      {audio}
      {imageSrc && (
        <div className="relative mb-4 aspect-square max-h-[80px] w-full lg:max-h-[150px]">
          <Image src={imageSrc} fill alt={text} />
        </div>
      )}

      <div
        className={cn(
          "flex items-center justify-between",
          type === "ASSIST" && "flex-row-reverse"
        )}
      >
        {type === "ASSIST" && <div aria-hidden />}
        <p
          className={cn(
            "text-sm font-medium text-[#1d1b15] lg:text-base",
            selected && "text-[#6e5e06] font-bold",
            selected && status === "correct" && "text-[#6e5e06] font-bold",
            selected && status === "wrong" && "text-[#ba1a1a] font-bold"
          )}
        >
          {text}
        </p>

        <div
          className={cn(
            "flex h-[20px] w-[20px] items-center justify-center rounded-lg border-2 border-[#cdc6b3] text-xs font-semibold text-[#7c7766] lg:h-[30px] lg:w-[30px] lg:text-[15px]",
            selected && "border-[#6e5e06] text-[#6e5e06] bg-[#f0d97a]/20",
            selected &&
              status === "correct" &&
              "border-[#6e5e06] text-[#6e5e06] bg-[#f0d97a]/40",
            selected && status === "wrong" && "border-[#ba1a1a] text-[#ba1a1a] bg-[#ffdad6]/50"
          )}
        >
          {shortcut}
        </div>
      </div>
    </div>

  );
};
