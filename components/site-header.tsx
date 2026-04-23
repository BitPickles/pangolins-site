"use client";

import Link from "next/link";
import { siteCopy, type SiteLanguage } from "@/lib/content/site-copy";
import { LanguageToggle } from "@/components/language-toggle";

type SiteHeaderProps = {
  language: SiteLanguage;
  onLanguageChange: (language: SiteLanguage) => void;
};

export function SiteHeader({
  language,
  onLanguageChange
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-[color:var(--line)] bg-[rgba(248,250,252,0.82)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm uppercase tracking-[0.32em] text-[#101828]">
          Pangolins
        </Link>
        <div className="flex items-center gap-5">
          <nav className="hidden gap-4 text-sm text-[#475467] md:flex">
            <Link href="/">{siteCopy.nav.home[language]}</Link>
            <Link href="/monitoring">{siteCopy.nav.monitoring[language]}</Link>
          </nav>
          <LanguageToggle value={language} onChange={onLanguageChange} />
        </div>
      </div>
    </header>
  );
}
