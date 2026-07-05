"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneState } from "@/components/providers/SceneProvider";

const MIST_COUNT = 50;

export function MistLayer() {
  const pointsRef = useRef<THREE.Points>(null);
  const state = useSceneState();

  const positions = useMemo(() => {
    const arr = new Float32Array(MIST_COUNT * 3);
    for (let i = 0; i < MIST_COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 1] = 1 + Math.random() * 3;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    const intensity = state.mistIntensity;
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = intensity * 0.45 * state.bottleOpacity;
    pointsRef.current.visible = intensity > 0.05;

    const pos = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;

    for (let i = 0; i < MIST_COUNT; i++) {
      pos.array[i * 3] += Math.sin(i + performance.now() * 0.0004) * delta * 0.08;
      pos.array[i * 3 + 1] += delta * 0.12;
      pos.array[i * 3 + 2] += Math.cos(i + performance.now() * 0.0003) * delta * 0.06;

      if (pos.array[i * 3 + 1] > 5) {
        pos.array[i * 3 + 1] = 1 + Math.random();
      }
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} visible={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#D8C66A"
        size={0.12}
        transparent
        opacity={0}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
