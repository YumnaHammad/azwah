"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneState } from "@/components/providers/SceneProvider";
import { BOTTLE_SPRAY_Y } from "@/lib/bottle-config";

const SPRAY_COUNT = 90;

export function SprayParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const state = useSceneState();

  const { positions, velocities, lifetimes } = useMemo(() => {
    const positions = new Float32Array(SPRAY_COUNT * 3);
    const velocities = new Float32Array(SPRAY_COUNT * 3);
    const lifetimes = new Float32Array(SPRAY_COUNT);

    for (let i = 0; i < SPRAY_COUNT; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = BOTTLE_SPRAY_Y;
      positions[i * 3 + 2] = 0;
      lifetimes[i] = Math.random();
    }

    return { positions, velocities, lifetimes };
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    const intensity = state.sprayIntensity;
    const pos = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const mat = pointsRef.current.material as THREE.PointsMaterial;

    mat.opacity = intensity * 0.85;
    pointsRef.current.visible = intensity > 0.01;

    if (intensity < 0.01) return;

    /* Fixed at pump — does not follow cap */
    const originY = BOTTLE_SPRAY_Y - state.atomizerPress * 0.02;

    for (let i = 0; i < SPRAY_COUNT; i++) {
      lifetimes[i] += delta * (0.6 + Math.random() * 0.5);

      if (lifetimes[i] > 1) {
        lifetimes[i] = 0;
        pos.array[i * 3] = (Math.random() - 0.5) * 0.06;
        pos.array[i * 3 + 1] = originY;
        pos.array[i * 3 + 2] = (Math.random() - 0.5) * 0.06;

        const angle = (Math.random() - 0.5) * 1.2;
        const force = 0.55 + Math.random() * 0.85;
        velocities[i * 3] = Math.sin(angle) * force * intensity;
        velocities[i * 3 + 1] = (0.7 + Math.random() * 1.1) * intensity;
        velocities[i * 3 + 2] = (0.35 + Math.random() * 0.7) * intensity;
      }

      pos.array[i * 3] += velocities[i * 3] * delta * 2.5;
      pos.array[i * 3 + 1] += velocities[i * 3 + 1] * delta * 2;
      pos.array[i * 3 + 2] += velocities[i * 3 + 2] * delta * 2.5;

      velocities[i * 3] *= 1 - delta * 0.2;
      velocities[i * 3 + 1] -= delta * 0.12;
      velocities[i * 3 + 2] *= 1 + delta * 0.08;
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
        size={0.065}
        transparent
        opacity={0}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
