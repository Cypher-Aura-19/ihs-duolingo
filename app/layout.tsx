import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";

import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const viewport: Viewport = {
  themeColor: "#6e5e06",
};

export const metadata: Metadata = siteConfig;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${manrope.variable} font-sans bg-[#fff9ee] text-[#1d1b15] antialiased`}
        suppressHydrationWarning
      >
        <Toaster theme="light" richColors closeButton />
        <ExitModal />
        <HeartsModal />
        <PracticeModal />
        {children}
      </body>
    </html>
  );
}


