"use client";

import { type SiteLanguage } from "@/lib/content/site-copy";

type LanguageToggleProps = {
  value: SiteLanguage;
  onChange: (language: SiteLanguage) => void;
};

export function LanguageToggle({ value, onChange }: LanguageToggleProps) {
  return (
    <div className="inline-flex rounded-full bg-[#f5f6f8] p-1 text-sm text-[#6b7280]">
      {(["zh", "en"] as const).map((language) => {
        const selected = value === language;

        return (
          <button
            key={language}
            type="button"
            onClick={() => onChange(language)}
            className={`rounded-full px-3.5 py-1.5 transition ${
              selected ? "bg-white text-[#0b0f17] shadow-[0_1px_4px_rgba(15,23,42,0.08)]" : "hover:text-[#0b0f17]"
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
