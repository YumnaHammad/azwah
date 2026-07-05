"use client";

const MARQUEE_ITEMS = [
  { primary: "Azwah", secondary: "Enterprises" },
  { primary: "Luxury", secondary: "Fragrance" },
  { primary: "J. Perfume", secondary: "Authorized" },
  { primary: "Own", secondary: "Ingredients" },
  { primary: "Oud", secondary: "Rose · Amber" },
];

function MarqueeTrack() {
  return (
    <div className="logo-marquee-content flex shrink-0 items-center">
      {MARQUEE_ITEMS.map((item) => (
        <span
          key={`${item.primary}-${item.secondary}`}
          className="inline-flex items-center gap-4 sm:gap-6 px-8 sm:px-12"
        >
          <span className="font-serif text-base sm:text-lg md:text-xl tracking-[0.28em] sm:tracking-[0.35em] uppercase text-cream/85">
            {item.primary}
          </span>
          <span className="text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-gold/50">
            {item.secondary}
          </span>
          <span className="text-gold-soft/70 text-xs sm:text-sm select-none" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

interface LogoMarqueeProps {
  className?: string;
  /** Repeat tracks for seamless loop density */
  repeats?: number;
}

export function LogoMarquee({ className = "", repeats = 4 }: LogoMarqueeProps) {
  return (
    <div
      className={`logo-marquee overflow-hidden border-y border-gold/15 bg-[#041a12]/95 backdrop-blur-sm ${className}`}
      aria-label="Azwah Enterprises brand banner"
    >
      <div className="absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-[#041a12] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-[#041a12] to-transparent z-10 pointer-events-none" />

      <div className="logo-marquee-track flex w-max py-3 sm:py-3.5">
        {Array.from({ length: repeats * 2 }).map((_, i) => (
          <MarqueeTrack key={i} />
        ))}
      </div>
    </div>
  );
}
