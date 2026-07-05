"use client";

import { useMemo } from "react";
import * as THREE from "three";

export function Pedestal() {
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#062a1e"),
        metalness: 0.55,
        roughness: 0.4,
      }),
    []
  );

  return (
    <group position={[0, -0.08, 0]} scale={0.72}>
      <mesh position={[0, -0.12, 0]} receiveShadow>
        <cylinderGeometry args={[1.0, 1.08, 0.2, 64]} />
        <primitive object={material} attach="material" />
      </mesh>

      <mesh position={[0, -0.01, 0]} receiveShadow>
        <cylinderGeometry args={[0.88, 0.92, 0.05, 64]} />
        <meshStandardMaterial
          color="#0E5A39"
          metalness={0.5}
          roughness={0.45}
        />
      </mesh>

      {/* Subtle base accent — stays below bottle, never halos it */}
      <mesh position={[0, -0.14, 0]}>
        <torusGeometry args={[1.02, 0.008, 8, 64]} />
        <meshStandardMaterial
          color="#B89A3E"
          metalness={0.9}
          roughness={0.35}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}
