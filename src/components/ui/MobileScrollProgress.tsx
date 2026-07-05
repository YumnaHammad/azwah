"use client";

import { useSceneState } from "@/components/providers/SceneProvider";

const PHASE_LABELS: Record<string, string> = {
  intro: "Silence",
  glow: "Awaken",
  reveal: "Approach",
  unlock: "Unlock",
  lift: "Reveal",
  escape: "Breath",
  spray: "Release",
  spread: "Transform",
  exit: "Legacy",
};

export function MobileScrollProgress() {
  const { phase, progress } = useSceneState();

  if (progress > 0.78) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 xl:hidden pointer-events-none safe-bottom">
      <div className="px-4 pb-4 pt-2 bg-gradient-to-t from-primary-dark/90 via-primary-dark/50 to-transparent">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[9px] tracking-[0.25em] uppercase text-gold-soft/80">
            {PHASE_LABELS[phase] ?? "Ritual"}
          </span>
          <span className="text-[9px] tracking-wider text-cream/30">
            {Math.round(progress * 100)}%
          </span>
        </div>
        <div className="h-px w-full bg-cream/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold/60 to-gold-soft rounded-full transition-all duration-300"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
