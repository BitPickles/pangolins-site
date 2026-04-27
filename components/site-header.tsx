"use client";

import Link from "next/link";
import { BrandMark, BrandWordmark } from "@/components/brand-mark";
import { LanguageToggle } from "@/components/language-toggle";
import { type SiteLanguage } from "@/lib/content/site-copy";

type SiteHeaderProps = {
  language: SiteLanguage;
  onLanguageChange: (language: SiteLanguage) => void;
};

export function SiteHeader({ language, onLanguageChange }: SiteHeaderProps) {
  return (
    <header className="sticky top-3 z-40 px-2 sm:px-4">
      <div className="mx-auto flex max-w-6xl min-w-0 items-center justify-between gap-3 rounded-full border border-[#e2e8f0] bg-white/78 px-3 py-2.5 shadow-[0_18px_60px_rgba(15,23,42,0.07)] backdrop-blur-2xl sm:px-4">
        <Link href="/" className="flex min-w-0 items-center gap-2 text-sm font-semibold text-[#07111f] sm:gap-2.5">
          <BrandMark className="w-7 shrink-0 sm:w-8" />
          <span className="sr-only">Pangolins</span>
          <BrandWordmark className="max-w-[7.25rem] shrink text-[0.98rem] sm:text-[1.08rem]" />
        </Link>
        <LanguageToggle value={language} onChange={onLanguageChange} />
      </div>
    </header>
  );
}
