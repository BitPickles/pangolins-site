"use client";

import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { LanguageToggle } from "@/components/language-toggle";
import { type SiteLanguage } from "@/lib/content/site-copy";

type SiteHeaderProps = {
  language: SiteLanguage;
  onLanguageChange: (language: SiteLanguage) => void;
};

export function SiteHeader({ language, onLanguageChange }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-[rgba(255,255,255,0.72)] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2.5 text-sm font-medium text-[#0b0f17]">
          <BrandMark className="w-7" />
          <span className="sr-only">Pangolins</span>
          <span aria-hidden="true">Pangolins</span>
        </Link>
        <LanguageToggle value={language} onChange={onLanguageChange} />
      </div>
    </header>
  );
}
