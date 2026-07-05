"use client";

import { useSceneState } from "@/components/providers/SceneProvider";

const CHAPTERS = [
  { key: "intro", label: "Crafted" },
  { key: "reveal", label: "Reveal" },
  { key: "open", label: "Uncork" },
  { key: "spray", label: "Release" },
  { key: "transform", label: "Transform" },
  { key: "exit", label: "Essence" },
] as const;

export function ScrollChapters() {
  const { phase, progress } = useSceneState();

  return (
    <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-5">
      {CHAPTERS.map((chapter) => {
        const active = phase === chapter.key;
        const passed =
          CHAPTERS.findIndex((c) => c.key === phase) >
          CHAPTERS.findIndex((c) => c.key === chapter.key);

        return (
          <div key={chapter.key} className="flex items-center gap-3 justify-end">
            <span
              className={`text-[10px] tracking-[0.25em] uppercase transition-all duration-700 ${
                active
                  ? "text-gold-soft opacity-100"
                  : passed
                    ? "text-cream/30 opacity-60"
                    : "text-cream/15 opacity-0"
              }`}
            >
              {chapter.label}
            </span>
            <div
              className={`rounded-full transition-all duration-700 ${
                active
                  ? "w-2 h-2 bg-gold-soft shadow-[0_0_12px_rgba(216,198,106,0.6)]"
                  : passed
                    ? "w-1.5 h-1.5 bg-gold/40"
                    : "w-1 h-1 bg-cream/10"
              }`}
            />
          </div>
        );
      })}

      <div className="mt-4 w-px h-16 bg-cream/10 ml-auto mr-[3px] relative overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-gold to-gold-soft transition-all duration-300"
          style={{ height: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
