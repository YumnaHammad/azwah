"use client";

import { useSceneState } from "@/components/providers/SceneProvider";
import type { ViewMode } from "@/types/scene";

export function SceneEnvironment({
  warmth = 0,
  mode = "bottle",
}: {
  warmth?: number;
  mode?: ViewMode;
}) {
  const state = useSceneState();
  const w = warmth || state.environmentWarmth;
  const bgColor = mode === "boutique" ? "#0a0806" : "#041f16";
  const fogColor =
    mode === "boutique"
      ? "#0a0806"
      : `rgb(${4 + w * 20}, ${31 + w * 15}, ${22 + w * 5})`;

  return (
    <>
      <fog attach="fog" args={[fogColor, 8, 18]} />
      <color attach="background" args={[bgColor]} />

      <ambientLight
        intensity={0.28 + state.ambientIntensity * 0.15 + w * 0.1}
        color={w > 0.3 ? "#FFF5E0" : "#FAFAFA"}
      />

      {mode === "bottle" && (
        <>
          <spotLight
            position={[0, 7, 1]}
            angle={0.28}
            penumbra={1}
            intensity={2 + state.goldIntensity * 2.5 + state.bottleGlow * 1.5}
            color="#EDE0A6"
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <spotLight
            position={[0, 4, -4]}
            angle={0.5}
            penumbra={0.9}
            intensity={0.6 + w * 0.8}
            color="#D8C66A"
          />
          <pointLight
            position={[3, 1.5, 3]}
            intensity={0.25 + w * 0.4}
            color="#0E5A39"
          />
          <pointLight
            position={[-2.5, 2, 2]}
            intensity={0.2 + state.goldIntensity * 0.6}
            color="#B89A3E"
          />
          <pointLight
            position={[0, 2.5, 4]}
            intensity={state.sprayIntensity * 1.5 + w * 0.3}
            color="#D8C66A"
          />
        </>
      )}
    </>
  );
}
