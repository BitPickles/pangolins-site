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
    <header className="sticky top-3 z-40 px-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-[#e2e8f0] bg-white/78 px-4 py-2.5 shadow-[0_18px_60px_rgba(15,23,42,0.07)] backdrop-blur-2xl">
        <Link href="/" className="flex items-center gap-2.5 text-sm font-semibold text-[#07111f]">
          <BrandMark className="w-8" />
          <span className="sr-only">Pangolins</span>
          <BrandWordmark />
        </Link>
        <LanguageToggle value={language} onChange={onLanguageChange} />
      </div>
    </header>
  );
}
