"use client";

import { useMemo } from "react";
import * as THREE from "three";

export function useGlassMaterial() {
  return useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#3d7a5c"),
        metalness: 0.02,
        roughness: 0.01,
        transmission: 0.97,
        thickness: 0.6,
        ior: 1.48,
        transparent: true,
        opacity: 0.88,
        envMapIntensity: 2.2,
        clearcoat: 1,
        clearcoatRoughness: 0.03,
        attenuationColor: new THREE.Color("#0E5A39"),
        attenuationDistance: 3,
      }),
    []
  );
}

export function useGoldMaterial() {
  return useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#C4A84E"),
        metalness: 0.98,
        roughness: 0.18,
        envMapIntensity: 2,
      }),
    []
  );
}

export function useLiquidMaterial() {
  return useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#0a4a32"),
        metalness: 0.15,
        roughness: 0.2,
        transmission: 0.15,
        transparent: true,
        opacity: 0.95,
      }),
    []
  );
}
