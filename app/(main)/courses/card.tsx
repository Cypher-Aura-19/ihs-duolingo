import { Check } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type CardProps = {
  title: string;
  id: number;
  imageSrc: string;
  onClick: (id: number) => void;
  disabled?: boolean;
  isActive?: boolean;
};

export const Card = ({
  title,
  id,
  imageSrc,
  onClick,
  disabled,
  isActive,
}: CardProps) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        "flex h-full min-h-[217px] min-w-[200px] cursor-pointer flex-col items-center justify-between rounded-xl border-2 border-b-[4px] border-[#e8e2d7] bg-white p-3 pb-6 shadow-sm transition hover:bg-[#f9f3e8] active:border-b-2",
        isActive && "border-[#dcc669] border-t-2 border-t-[#6e5e06] bg-[#fff9ee]",
        disabled && "pointer-events-none opacity-50"
      )}
    >
      <div className="flex min-h-[24px] w-full items-center justify-end">
        {isActive && (
          <div className="flex items-center justify-center rounded-md bg-[#6e5e06] p-1.5 shadow-sm">
            <Check className="h-4 w-4 stroke-[4] text-white" />
          </div>
        )}
      </div>

      <Image
        src={imageSrc}
        alt={title}
        height={70}
        width={93.33}
        className="rounded-lg border border-[#e8e2d7] object-cover drop-shadow-sm"
      />

      <p className="mt-3 text-center font-bold font-heading text-[#1d1b15]">{title}</p>
    </div>

  );
};
