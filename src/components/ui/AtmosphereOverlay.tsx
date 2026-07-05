"use client";

import { useSceneState } from "@/components/providers/SceneProvider";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export function AtmosphereOverlay() {
  const state = useSceneState();
  const bp = useBreakpoint();
  const spread = state.fragranceSpread;
  const warmth = state.environmentWarmth;

  const particleCount = bp === "mobile" ? 10 : bp === "tablet" ? 14 : 20;

  return (
    <div className="atmosphere-layer pointer-events-none" aria-hidden="true">
      <div className="atmosphere-warmth" style={{ opacity: warmth * 0.5 }} />
      <div className="atmosphere-spread" style={{ opacity: spread * 0.6 }} />
      {[...Array(particleCount)].map((_, i) => (
        <span
          key={i}
          className="atmosphere-particle"
          style={{
            left: `${(i * 17 + 5) % 95}%`,
            top: `${(i * 23 + 10) % 90}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${6 + (i % 5)}s`,
            opacity: 0.15 + state.particleOpacity * 0.4,
            transform: `scale(${0.5 + spread * 0.5})`,
          }}
        />
      ))}
    </div>
  );
}
