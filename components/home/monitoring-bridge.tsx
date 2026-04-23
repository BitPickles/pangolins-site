import Link from "next/link";
import {
  morphoVaultUrl,
  siteCopy,
  type SiteLanguage
} from "@/lib/content/site-copy";
import { SectionFrame } from "@/components/home/section-frame";

type MonitoringBridgeProps = {
  language: SiteLanguage;
};

export function MonitoringBridge({ language }: MonitoringBridgeProps) {
  return (
    <SectionFrame
      id="monitoring-bridge"
      index="06"
      label={siteCopy.monitoringBridge.label}
      language={language}
      title={siteCopy.monitoringBridge.title}
    >
      <div className="flex flex-col gap-6 rounded-[1.75rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(156,193,255,0.04))] p-6 md:flex-row md:items-end md:justify-between">
        <p className="max-w-2xl text-lg leading-8 text-white/68">
          {siteCopy.monitoringBridge.body[language]}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/monitoring"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[color:var(--line-strong)] bg-white px-5 text-sm font-medium text-slate-950 transition hover:bg-[color:var(--accent-strong)]"
          >
            {siteCopy.hero.primaryCta[language]}
          </Link>
          <Link
            href={morphoVaultUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/12 bg-white/4 px-5 text-sm text-white/84 transition hover:bg-white/8"
          >
            {siteCopy.hero.secondaryCta[language]}
          </Link>
        </div>
      </div>
    </SectionFrame>
  );
}
