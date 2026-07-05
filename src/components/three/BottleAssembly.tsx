"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneState } from "@/components/providers/SceneProvider";
import { PerfumeBottle } from "./PerfumeBottle";
import { Pedestal } from "./Pedestal";

const BASE_SCALE = 0.74;

export function BottleAssembly() {
  const groupRef = useRef<THREE.Group>(null);
  const floatRef = useRef(0);
  const state = useSceneState();

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    floatRef.current += delta;
    const floatY = Math.sin(floatRef.current * 0.8) * 0.025 * (1 + state.bottleGlow * 0.5);

    const scale = BASE_SCALE * state.bottleScale;
    groupRef.current.scale.setScalar(scale);
    groupRef.current.position.y = -0.12 + state.bottleY + floatY + state.bottleFloat;
    groupRef.current.visible = state.bottleOpacity > 0.01;

    groupRef.current.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      materials.forEach((mat) => {
        if (!("opacity" in mat)) return;
        const meshMat = mat as THREE.MeshStandardMaterial;
        if (meshMat.userData?.skipFade) return;
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
