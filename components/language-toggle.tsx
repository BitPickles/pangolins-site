"use client";

import { type SiteLanguage } from "@/lib/content/site-copy";

type LanguageToggleProps = {
  value: SiteLanguage;
  onChange: (language: SiteLanguage) => void;
};

export function LanguageToggle({ value, onChange }: LanguageToggleProps) {
  return (
    <div className="inline-flex rounded-full border border-[color:var(--line)] bg-white/80 p-1 text-sm text-[#41506a] shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
      {(["zh", "en"] as const).map((language) => {
        const selected = value === language;

        return (
          <button
            key={language}
            type="button"
            onClick={() => onChange(language)}
            className={`rounded-full px-3 py-1.5 transition ${
              selected ? "bg-[#101828] text-white" : "hover:bg-[#eef3fb]"
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
