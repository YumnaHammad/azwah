"use client";

import { useSceneState } from "@/components/providers/SceneProvider";

export function SceneEnvironment() {
  const state = useSceneState();

  return (
    <>
      <fog attach="fog" args={["#041f16", 8, 18]} />

      <ambientLight intensity={0.3 + state.ambientIntensity * 0.15} color="#FAFAFA" />

      <spotLight
        position={[0, 7, 1]}
        angle={0.28}
        penumbra={1}
        intensity={2 + state.goldIntensity * 2}
        color="#EDE0A6"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      <spotLight
        position={[0, 4, -4]}
        angle={0.45}
        penumbra={0.9}
        intensity={0.8 + state.goldIntensity}
        color="#D8C66A"
      />

      <pointLight
        position={[3, 1.5, 3]}
        intensity={0.25 + state.ambientIntensity * 0.3}
        color="#0E5A39"
      />

      <pointLight
        position={[-2.5, 2, 2]}
        intensity={0.2 + state.goldIntensity * 0.5}
        color="#B89A3E"
      />

      <pointLight
        position={[0, 2.5, 4]}
        intensity={state.sprayIntensity * 1.2}
        color="#D8C66A"
      />
    </>
  );
}
