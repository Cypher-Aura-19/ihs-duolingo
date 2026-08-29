import Image from "next/image";

import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <div className="hidden h-20 w-full border-t-2 border-slate-200 p-2 lg:block">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-center">
        <Button size="lg" variant="ghost" className="cursor-default px-8">
          <Image
            src="/en.svg"
            alt="English"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          English learning experience
        </Button>
      </div>
    </div>
  );
};
