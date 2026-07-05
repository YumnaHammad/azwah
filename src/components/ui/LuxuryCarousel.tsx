"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LuxuryCarouselProps {
  children: ReactNode[];
  autoPlayMs?: number;
  className?: string;
  showDots?: boolean;
  showArrows?: boolean;
}

export function LuxuryCarousel({
  children,
  autoPlayMs = 2000,
  className = "",
  showDots = true,
  showArrows = true,
}: LuxuryCarouselProps) {
  const slides = children.filter(Boolean);
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  useEffect(() => {
    if (paused || count <= 1 || autoPlayMs <= 0) return;
    const id = setInterval(next, autoPlayMs);
    return () => clearInterval(id);
  }, [paused, next, autoPlayMs, count]);

  if (count === 0) return null;

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {slides[index]}
          </motion.div>
        </AnimatePresence>
      </div>

      {showArrows && count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-gold/25 bg-primary-dark/80 backdrop-blur-sm text-cream/60 hover:text-gold-soft hover:border-gold/50 transition-all"
          >
            ←
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-gold/25 bg-primary-dark/80 backdrop-blur-sm text-cream/60 hover:text-gold-soft hover:border-gold/50 transition-all"
          >
            →
          </button>
        </>
      )}

      {showDots && count > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === index
                  ? "w-6 h-1.5 bg-gold-soft"
                  : "w-1.5 h-1.5 bg-cream/20 hover:bg-cream/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
