"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { siteCopy, type SiteLanguage } from "@/lib/content/site-copy";

export default function HomePage() {
  const [language, setLanguage] = useState<SiteLanguage>("zh");

  return (
    <>
      <SiteHeader language={language} onLanguageChange={setLanguage} />
      <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl items-center px-6 py-20">
        <section className="max-w-4xl space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-sky-100/54">
            Morpho Curator / Conservative Risk
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-white md:text-7xl">
            {siteCopy.hero.title.zh}
          </h1>
          <p className="text-lg text-sky-50/82">{siteCopy.hero.title.en}</p>
          <p className="max-w-2xl text-base leading-8 text-white/62">
            {siteCopy.hero.subtitle[language]}
          </p>
        </section>
      </main>
    </>
  );
}
