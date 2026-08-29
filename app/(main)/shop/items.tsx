"use client";

import { useTransition } from "react";

import Image from "next/image";
import { toast } from "sonner";

import { refillHearts } from "@/actions/user-progress";
import { createStripeUrl } from "@/actions/user-subscription";
import { Button } from "@/components/ui/button";
import { MAX_HEARTS, POINTS_TO_REFILL } from "@/constants";

type ItemsProps = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

export const Items = ({
  hearts,
  points,
  hasActiveSubscription,
}: ItemsProps) => {
  const [pending, startTransition] = useTransition();

  const onRefillHearts = () => {
    if (pending || hearts === MAX_HEARTS || points < POINTS_TO_REFILL) return;

    startTransition(() => {
      refillHearts().catch(() => toast.error("Something went wrong."));
    });
  };

  const onUpgrade = () => {
    toast.loading("Redirecting to checkout...");
    startTransition(() => {
      createStripeUrl()
        .then((response) => {
          if (response.data) window.location.href = response.data;
        })
        .catch(() => toast.error("Something went wrong."));
    });
  };

  return (
    <ul className="w-full space-y-4">
      <div className="flex w-full items-center gap-x-4 rounded-xl border border-[#e8e2d7] bg-white p-4 shadow-sm">
        <Image src="/heart.svg" alt="Heart" height={50} width={50} />

        <div className="flex-1">
          <p className="text-base font-bold text-[#1d1b15] lg:text-lg font-heading">
            Refill Hearts
          </p>
          <p className="text-xs text-[#4b4738]">Replenish full energy to continue practicing.</p>
        </div>

        <Button
          onClick={onRefillHearts}
          variant="primary"
          disabled={
            pending || hearts === MAX_HEARTS || points < POINTS_TO_REFILL
          }
          aria-disabled={
            pending || hearts === MAX_HEARTS || points < POINTS_TO_REFILL
          }
        >
          {hearts === MAX_HEARTS ? (
            "Full"
          ) : (
            <div className="flex items-center gap-x-1.5">
              <Image src="/points.svg" alt="Points" height={20} width={20} />
              <span>{POINTS_TO_REFILL}</span>
            </div>
          )}
        </Button>
      </div>

      <div className="flex w-full items-center gap-x-4 rounded-xl border border-[#e8e2d7] border-t-2 border-t-[#6e5e06] bg-white p-4 shadow-sm">
        <Image src="/unlimited.svg" alt="Unlimited" height={50} width={50} />

        <div className="flex-1">
          <p className="text-base font-bold text-[#1d1b15] lg:text-lg font-heading">
            Unlimited Hearts (Pro)
          </p>
          <p className="text-xs text-[#4b4738]">Never run out of hearts while studying.</p>
        </div>

        <Button
          variant="secondary"
          onClick={onUpgrade}
          disabled={pending}
          aria-disabled={pending}
        >
          {hasActiveSubscription ? "Active" : "Upgrade"}
        </Button>
      </div>
    </ul>

  );
};
