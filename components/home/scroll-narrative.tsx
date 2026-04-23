"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { SiteLanguage } from "@/lib/content/site-copy";

type ScrollNarrativeProps = {
  language: SiteLanguage;
};

const scenes = {
  zh: [
    {
      label: "01 / Structure",
      title: "风险不是结果，它先是结构。",
      body: "一次尾部风险真正伤人的地方，不在波动本身，而在你事前并不知道自己暴露在什么结构里。"
    },
    {
      label: "02 / Liquidity",
      title: "高流动性，不该以高风险为代价。",
      body: "当你把资金停在链上保守层时，最重要的不是再多几个点，而是你是否还能在需要的时候有序退出。"
    },
    {
      label: "03 / Discipline",
      title: "先保留退出能力，再谈收益增强。",
      body: "Pangolins 把监控、约束和纪律放在收益包装之前，因为真正成熟的资金先在意边界，再在意数字。"
    }
  ],
  en: [
    {
      label: "01 / Structure",
      title: "Risk is not only an outcome. It is a structure first.",
      body: "Tail risk does not hurt only because volatility appears. It hurts because the structure was never fully legible beforehand."
    },
    {
      label: "02 / Liquidity",
      title: "High liquidity should not require high risk.",
      body: "When capital sits in the defensive sleeve, the key question is not a few extra points of yield. It is whether exit remains orderly when needed."
    },
    {
      label: "03 / Discipline",
      title: "Preserve exit capacity before yield enhancement.",
      body: "Pangolins ranks monitoring, constraints, and discipline above yield packaging because mature capital cares about boundaries before numbers."
    }
  ]
} as const;

export function ScrollNarrative({ language }: ScrollNarrativeProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 md:py-20">
      <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="sticky-scene space-y-4">
          <p className="dossier-label">Scroll Narrative</p>
          <h2 className="font-display text-4xl leading-tight text-[#0f172a] md:text-5xl">
            {language === "zh" ? "首页应该像一段被设计过的阅读体验。" : "The home page should feel designed for reading."}
          </h2>
          <p className="text-base leading-7 text-[var(--muted)]">
            {language === "zh"
              ? "不是堆模块，而是让每一段在滚动时接管视线。"
              : "Not a stack of modules, but a sequence where each section takes over the screen as you scroll."}
          </p>
        </div>
        <div className="space-y-6">
          {scenes[language].map((scene, index) => (
            <motion.article
              key={scene.title}
              className="sticky-scene rounded-[2rem] border border-[color:var(--line)] bg-white px-6 py-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)] md:px-8 md:py-10"
              initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.08 }}
              style={{ top: `${6 + index * 1.6}rem` }}
            >
              <p className="dossier-label">{scene.label}</p>
              <h3 className="mt-5 max-w-3xl font-display text-3xl leading-tight text-[#0f172a] md:text-4xl">
                {scene.title}
              </h3>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">{scene.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
