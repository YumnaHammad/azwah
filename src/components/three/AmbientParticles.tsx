"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneState } from "@/components/providers/SceneProvider";

const COUNT = 80;

export function AmbientParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const state = useSceneState();

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = Math.random() * 5 - 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      speeds[i] = 0.2 + Math.random() * 0.5;
    }

    return { positions, speeds };
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    const pos = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;

    for (let i = 0; i < COUNT; i++) {
      pos.array[i * 3 + 1] += speeds[i] * delta * 0.15;
      if (pos.array[i * 3 + 1] > 4) {
        pos.array[i * 3 + 1] = -1;
      }
    }
    pos.needsUpdate = true;

    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = state.particleOpacity * 0.6;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#D8C66A"
        size={0.025}
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
