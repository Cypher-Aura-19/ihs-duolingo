import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const Promo = () => {
  return (
    <div className="space-y-4 rounded-xl border border-[#e8e2d7] border-t-2 border-t-[#6e5e06] bg-white p-4 shadow-sm">
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <Image src="/unlimited.svg" alt="Pro" height={26} width={26} />

          <h3 className="text-lg font-bold font-heading text-[#1d1b15]">Upgrade to Pro</h3>
        </div>

        <p className="text-sm text-[#4b4738]">Get unlimited hearts and academic mastery!</p>
      </div>

      <Button variant="secondary" className="w-full" size="lg" asChild>
        <Link href="/shop" prefetch>
          Upgrade today
        </Link>
      </Button>
    </div>
  );
};

