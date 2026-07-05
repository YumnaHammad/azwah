"use client";

import type { ProductImage } from "@/types/product";

const ACCENT_STYLES = {
  noir: {
    liquid: "from-[#1a1208]/90 to-[#0d0804]/95",
    cap: "from-neutral-700 to-neutral-900",
    glow: "rgba(184,154,62,0.12)",
    bg: "from-primary-dark via-[#041f16] to-primary-dark",
  },
  rose: {
    liquid: "from-rose-900/70 to-rose-950/90",
    cap: "from-gold to-gold-soft",
    glow: "rgba(216,198,106,0.15)",
    bg: "from-[#2a1020] via-primary-dark to-[#1a0812]",
  },
  gold: {
    liquid: "from-amber-800/80 to-amber-950/90",
    cap: "from-gold-soft to-gold",
    glow: "rgba(216,198,106,0.2)",
    bg: "from-[#2a2008] via-primary-dark to-[#1a1406]",
  },
  oud: {
    liquid: "from-[#3d2010]/90 to-[#1a0c06]/95",
    cap: "from-neutral-800 to-black",
    glow: "rgba(184,154,62,0.1)",
    bg: "from-[#1a1008] via-primary-dark to-[#0d0804]",
  },
  jade: {
    liquid: "from-primary/60 to-primary-dark/80",
    cap: "from-slate-400 to-slate-600",
    glow: "rgba(14,90,57,0.2)",
    bg: "from-primary-dark via-[#041f16] to-primary-dark",
  },
  ivory: {
    liquid: "from-stone-600/50 to-stone-800/70",
    cap: "from-stone-200 to-stone-400",
    glow: "rgba(250,250,250,0.08)",
    bg: "from-[#1a1814] via-primary-dark to-[#121008]",
  },
  amber: {
    liquid: "from-amber-700/70 to-amber-900/90",
    cap: "from-gold to-amber-600",
    glow: "rgba(216,198,106,0.14)",
    bg: "from-[#2a1806] via-primary-dark to-[#1a1004]",
  },
} as const;

interface ProductVisualProps {
  image: ProductImage;
  className?: string;
  size?: "sm" | "md" | "lg";
  /** When true, skip full-bleed bg — parent provides dark showcase well */
  embedded?: boolean;
}

export function ProductVisual({ image, className = "", size = "md", embedded = false }: ProductVisualProps) {
  const style = ACCENT_STYLES[image.accent];
  const bottleScale =
    size === "sm" ? "w-[52px] h-[120px]" : size === "lg" ? "w-[100px] h-[220px]" : "w-[72px] h-[168px]";

  if (image.variant === "box") {
    return (
      <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${style.bg}`} />
        <div className="relative w-[70%] max-w-[280px] aspect-[4/3] rounded-lg border border-gold/20 bg-gradient-to-br from-primary-dark/80 to-black/60 shadow-2xl flex items-center justify-center">
          <div className="absolute inset-2 border border-gold/10 rounded-md" />
          <span className="font-serif text-gold/40 text-2xl sm:text-4xl tracking-[0.3em]">A</span>
          <div className="absolute bottom-3 inset-x-0 text-center">
            <p className="text-[8px] sm:text-[10px] tracking-[0.4em] uppercase text-gold/50">Azwah</p>
          </div>
        </div>
      </div>
    );
  }

  if (image.variant === "lifestyle") {
    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${style.bg}`} />
        <div className="absolute inset-0 texture-grain opacity-20" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl w-[60%] aspect-square"
          style={{ background: `radial-gradient(circle, ${style.glow} 0%, transparent 70%)` }}
        />
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2">
          <div className={`${bottleScale} relative`}>
            <BottleShape style={style} />
          </div>
          <div className="w-32 h-2 mx-auto mt-4 bg-black/30 rounded-full blur-md" />
        </div>
        <div className="absolute top-8 right-8 w-20 h-20 border border-gold/10 rounded-full" />
      </div>
    );
  }

  if (image.variant === "detail") {
    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        <div className={`absolute inset-0 bg-gradient-to-b ${style.bg}`} />
        <div className="absolute inset-0 flex items-center justify-center scale-150">
          <div className="w-32 h-32 rounded-full border-2 border-gold/30 bg-gradient-to-b from-gold/20 to-transparent" />
          <div className="absolute w-16 h-20 bg-gradient-to-b from-white/10 to-transparent border border-white/10 rounded-t-xl -mt-24" />
        </div>
        <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full flex items-end justify-center pb-8 sm:pb-12 ${className}`}>
      {!embedded && <div className={`absolute inset-0 bg-gradient-to-b ${style.bg}`} />}
      {!embedded && (
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[50%] aspect-square rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${style.glow} 0%, transparent 70%)` }}
        />
      )}
      {embedded && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45%] aspect-square rounded-full blur-2xl opacity-60"
          style={{ background: `radial-gradient(circle, ${style.glow} 0%, transparent 70%)` }}
        />
      )}
      <div className={`relative ${bottleScale}`}>
        <BottleShape style={style} />
      </div>
      {!embedded && <div className="absolute bottom-6 w-24 h-2 bg-gold/10 rounded-full blur-md" />}
    </div>
  );
}

function BottleShape({ style }: { style: (typeof ACCENT_STYLES)[keyof typeof ACCENT_STYLES] }) {
  return (
    <>
      <div className="absolute inset-x-0.5 bottom-0 top-8 rounded-lg bg-gradient-to-b from-white/[0.1] to-white/[0.03] border border-white/10 backdrop-blur-sm shadow-lg" />
      <div className={`absolute inset-x-2.5 top-10 bottom-3 rounded-md bg-gradient-to-b ${style.liquid}`} />
      <div className={`absolute inset-x-2 top-0 h-9 sm:h-10 rounded-t-lg bg-gradient-to-b ${style.cap} shadow-md`} />
      <div className="absolute inset-x-1.5 top-8 h-1.5 bg-gold/40 rounded-full" />
      <div className="absolute inset-x-3 top-14 h-8 border border-gold/15 rounded-sm bg-[#F5F5F0]/90 flex items-center justify-center">
        <span className="font-serif text-[6px] font-semibold tracking-[0.28em] text-primary-dark uppercase">
          AZWAH
        </span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-lg" />
    </>
  );
}
