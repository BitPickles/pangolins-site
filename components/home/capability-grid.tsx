"use client";

import { motion, useReducedMotion } from "framer-motion";
import { siteCopy, type SiteLanguage } from "@/lib/content/site-copy";
import { SectionFrame } from "@/components/home/section-frame";

type CapabilityGridProps = {
  language: SiteLanguage;
};

export function CapabilityGrid({ language }: CapabilityGridProps) {
  const reduceMotion = useReducedMotion();

  return (
    <SectionFrame
      id="core-capabilities"
      index="05"
      label={siteCopy.capabilities.label}
      language={language}
      title={siteCopy.capabilities.title}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {siteCopy.capabilities.items.map((item, index) => (
          <motion.article
            key={item.kicker}
            className="group rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 transition hover:border-[color:var(--line-strong)] hover:bg-white/[0.05]"
            initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: reduceMotion ? 0 : index * 0.08 }}
          >
            <p className="font-mono text-xs tracking-[0.28em] text-white/38">
              {item.kicker}
            </p>
            <h3 className="mt-5 font-display text-2xl text-white">
              {item.title[language]}
            </h3>
            <p className="mt-4 text-base leading-7 text-white/66">
              {item.body[language]}
            </p>
          </motion.article>
        ))}
      </div>
    </SectionFrame>
  );
}
