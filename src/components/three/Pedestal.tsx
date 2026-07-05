"use client";

import { useMemo } from "react";
import * as THREE from "three";

export function Pedestal() {
  const marble = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0a0a0a"),
        metalness: 0.15,
        roughness: 0.35,
      }),
    []
  );

  const marbleVein = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1a1a1a"),
        metalness: 0.25,
        roughness: 0.3,
        transparent: true,
        opacity: 0.6,
      }),
    []
  );

  const goldPlatform = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#C4A84E"),
        metalness: 0.98,
        roughness: 0.12,
        envMapIntensity: 2.5,
      }),
    []
  );

  return (
    <group position={[0, -0.1, 0]} scale={0.72}>
      {/* Black marble base */}
      <mesh position={[0, -0.18, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[1.15, 1.22, 0.28, 64]} />
        <primitive object={marble} attach="material" />
      </mesh>

      {/* Marble vein accent */}
      <mesh position={[0, -0.06, 0]} rotation={[0, 0.4, 0]}>
        <boxGeometry args={[1.3, 0.02, 0.15]} />
        <primitive object={marbleVein} attach="material" />
      </mesh>

      {/* Gold circular platform */}
      <mesh position={[0, -0.04, 0]} receiveShadow>
        <cylinderGeometry args={[0.92, 0.95, 0.04, 64]} />
        <primitive object={goldPlatform} attach="material" />
      </mesh>

      <mesh position={[0, -0.015, 0]}>
        <torusGeometry args={[0.9, 0.006, 8, 64]} />
        <meshStandardMaterial
          color="#D8C66A"
          metalness={1}
          roughness={0.1}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
}
