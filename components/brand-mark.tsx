type BrandMarkProps = {
  className?: string;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const markSrc = `${basePath}/brand/pangolins-mark.png`;

export function BrandMark({ className = "" }: BrandMarkProps) {
  return (
    <div className={`relative isolate aspect-square ${className}`} aria-hidden="true">
      <img
        src={markSrc}
        alt=""
        decoding="async"
        className="h-full w-full object-contain drop-shadow-[0_18px_42px_rgba(22,119,255,0.18)]"
      />
    </div>
  );
}

type BrandWordmarkProps = {
  className?: string;
};

export function BrandWordmark({ className = "" }: BrandWordmarkProps) {
  return (
    <span
      className={[
        "inline-flex items-baseline text-[#0b1d3d]",
        "text-[1.08rem] font-black lowercase leading-none tracking-[-0.075em]",
        className
      ].join(" ")}
      style={{
        fontFamily:
          '"Avenir Next", "Nunito Sans", "Arial Rounded MT Bold", "Trebuchet MS", sans-serif'
      }}
      aria-hidden="true"
    >
      pangol
      <span className="relative inline-block text-[#0b1d3d]">
        ı
        <span className="absolute left-1/2 top-[-0.38em] h-[0.36em] w-[0.36em] -translate-x-1/2 rounded-full bg-[#1677ff]" />
      </span>
      ns
    </span>
  );
}
