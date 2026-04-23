"use client";

import { type SiteLanguage } from "@/lib/content/site-copy";

type LanguageToggleProps = {
  value: SiteLanguage;
  onChange: (language: SiteLanguage) => void;
};

export function LanguageToggle({ value, onChange }: LanguageToggleProps) {
  return (
    <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1 text-sm text-white/72">
      {(["zh", "en"] as const).map((language) => {
        const selected = value === language;

        return (
          <button
            key={language}
            type="button"
            onClick={() => onChange(language)}
            className={`rounded-full px-3 py-1.5 transition ${
              selected ? "bg-white text-slate-950" : "hover:bg-white/10"
            }`}
            aria-pressed={selected}
          >
            {language === "zh" ? "中文" : "EN"}
          </button>
        );
      })}
    </div>
  );
}
