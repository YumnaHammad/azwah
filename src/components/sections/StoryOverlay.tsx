"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSceneState } from "@/components/providers/SceneProvider";

const STORY_BEATS = {
  intro: {
    label: "Azwah Enterprises",
    title: ["Crafted.", "Pure."],
    body: "The art of fragrance, distilled into silence.",
  },
  reveal: {
    label: "The Essence",
    title: ["Every drop", "tells a story"],
    body: "Rare ingredients from distant lands, waiting to be revealed.",
  },
  open: {
    label: "The Ritual",
    title: ["Uncork the", "secret within"],
    body: "The cap releases. Anticipation becomes revelation.",
  },
  spray: {
    label: "The Release",
    title: ["A golden mist", "takes flight"],
    body: "Soft, elegant, flowing — never loud. Pure luxury in motion.",
  },
  transform: {
    label: "The Experience",
    title: ["Let fragrance", "transform you"],
    body: "Oud, amber, and rose envelop the air. The world grows golden.",
  },
  exit: {
    label: "Timeless",
    title: ["The bottle fades.", "The essence remains."],
    body: "What lingers is not the vessel — but the memory of luxury.",
  },
} as const;

export function StoryOverlay() {
  const { phase, progress } = useSceneState();
  const beat = STORY_BEATS[phase];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Top headline — keeps center clear for bottle */}
      <div className="absolute top-24 md:top-28 left-0 right-0 px-6 md:px-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-3xl"
          >
            <p className="section-label mb-4 md:mb-5">{beat.label}</p>
            <h2 className="headline-xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-cream">
              {beat.title[0]}
              <br />
              <span className="text-gradient-gold">{beat.title[1]}</span>
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom caption */}
      <div className="absolute bottom-28 md:bottom-32 left-0 right-0 px-6 md:px-16">
        <AnimatePresence mode="wait">
          <motion.p
            key={`${phase}-body`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-md text-cream/45 text-sm md:text-base leading-relaxed font-light"
          >
            {beat.body}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Scroll hint — fades after intro */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        animate={{ opacity: progress < 0.12 ? 0.5 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-[10px] tracking-[0.35em] uppercase text-cream/50">
          Scroll to reveal
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-gold/50 to-transparent" />
      </motion.div>
    </div>
  );
}

export function HeroIntro() {
  return null;
}
