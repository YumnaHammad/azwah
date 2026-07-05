"use client";

import { motion } from "framer-motion";
import { useSceneState } from "@/components/providers/SceneProvider";

export function MobileHeroVisual() {
  const state = useSceneState();

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none md:hidden transition-opacity duration-700"
      style={{ opacity: state.canvasOpacity }}
    >
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 42%, #0E5A39 0%, #083D2B 50%, #062a1e 100%)`,
        }}
      />

      {[...Array(16)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gold-soft/25"
          style={{
            left: `${8 + ((i * 13) % 84)}%`,
            top: `${12 + ((i * 17) % 76)}%`,
          }}
          animate={{ y: [0, -18, 0], opacity: [0.15, 0.5, 0.15] }}
          transition={{
            duration: 5 + i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.25,
          }}
        />
      ))}

      <div className="absolute top-[30%] left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            opacity: state.bottleOpacity,
            scale: state.bottleScale,
            y: state.bottleY * -30,
          }}
          className="relative"
        >
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-36 h-4 rounded-full bg-black/20 blur-md" />
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-28 h-2 rounded-full bg-primary-dark border border-gold/15" />

          <div className="relative w-24 h-52 mx-auto">
            <div className="absolute inset-x-0 bottom-0 top-10 rounded-xl bg-gradient-to-b from-white/8 to-white/4 border border-white/10 backdrop-blur-md shadow-[0_0_40px_rgba(216,198,106,0.08)]" />
            <div className="absolute inset-x-2 top-10 h-28 rounded-lg bg-gradient-to-b from-primary/50 to-primary-dark/70" />
            <div className="absolute inset-x-3 top-20 h-12 border border-gold/25 rounded-md bg-gold/5" />

            <motion.div
              className="absolute inset-x-2 top-0"
              style={{ y: state.capLift * -28, rotate: state.capLift * 12 }}
            >
              <div className="h-11 rounded-t-2xl bg-gradient-to-b from-gold to-gold-soft shadow-lg shadow-gold/25" />
              <div className="mx-auto w-3 h-2 bg-neutral-400 rounded-sm mt-[-2px]" />
            </motion.div>

            <div className="absolute inset-x-2 top-9 h-2.5 bg-gold/50 rounded-full" />
          </div>

          {state.sprayIntensity > 0.05 && (
            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-gold-soft/20 blur-md"
                  style={{ width: 12 + i * 4, height: 12 + i * 4, left: (i - 4) * 10 }}
                  animate={{
                    y: [-8, -50 - i * 8],
                    x: [(i - 4) * 4, (i - 4) * 18],
                    opacity: [state.sprayIntensity * 0.6, 0],
                    scale: [0.6, 1.4],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          )}

          <div
            className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, rgba(216,198,106,${0.08 + state.goldIntensity * 0.12}) 0%, transparent 70%)`,
            }}
          />
        </motion.div>
      </div>

      {state.mistIntensity > 0.1 && (
        <div
          className="absolute inset-0 bg-gradient-to-t from-gold/[0.06] via-transparent to-gold/[0.04]"
          style={{ opacity: state.mistIntensity * state.bottleOpacity }}
        />
      )}
    </div>
  );
}
