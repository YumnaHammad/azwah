"use client";

import { useSceneState } from "@/components/providers/SceneProvider";

const CHAPTERS = [
  { key: "intro", label: "Silence" },
  { key: "glow", label: "Awaken" },
  { key: "reveal", label: "Approach" },
  { key: "unlock", label: "Unlock" },
  { key: "lift", label: "Reveal" },
  { key: "escape", label: "Breath" },
  { key: "spray", label: "Release" },
  { key: "spread", label: "Transform" },
  { key: "exit", label: "Legacy" },
] as const;

export function ScrollChapters() {
  const { phase, progress } = useSceneState();
  const idx = CHAPTERS.findIndex((c) => c.key === phase);

  return (
    <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-4">
      {CHAPTERS.map((chapter, i) => {
        const active = phase === chapter.key;
        const passed = idx > i;

        return (
          <div key={chapter.key} className="flex items-center gap-3 justify-end">
            <span
              className={`text-[9px] tracking-[0.3em] uppercase transition-all duration-700 ${
                active
                  ? "text-gold-soft"
                  : passed
                    ? "text-cream/25"
                    : "text-cream/10"
              }`}
            >
              {chapter.label}
            </span>
            <div
              className={`rounded-full transition-all duration-700 ${
                active
                  ? "w-2 h-2 bg-gold-soft shadow-[0_0_14px_rgba(216,198,106,0.7)]"
                  : passed
                    ? "w-1.5 h-1.5 bg-gold/30"
                    : "w-1 h-1 bg-cream/10"
              }`}
            />
          </div>
        );
      })}

      <div className="mt-3 w-px h-14 bg-cream/10 ml-auto mr-[3px] relative overflow-hidden rounded-full">
        <div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-gold/60 to-gold-soft rounded-full transition-all duration-300"
          style={{ height: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
