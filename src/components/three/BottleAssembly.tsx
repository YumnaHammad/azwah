"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneState } from "@/components/providers/SceneProvider";
import { PerfumeBottle } from "./PerfumeBottle";
import { Pedestal } from "./Pedestal";

const BASE_SCALE = 0.68;

export function BottleAssembly() {
  const groupRef = useRef<THREE.Group>(null);
  const state = useSceneState();

  useFrame(() => {
    if (!groupRef.current) return;

    const scale = BASE_SCALE * state.bottleScale;
    groupRef.current.scale.setScalar(scale);
    groupRef.current.position.y = -0.15 + state.bottleY;
    groupRef.current.visible = state.bottleOpacity > 0.01;

    groupRef.current.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      materials.forEach((mat) => {
        if (!("opacity" in mat) || !("transparent" in mat)) return;
        const meshMat = mat as THREE.MeshStandardMaterial;
        meshMat.transparent = true;
        meshMat.opacity = state.bottleOpacity;
      });
    });
  });

  return (
    <group ref={groupRef}>
      <Pedestal />
      <PerfumeBottle />
    </group>
  );
}
