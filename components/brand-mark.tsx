"use client";

type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className = "" }: BrandMarkProps) {
  return (
    <div className={`relative isolate aspect-square ${className}`} aria-hidden="true">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_24%,#9dc2ff,#337cff_54%,#1f4ca8_100%)] shadow-[0_34px_90px_rgba(47,128,255,0.22)]" />
      <div className="absolute inset-[16%] rounded-full bg-white shadow-[inset_0_18px_42px_rgba(31,76,168,0.08)]" />
      <div className="absolute inset-[9%] rotate-[24deg] rounded-full border-[clamp(10px,5vw,28px)] border-[#2f80ff] border-b-transparent border-r-transparent" />
      <div className="absolute inset-[28%] rotate-[18deg] rounded-full border-[clamp(6px,2.5vw,16px)] border-[#1f4ca8] border-b-transparent border-l-transparent opacity-85" />
      <div className="absolute right-[24%] top-[25%] h-[10%] w-[10%] rounded-full bg-white shadow-[0_0_0_clamp(3px,1.4vw,9px)_rgba(47,128,255,0.18)]" />
      <div className="absolute inset-[6%] rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.45),transparent_42%)]" />
    </div>
  );
}
