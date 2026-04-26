"use client";

import { useRef } from "react";
import { motion, type MotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { siteCopy, type SiteLanguage } from "@/lib/content/site-copy";

type AppleScenesProps = {
  language: SiteLanguage;
};

const visualLabels: Array<Record<SiteLanguage, readonly string[]>> = [
  {
    zh: ["原则", "路径", "执行"],
    en: ["Principle", "Path", "Execution"]
  },
  {
    zh: ["边界", "退出", "纪律"],
    en: ["Boundary", "Exit", "Discipline"]
  },
  {
    zh: ["监控", "预警", "响应"],
    en: ["Monitor", "Alert", "Respond"]
  }
];

const visualModes = ["filter", "route", "pulse"] as const;

export function AppleScenes({ language }: AppleScenesProps) {
  return (
    <section aria-label="Homepage narrative sequence" className="bg-[#f7faff]">
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

  const contentOpacity = useTransform(scrollYProgress, [0, 0.18, 0.74, 1], [0, 1, 1, 0.16]);
  const contentY = useTransform(scrollYProgress, [0, 0.2, 0.78, 1], [70, 0, -8, -58]);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.2, 0.78, 1], [0, 1, 0.92, 0.14]);
  const visualY = useTransform(scrollYProgress, [0, 0.26, 0.8, 1], [56, 0, -16, -46]);
  const lineScale = useTransform(scrollYProgress, [0.14, 0.48, 0.84], [0.08, 1, 0.72]);

  return (
    <section
      ref={ref}
      className={reduceMotion ? "relative py-24 md:py-32" : "relative h-[128vh]"}
    >
      <div
        className={
          reduceMotion
            ? "relative flex items-center overflow-hidden"
            : "sticky top-0 flex h-screen items-center overflow-hidden"
        }
      >
        <div className="launch-container grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <motion.div
            style={reduceMotion ? undefined : { opacity: contentOpacity, y: contentY }}
            className="max-w-3xl"
          >
            <p className="apple-eyebrow">{scene.kicker}</p>
            <h2 className="mt-5 text-balance text-5xl font-semibold leading-[0.95] text-[var(--ink)] md:text-7xl lg:text-[5.6rem]">
              {scene.title[language]}
            </h2>
            <p className="mt-7 max-w-2xl text-balance text-xl leading-9 text-[var(--ink-soft)] md:text-2xl md:leading-10">
              {scene.body[language]}
            </p>
          </motion.div>

          <motion.div
            style={reduceMotion ? undefined : { opacity: visualOpacity, y: visualY }}
            className="relative"
          >
            <SceneVisual
              index={index}
              mode={visualModes[index]}
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
  mode: (typeof visualModes)[number];
  labels: readonly string[];
  panelTitle: string;
  panelBody: string;
  lineScale: MotionValue<number> | undefined;
};

function SceneVisual({ index, mode, labels, panelTitle, panelBody, lineScale }: SceneVisualProps) {
  return (
    <div
      data-testid={`scene-visual-${index}`}
      className="launch-surface relative min-h-[28rem] overflow-hidden rounded-[3rem] p-6 md:min-h-[34rem] md:p-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_35%,rgba(47,128,255,0.14),transparent_52%)]" />
      <div className="relative flex items-center justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase text-[#7b8798]">{panelTitle}</p>
          <p className="mt-2 max-w-xs text-sm leading-6 text-[#5c6879]">{panelBody}</p>
        </div>
        <span className="font-mono text-5xl font-semibold text-[#e4ebf5] md:text-7xl">
          0{index + 1}
        </span>
      </div>

      <div className="relative mt-12 h-64 md:h-72">
        <div className="absolute inset-y-0 left-0 flex flex-col justify-center gap-3">
          {labels.map((label) => (
            <span
              key={label}
              className="launch-pill min-w-24 px-3 py-2 text-center font-mono text-[10px] uppercase text-[#5f6c7e]"
            >
              {label}
            </span>
          ))}
        </div>

        <motion.div
          style={lineScale ? { scaleX: lineScale } : undefined}
          className="absolute left-28 right-24 top-1/2 h-px origin-left bg-[#2f80ff]"
        />

        <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2f80ff]/40 bg-white shadow-[0_0_0_24px_rgba(47,128,255,0.07)]" />
        <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2f80ff] shadow-[0_20px_55px_rgba(47,128,255,0.3)]" />

        {mode === "filter" ? (
          <div className="absolute right-0 top-1/2 grid -translate-y-1/2 gap-2">
            <span className="rounded-full bg-[#07111f] px-4 py-2 font-mono text-[10px] uppercase text-white">
              Clear
            </span>
            <span className="rounded-full border border-[#dbe5f3] bg-white px-4 py-2 font-mono text-[10px] uppercase text-[#8894a4]">
              Reject
            </span>
          </div>
        ) : null}

        {mode === "route" ? (
          <div className="absolute right-0 top-1/2 h-32 w-32 -translate-y-1/2 rounded-[2rem] border border-[#dbe5f3] bg-white p-3">
            <div className="h-full rounded-[1.35rem] border border-[#2f80ff]/35 bg-[linear-gradient(135deg,rgba(47,128,255,0.1),transparent)]" />
          </div>
        ) : null}

        {mode === "pulse" ? (
          <div className="absolute right-0 top-1/2 flex h-32 w-32 -translate-y-1/2 items-center justify-center rounded-full border border-[#dbe5f3] bg-white">
            <div className="h-16 w-16 rounded-full border border-[#2f80ff]/40 bg-[#2f80ff]/10" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
