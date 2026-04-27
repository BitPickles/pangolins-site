"use client";

import { useEffect, useState } from "react";
import { AppleCta } from "@/components/home/apple-cta";
import { AppleHero } from "@/components/home/apple-hero";
import { AppleManifesto } from "@/components/home/apple-manifesto";
import { AppleScenes } from "@/components/home/apple-scenes";
import { LanguageState, readStoredLanguage } from "@/components/language-state";
import { SiteHeader } from "@/components/site-header";
import { type SiteLanguage } from "@/lib/content/site-copy";

export default function HomePage() {
  const [language, setLanguage] = useState<SiteLanguage>("zh");

  useEffect(() => {
    setLanguage(readStoredLanguage());
  }, []);

  return (
    <>
      <LanguageState language={language} />
      <SiteHeader language={language} onLanguageChange={setLanguage} />
      <main className="site-shell">
        <AppleHero language={language} />
        <AppleScenes language={language} />
        <AppleManifesto language={language} />
        <AppleCta language={language} />
      </main>
    </>
  );
}
