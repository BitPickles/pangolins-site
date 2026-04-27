"use client";

import { useEffect } from "react";
import { type SiteLanguage } from "@/lib/content/site-copy";

const languageMeta: Record<SiteLanguage, { htmlLang: string; title: string; description: string }> = {
  zh: {
    htmlLang: "zh-CN",
    title: "Pangolins | 风险优先 Curator",
    description: "Pangolins 专注于低风险、高流动性的链上 Curator 风险管理。"
  },
  en: {
    htmlLang: "en",
    title: "Pangolins | Risk-first Curator",
    description: "Pangolins focuses on low-risk, high-liquidity onchain curator risk management."
  }
};

type LanguageStateProps = {
  language: SiteLanguage;
};

export function LanguageState({ language }: LanguageStateProps) {
  useEffect(() => {
    const meta = languageMeta[language];
    document.documentElement.lang = meta.htmlLang;
    document.title = meta.title;
    window.localStorage.setItem("pangolins-language", language);
    document.cookie = `pangolins-language=${language}; path=/; max-age=31536000; SameSite=Lax`;

    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) {
      description.content = meta.description;
    }
  }, [language]);

  return null;
}

export function readStoredLanguage(): SiteLanguage {
  if (typeof window === "undefined") {
    return "zh";
  }

  return window.localStorage.getItem("pangolins-language") === "en" ? "en" : "zh";
}
