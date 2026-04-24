"use client";

import { useRef } from "react";
import { motion, type MotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { siteCopy, type SiteLanguage } from "@/lib/content/site-copy";

type AppleScenesProps = {
  language: SiteLanguage;
};

const visualLabels: Array<Record<SiteLanguage, readonly string[]>> = [
  {
    zh: ["协议", "流动性", "执行"],
    en: ["Protocol", "Liquidity", "Execution"]
  },
  {
    zh: ["收益", "退出", "纪律"],
    en: ["Yield", "Exit", "Discipline"]
  },
  {
    zh: ["链上", "内存池", "告警"],
    en: ["Onchain", "Mempool", "Alerts"]
  }
];

export function AppleScenes({ language }: AppleScenesProps) {
  return (
    <section aria-label="Homepage narrative sequence" className="bg-white">
      {siteCopy.home.scenes.map((scene, index) => (
        <Scene key={scene.kicker} language={language} index={index} scene={scene} />
      ))}
    </section>
  );
}

type SceneProps = {
  language: SiteLanguage;
  index: number;
  scene: (typeof siteCopy.home.scenes)[number];
};

function Scene({ language, index, scene }: SceneProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.18, 0.74, 1], [0, 1, 1, 0.15]);
  const contentY = useTransform(scrollYProgress, [0, 0.2, 0.78, 1], [74, 0, -10, -64]);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.2, 0.78, 1], [0, 1, 0.9, 0.1]);
  const visualScale = useTransform(scrollYProgress, [0, 0.25, 0.78, 1], [0.86, 1, 1.02, 0.92]);
  const lineScale = useTransform(scrollYProgress, [0.14, 0.46, 0.82], [0.12, 1, 0.68]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.04, 0.18, 0.12, 0]);

  return (
    <section
      ref={ref}
      className={reduceMotion ? "relative py-24 md:py-32" : "relative h-[132vh]"}
    >
      <div
        className={
          reduceMotion
            ? "relative flex items-center overflow-hidden"
            : "sticky top-0 flex h-screen items-center overflow-hidden"
        }
      >
        <motion.div
          style={reduceMotion ? undefined : { opacity: glowOpacity }}
          className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-[34rem] max-w-[34rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(47,128,255,0.16),transparent_68%)] blur-3xl"
        />

        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.78fr)] lg:items-center">
          <motion.div
            style={reduceMotion ? undefined : { opacity: contentOpacity, y: contentY }}
            className="mx-auto max-w-5xl text-center lg:mx-0 lg:text-left"
          >
            <p className="apple-eyebrow">{scene.kicker}</p>
            <h2 className="mt-5 text-balance text-5xl font-semibold leading-[0.96] text-[#07111f] md:text-7xl lg:text-[5.8rem]">
              {scene.title[language]}
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-balance text-xl leading-9 text-[#536174] md:text-2xl md:leading-10 lg:mx-0">
              {scene.body[language]}
            </p>
          </motion.div>

          <motion.div
            style={reduceMotion ? undefined : { opacity: visualOpacity, scale: visualScale }}
            className="relative mx-auto w-full max-w-[28rem]"
          >
            <SceneVisual
              index={index}
              labels={visualLabels[index][language]}
              panelTitle={scene.panelTitle[language]}
              panelBody={scene.panelBody[language]}
              lineScale={reduceMotion ? undefined : lineScale}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

type SceneVisualProps = {
  index: number;
  labels: readonly string[];
  panelTitle: string;
  panelBody: string;
  lineScale: MotionValue<number> | undefined;
};

function SceneVisual({ index, labels, panelTitle, panelBody, lineScale }: SceneVisualProps) {
  return (
    <div className="relative aspect-square rounded-[2.5rem] border border-[#e2e8f0] bg-[linear-gradient(145deg,#ffffff,#f5f9ff)] p-6 shadow-[0_40px_120px_rgba(15,23,42,0.08)]">
      <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_28%,rgba(47,128,255,0.14),transparent_56%)]" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase text-[#7b8798]">
          <span>{panelTitle}</span>
          <span>0{index + 1}</span>
        </div>

        <div className="relative mx-auto flex h-56 w-full max-w-80 items-center justify-center">
          <div className="absolute left-0 grid gap-3">
            {labels.map((label) => (
              <span
                key={label}
                className="rounded-full border border-[#d9e5f5] bg-white px-3 py-2 font-mono text-[10px] uppercase text-[#7b8798] shadow-sm"
              >
                {label}
              </span>
            ))}
          </div>
          <motion.div
            style={lineScale ? { scaleX: lineScale } : undefined}
            className="absolute left-[5.5rem] right-[5rem] top-1/2 h-px origin-left bg-[#2f80ff]"
          />
          <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2f80ff]/45 bg-white shadow-[0_0_0_18px_rgba(47,128,255,0.08)]" />
          <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2f80ff]" />
          <div className="absolute right-0 flex h-20 w-20 items-center justify-center rounded-full border border-[#d9e5f5] bg-white font-mono text-[10px] uppercase text-[#2f80ff]">
            Clear
          </div>
        </div>

        <p className="max-w-xs text-sm leading-6 text-[#5c6879]">{panelBody}</p>
      </div>
    </div>
  );
}
