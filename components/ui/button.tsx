import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide",
  {
    variants: {
      variant: {
        default:
          "bg-white text-[#1d1b15] border-[#e8e2d7] border-2 border-b-4 active:border-b-2 hover:bg-[#f9f3e8] text-[#4b4738]",

        // custom
        locked:
          "bg-[#e8e2d7] text-[#7c7766] hover:bg-[#e8e2d7]/90 border-[#cdc6b3] border-b-4 active:border-b-0",

        primary:
          "bg-[#77583a] text-white hover:bg-[#684c31] border-[#533c26] border-b-4 active:border-b-0",
        primaryOutline: "bg-[#fff9ee] text-[#77583a] border-2 border-[#77583a] hover:bg-[#f3ede2]",

        secondary:
          "bg-[#6e5e06] text-white hover:bg-[#5c4e04] border-[#443a01] border-b-4 active:border-b-0",
        secondaryOutline: "bg-[#fff9ee] text-[#6e5e06] border-2 border-[#6e5e06] hover:bg-[#f3ede2]",

        danger:
          "bg-[#ba1a1a] text-white hover:bg-[#a01515] border-[#7a0f0f] border-b-4 active:border-b-0",
        dangerOutline: "bg-[#fff9ee] text-[#ba1a1a] border-2 border-[#ba1a1a] hover:bg-[#ffdad6]/30",

        super:
          "bg-[#565e74] text-white hover:bg-[#484f63] border-[#383d4e] border-b-4 active:border-b-0",
        superOutline: "bg-[#fff9ee] text-[#565e74] border-2 border-[#565e74] hover:bg-[#d1d9f3]/30",

        ghost:
          "bg-transparent text-[#4b4738] border-transparent border-0 hover:bg-[#f3ede2]",

        sidebar:
          "bg-transparent text-[#4b4738] border-2 border-transparent hover:bg-[#f3ede2] transition-none",
        sidebarOutline:
          "bg-[#f3ede2] text-[#6e5e06] border-[#cdc6b3] border-2 hover:bg-[#eee7dd] transition-none font-bold",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8",
        icon: "h-10 w-10",

        // custom
        rounded: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);


export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
