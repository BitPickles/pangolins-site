"use client";

import { type SiteLanguage } from "@/lib/content/site-copy";

type LanguageToggleProps = {
  value: SiteLanguage;
  onChange: (language: SiteLanguage) => void;
};

export function LanguageToggle({ value, onChange }: LanguageToggleProps) {
  return (
    <div
      className="inline-flex shrink-0 rounded-full bg-[#f1f5f9] p-1 text-xs text-[#6b7280] sm:text-sm"
      aria-label={value === "zh" ? "语言切换" : "Language switcher"}
    >
      {(["zh", "en"] as const).map((language) => {
        const selected = value === language;

        return (
          <button
            key={language}
            type="button"
            onClick={() => onChange(language)}
            className={`rounded-full px-3 py-1.5 transition sm:px-3.5 ${
              selected ? "bg-white text-[#07111f] shadow-[0_6px_18px_rgba(15,23,42,0.08)]" : "hover:text-[#07111f]"
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
