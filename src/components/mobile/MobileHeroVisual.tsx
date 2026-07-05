"use client";

import { motion } from "framer-motion";
import { useSceneState } from "@/components/providers/SceneProvider";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export function MobileHeroVisual() {
  const state = useSceneState();
  const bp = useBreakpoint();
  const scaleBoost = bp === "mobile" ? 0.92 : 1;

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none transition-opacity duration-700"
      style={{ opacity: state.canvasOpacity }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 90% 70% at 50% 40%, #0E5A39 0%, #083D2B 45%, #062a1e 100%)`,
        }}
      />

      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-gold-soft/30"
          style={{
            left: `${8 + ((i * 13) % 84)}%`,
            top: `${12 + ((i * 17) % 76)}%`,
          }}
          animate={{ y: [0, -14, 0], opacity: [0.15, 0.45, 0.15] }}
          transition={{
            duration: 5 + i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.25,
          }}
        />
      ))}

      {/* Bottle — centered in middle zone between headline and body */}
      <div className="absolute top-[38%] sm:top-[36%] left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            opacity: state.bottleOpacity,
            scale: state.bottleScale * scaleBoost,
          }}
          className="relative"
        >
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-28 sm:w-36 h-3 rounded-full bg-black/25 blur-md" />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 sm:w-28 h-1.5 rounded-full bg-primary-dark border border-gold/15" />

          <div className="relative w-[72px] h-[140px] sm:w-[88px] sm:h-[168px] mx-auto">
            <div className="absolute inset-x-0.5 bottom-0 top-7 sm:top-8 rounded-lg bg-gradient-to-b from-white/[0.08] to-white/[0.03] border border-white/10 backdrop-blur-md shadow-[0_0_32px_rgba(216,198,106,0.1)]" />
            <div className="absolute inset-x-2.5 sm:inset-x-3 top-9 sm:top-10 bottom-3 rounded-md bg-gradient-to-b from-[#4a2810]/85 to-[#2a1508]/90" />
            <div className="absolute inset-x-3 sm:inset-x-4 top-[60px] sm:top-[72px] h-8 sm:h-10 border border-gold/30 rounded-sm bg-gold/5" />
            <div className="absolute inset-x-1.5 bottom-0.5 h-1 sm:h-1.5 bg-gold/40 rounded-sm" />

            <div className="absolute inset-x-[28px] sm:inset-x-[34px] top-[44px] sm:top-[52px] h-2.5 sm:h-3 bg-neutral-300/80 rounded-sm z-10" />

            <motion.div
              className="absolute inset-x-2 sm:inset-x-3 top-0 z-20"
              style={{
                y: state.capLift * -26,
                x: state.capLift * 6,
                rotate: state.capUnlock * 40,
              }}
            >
              <div className="h-8 sm:h-10 rounded-t-lg sm:rounded-t-xl bg-gradient-to-b from-gold to-gold-soft shadow-lg shadow-gold/20" />
              <div className="mx-auto w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-gold-soft mt-0.5" />
            </motion.div>

            <div className="absolute inset-x-1.5 sm:inset-x-2 top-[38px] sm:top-[46px] h-1.5 sm:h-2 bg-gold/50 rounded-full" />
          </div>

          {state.sprayIntensity > 0.05 && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-gold-soft/25 blur-sm"
                  style={{ width: 10 + i * 3, height: 10 + i * 3, left: (i - 3) * 8 }}
                  animate={{
                    y: [-6, -40 - i * 6],
                    x: [(i - 3) * 3, (i - 3) * 14],
                    opacity: [state.sprayIntensity * 0.5, 0],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    delay: i * 0.12,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          )}

          <div
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-36 sm:w-48 h-36 sm:h-48 rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, rgba(216,198,106,${0.06 + state.goldIntensity * 0.1}) 0%, transparent 70%)`,
            }}
          />
        </motion.div>
      </div>

      {state.mistIntensity > 0.1 && (
        <div
          className="absolute inset-0 bg-gradient-to-t from-gold/[0.05] via-transparent to-gold/[0.03]"
          style={{ opacity: state.mistIntensity * state.bottleOpacity }}
        />
      )}
    </div>
  );
}
