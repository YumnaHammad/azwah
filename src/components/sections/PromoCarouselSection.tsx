"use client";

import Link from "next/link";
import { LuxuryCarousel } from "@/components/ui/LuxuryCarousel";
import { useSiteContent } from "@/hooks/useSiteContent";

const ACCENT_BG = {
  gold: "from-[#2a2008]/80 via-primary-dark to-[#041a12]",
  oud: "from-[#1a1008]/80 via-primary-dark to-[#041a12]",
  jade: "from-primary-dark via-[#041f16] to-[#041a12]",
  rose: "from-[#2a1020]/80 via-primary-dark to-[#041a12]",
} as const;

export function PromoCarouselSection() {
  const { site } = useSiteContent();

  return (
    <section className="py-8 sm:py-12 px-0 border-y border-gold/10 bg-[#041a12]/60">
      <div className="section-container">
        <LuxuryCarousel autoPlayMs={2000} showArrows={false}>
          {site.highlights.map((slide) => (
            <div
              key={slide.id}
              className={`luxury-card rounded-2xl p-8 sm:p-10 md:p-12 bg-gradient-to-br ${ACCENT_BG[slide.accent]}`}
            >
              <div className="max-w-2xl mx-auto text-center md:text-left md:mx-0">
                <p className="section-label mb-3">{slide.label}</p>
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-cream mb-4 leading-snug">
                  {slide.title}
                </h3>
                <p className="text-cream/45 text-sm sm:text-base font-light leading-relaxed mb-6 max-w-xl">
                  {slide.body}
                </p>
                <Link
                  href={slide.href}
                  className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-gold/30 text-[10px] tracking-[0.25em] uppercase text-cream/70 hover:bg-gold/10 hover:border-gold/50 hover:text-gold-soft transition-all"
                >
                  {slide.cta} →
                </Link>
              </div>
            </div>
          ))}
        </LuxuryCarousel>
      </div>
    </section>
  );
}
