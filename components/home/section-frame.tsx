"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import {
  getSupportLanguage,
  type SiteLanguage
} from "@/lib/content/site-copy";

type SectionFrameProps = {
  id?: string;
  index: string;
  label: string;
  language: SiteLanguage;
  title: Record<SiteLanguage, string>;
  children: ReactNode;
};

export function SectionFrame({
  id,
  index,
  label,
  language,
  title,
  children
}: SectionFrameProps) {
  const reduceMotion = useReducedMotion();
  const supportLanguage = getSupportLanguage(language);

  return (
    <motion.section
      id={id}
      className="grid gap-8 border-t border-[color:var(--line)] py-14 md:grid-cols-[160px_minmax(0,1fr)] md:py-18"
      initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="space-y-3">
        <p className="font-mono text-xs tracking-[0.28em] text-white/32">{index}</p>
        <p className="dossier-label">{label}</p>
      </div>
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="font-display text-3xl leading-tight text-balance text-white md:text-4xl">
            {title[language]}
          </h2>
          <p className="max-w-3xl text-sm uppercase tracking-[0.18em] text-white/45">
            {title[supportLanguage]}
          </p>
        </div>
        {children}
      </div>
    </motion.section>
  );
}
