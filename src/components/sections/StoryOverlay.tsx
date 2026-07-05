"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSceneState } from "@/components/providers/SceneProvider";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const STORY_BEATS = {
  intro: {
    label: "Azwah Enterprises",
    title: ["Where silence", "becomes scent."],
    body: "An invitation to experience fragrance as art — composed, not manufactured.",
  },
  glow: {
    label: "The Awakening",
    title: ["A whisper of", "gold appears."],
    body: "Light gathers. The bottle breathes. Something extraordinary is about to unfold.",
  },
  reveal: {
    label: "The Approach",
    title: ["Draw closer to", "pure essence."],
    body: "Every facet of glass catches the light — a prelude to revelation.",
  },
  unlock: {
    label: "The Ritual",
    title: ["The cap", "unlocks."],
    body: "Polished metal turns. A centuries-old gesture of anticipation.",
  },
  lift: {
    label: "The Revelation",
    title: ["The sacred", "tube emerges."],
    body: "Through crystal clarity, the dip tube rises — the heart of the fragrance revealed.",
  },
  escape: {
    label: "First Breath",
    title: ["Golden mist", "escapes."],
    body: "The faintest trace of oud and amber drifts into the air. Elegant. Never loud.",
  },
  spray: {
    label: "The Release",
    title: ["Press.", "Inhale."],
    body: "Atomizer depresses. A veil of golden particles flows — you can almost smell it.",
  },
  spread: {
    label: "Transformation",
    title: ["Fragrance fills", "the world."],
    body: "The atmosphere warms. Light turns gold. Everything begins to glow.",
  },
  exit: {
    label: "The Legacy",
    title: ["The vessel fades.", "Essence remains."],
    body: "What lingers is memory — timeless, intimate, unforgettable.",
  },
} as const;

export function StoryOverlay() {
  const { phase, progress, fragranceSpread, environmentWarmth } = useSceneState();
  const bp = useBreakpoint();
  const beat = STORY_BEATS[phase];
  const textGlow = fragranceSpread * 0.5 + environmentWarmth * 0.3;
  const isMobile = bp === "mobile";
  const storyFade = progress > 0.74 ? Math.max(0, 1 - (progress - 0.74) * 4) : 1;

  return (
    <div
      className="absolute inset-0 pointer-events-none z-10 flex flex-col transition-opacity duration-500"
      style={{ opacity: storyFade }}
    >
      {/* Headline — top on all sizes; leaves center for bottle */}
      <div className="shrink-0 pt-[max(5rem,calc(env(safe-area-inset-top)+3.25rem))] sm:pt-24 md:pt-28 px-4 sm:px-6 md:px-12 lg:px-20 max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{
              textShadow:
                textGlow > 0.1
                  ? `0 0 ${16 + textGlow * 32}px rgba(216, 198, 106, ${textGlow * 0.28})`
                  : "none",
            }}
          >
            <p className="section-label mb-2 sm:mb-3 md:mb-4">{beat.label}</p>
            <h2 className="headline-xl text-[1.75rem] leading-[1.05] xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-cream">
              {beat.title[0]}
              <br />
              <span className="text-gradient-gold">{beat.title[1]}</span>
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Spacer — bottle lives here visually */}
      <div className="flex-1 min-h-[28vh] sm:min-h-[32vh] md:min-h-[36vh]" aria-hidden="true" />

      {/* Body copy — bottom, above mobile progress bar */}
      <div className="shrink-0 px-4 sm:px-6 md:px-12 lg:px-20 pb-[max(6rem,calc(env(safe-area-inset-bottom)+4.5rem))] sm:pb-28 md:pb-32 max-w-lg">
        <AnimatePresence mode="wait">
          <motion.p
            key={`${phase}-body`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-cream/50 text-xs sm:text-sm md:text-base leading-relaxed font-light tracking-wide"
          >
            {isMobile && beat.body.length > 90
              ? beat.body.split(".")[0] + "."
              : beat.body}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Scroll hint — desktop/tablet only (mobile uses progress bar) */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        animate={{ opacity: progress < 0.1 ? 0.5 : 0 }}
      >
        <span className="text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-cream/40">
          Scroll to begin
        </span>
        <div className="scroll-line" />
      </motion.div>
    </div>
  );
}

export function HeroIntro() {
  return null;
}
