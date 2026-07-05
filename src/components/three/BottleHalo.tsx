"use client";

import * as THREE from "three";
import { useSceneState } from "@/components/providers/SceneProvider";

export function BottleHalo() {
  const state = useSceneState();
  const opacity = 0.15 + state.bottleGlow * 0.35 + state.fragranceSpread * 0.2;

  if (state.bottleOpacity < 0.05) return null;

  return (
    <group position={[0, 0.95, -0.6]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 1.4, 64]} />
        <meshBasicMaterial
          color="#D8C66A"
          transparent
          opacity={opacity * 0.25}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <pointLight
        position={[0, 0.5, 1]}
        intensity={state.bottleGlow * 1.5 + state.goldIntensity * 0.5}
        color="#EDE0A6"
        distance={6}
      />
    </group>
  );
}
