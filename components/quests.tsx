import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QUESTS } from "@/constants";

type QuestsProps = { points: number };

export const Quests = ({ points }: QuestsProps) => {
  return (
    <div className="space-y-4 rounded-xl border border-[#e8e2d7] border-t-2 border-t-[#77583a] bg-white p-4 shadow-sm">
      <div className="flex w-full items-center justify-between space-y-2">
        <h3 className="text-lg font-bold font-heading text-[#1d1b15]">Quests</h3>

        <Link href="/quests" prefetch>
          <Button size="sm" variant="primaryOutline">
            View all
          </Button>
        </Link>
      </div>


      <ul className="w-full space-y-4">
        {QUESTS.map((quest) => {
          const progress = (points / quest.value) * 100;

          return (
            <div
              className="flex w-full items-center gap-x-3 pb-4"
              key={quest.title}
            >
              <Image src="/points.svg" alt="Points" width={40} height={40} />

              <div className="flex w-full flex-col gap-y-2">
                <p className="text-sm font-bold text-neutral-700">
                  {quest.title}
                </p>

                <Progress value={progress} className="h-2" />
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
