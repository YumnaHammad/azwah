"use client";

import { useMemo } from "react";
import * as THREE from "three";

export function useGlassMaterial() {
  return useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#2a4a38"),
        metalness: 0.05,
        roughness: 0.02,
        transmission: 0.96,
        thickness: 0.8,
        ior: 1.52,
        transparent: true,
        opacity: 0.9,
        envMapIntensity: 2.4,
        clearcoat: 1,
        clearcoatRoughness: 0.02,
        attenuationColor: new THREE.Color("#3d2010"),
        attenuationDistance: 1.8,
      }),
    []
  );
}

export function useGoldMaterial() {
  return useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#C9A227"),
        metalness: 0.99,
        roughness: 0.12,
        envMapIntensity: 2.5,
      }),
    []
  );
}

/** Deep amber oud juice */
export function useOudLiquidMaterial() {
  return useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#4a2810"),
        metalness: 0.08,
        roughness: 0.15,
        transmission: 0.08,
        transparent: true,
        opacity: 0.92,
        emissive: new THREE.Color("#2a1508"),
        emissiveIntensity: 0.15,
      }),
    []
  );
}

export function useLiquidMaterial() {
  return useOudLiquidMaterial();
}
