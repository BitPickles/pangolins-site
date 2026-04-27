"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TitleLines } from "@/components/title-lines";
import { siteCopy, type SiteLanguage } from "@/lib/content/site-copy";

type AppleManifestoProps = {
  language: SiteLanguage;
};

type ManifestoPillar = (typeof siteCopy.home.manifesto.pillars)[number];

export function AppleManifesto({ language }: AppleManifestoProps) {
  const reduceMotion = useReducedMotion();
  const manifesto = siteCopy.home.manifesto;
  const leftPillars = manifesto.pillars.slice(0, 3);
  const rightPillars = manifesto.pillars.slice(3);
  const engineCopy: Record<
    SiteLanguage,
    { label: string; title: string; body: string; signals: readonly string[]; boundary: string }
  > = {
    zh: {
      label: "原则栈",
      title: "原则先于收益。",
      body: "筛选、约束、响应，共同构成风险边界。",
      signals: ["筛选", "约束", "响应"],
      boundary: "边界"
    },
    en: {
      label: "Principle Stack",
      title: "Principles before yield.",
      body: "Selection, constraint, and response form the risk boundary.",
      signals: ["Select", "Constrain", "Respond"],
      boundary: "Boundary"
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#f7faff] py-20 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_50%_0%,rgba(47,128,255,0.1),transparent_58%)]" />
      <div className="launch-container">
        <motion.div
          className="relative mx-auto max-w-5xl text-center"
          initial={reduceMotion ? false : { y: 28 }}
          whileInView={reduceMotion ? undefined : { y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="apple-eyebrow">Product Thesis</p>
          <p className="mx-auto mt-7 max-w-4xl text-balance text-[clamp(3.25rem,9vw,5rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-[var(--ink)] md:text-[clamp(4.6rem,6vw,5.85rem)]">
            <TitleLines
              text={manifesto.thesis[language]}
              lines={manifesto.thesisLines[language]}
              lineTestId="manifesto-thesis-line"
            />
          </p>
          <h2 className="mt-8 text-balance text-3xl font-semibold leading-tight text-[var(--ink)] md:text-5xl">
            <TitleLines
              text={manifesto.title[language]}
              lines={manifesto.titleLines[language]}
              lineTestId="manifesto-title-line"
            />
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-balance text-lg leading-8 text-[var(--ink-soft)] md:text-xl md:leading-9">
            {manifesto.body[language]}
          </p>
        </motion.div>

        <div
          data-testid="principles-rail"
          className="relative mt-14 overflow-hidden rounded-[2.75rem] border border-[#e2e8f0] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(247,251,255,0.76))] p-4 shadow-[0_30px_100px_rgba(15,23,42,0.055)] backdrop-blur-2xl md:p-8"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(47,128,255,0.09),transparent_48%)]" />
          <div className="pointer-events-none absolute left-1/2 top-10 hidden h-[calc(100%-5rem)] w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,rgba(47,128,255,0.22),transparent)] lg:block" />

          <div
            data-testid="principles-matrix"
            className="relative grid gap-5 lg:grid-cols-[0.95fr_1.1fr_0.95fr] lg:items-center"
          >
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
              {leftPillars.map((pillar, index) => (
                <PrincipleLine
                  key={pillar.title.en}
                  pillar={pillar}
                  index={index + 1}
                  language={language}
                  side="left"
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>

            <PrincipleEngine
              copy={engineCopy[language]}
              reduceMotion={reduceMotion}
            />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
              {rightPillars.map((pillar, index) => (
                <PrincipleLine
                  key={pillar.title.en}
                  pillar={pillar}
                  index={index + 4}
                  language={language}
                  side="right"
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type PrincipleLineProps = {
  pillar: ManifestoPillar;
  index: number;
  language: SiteLanguage;
  side: "left" | "right";
  reduceMotion: boolean | null;
};

function PrincipleLine({ pillar, index, language, side, reduceMotion }: PrincipleLineProps) {
  return (
    <motion.article
      key={pillar.title.en}
      data-testid="principle-compact-card"
      className={[
        "group relative min-h-[11.25rem] overflow-hidden rounded-[1.8rem] border border-[#e8eef7] bg-white/68 p-5 shadow-[0_16px_48px_rgba(15,23,42,0.026)] backdrop-blur-xl transition-colors duration-200 hover:border-[#bed4f4]",
        side === "left" ? "lg:text-right" : ""
      ].join(" ")}
      initial={reduceMotion ? false : { y: 18 }}
      whileInView={reduceMotion ? undefined : { y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{
        duration: 0.46,
        delay: reduceMotion ? 0 : index * 0.04,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <div
        className={[
          "absolute top-10 hidden h-px w-12 bg-[linear-gradient(90deg,transparent,rgba(47,128,255,0.5))] lg:block",
          side === "left" ? "-right-8" : "-left-8 rotate-180"
        ].join(" ")}
      />
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(47,128,255,0.075),transparent_68%)]" />
      <div className={["relative flex items-center gap-3", side === "left" ? "lg:justify-end" : ""].join(" ")}>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#2f80ff]">
          {String(index).padStart(2, "0")}
        </p>
        <span className="h-2 w-2 rounded-full bg-[#2f80ff] shadow-[0_0_18px_rgba(47,128,255,0.48)]" />
      </div>
      <h3 className="mt-7 text-2xl font-semibold leading-none tracking-[-0.04em] text-[var(--ink)] md:text-3xl">
        {pillar.title[language]}
      </h3>
      <p className={["mt-4 text-sm leading-6 text-[#5f6c7e]", side === "left" ? "lg:ml-auto" : ""].join(" ")}>
        {pillar.body[language]}
      </p>
    </motion.article>
  );
}

type PrincipleEngineProps = {
  copy: { label: string; title: string; body: string; signals: readonly string[]; boundary: string };
  reduceMotion: boolean | null;
};

function PrincipleEngine({ copy, reduceMotion }: PrincipleEngineProps) {
  return (
    <motion.article
      data-testid="principle-hero-card"
      className="relative min-h-[26rem] overflow-hidden rounded-[2.45rem] border border-[#dbe7f6] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(242,248,255,0.76))] p-6 text-center shadow-[0_28px_90px_rgba(47,128,255,0.075)] md:min-h-[31rem] md:p-8"
      initial={reduceMotion ? false : { y: 22, scale: 0.985 }}
      whileInView={reduceMotion ? undefined : { y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(47,128,255,0.18),transparent_52%)]" />
      <div className="absolute left-1/2 top-16 h-56 w-56 -translate-x-1/2 rounded-full border border-[#cfe0f5] md:h-72 md:w-72" />
      <div className="absolute left-1/2 top-24 h-44 w-44 -translate-x-1/2 rounded-full border border-[#dbe7f6] md:h-56 md:w-56" />
      <div className="absolute left-1/2 top-32 h-32 w-32 -translate-x-1/2 rounded-full border border-[#e6eef8] md:h-40 md:w-40" />

      <div className="relative">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#7b8798]">{copy.label}</p>
        <div className="mx-auto mt-10 flex h-32 w-32 items-center justify-center rounded-full bg-[#07111f] p-4 shadow-[0_26px_80px_rgba(7,17,31,0.2)] md:mt-12 md:h-40 md:w-40">
          <div className="flex h-full w-full items-center justify-center rounded-full border border-white/12 bg-[radial-gradient(circle_at_35%_25%,rgba(47,128,255,0.5),transparent_48%)]">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/72">
              {copy.boundary}
            </span>
          </div>
        </div>

        <h3 className="mx-auto mt-8 max-w-sm text-3xl font-semibold leading-tight tracking-[-0.045em] text-[var(--ink)] md:mt-10 md:text-[2.65rem]">
          {copy.title}
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-base leading-7 text-[#5f6c7e] md:mt-4">
          {copy.body}
        </p>

        <div className="mx-auto mt-6 grid max-w-sm grid-cols-3 gap-2 md:mt-8">
          {copy.signals.map((signal) => (
            <span
              key={signal}
              className="rounded-full border border-[#dbe7f6] bg-white/72 px-3 py-2 font-mono text-[10px] uppercase text-[#2f80ff] shadow-[0_10px_30px_rgba(47,128,255,0.06)]"
            >
              {signal}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
