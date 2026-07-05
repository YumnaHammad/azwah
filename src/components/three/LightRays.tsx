"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneState } from "@/components/providers/SceneProvider";

export function LightRays() {
  const groupRef = useRef<THREE.Group>(null);
  const state = useSceneState();

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02;
    }
  });

  const opacity = 0.03 + state.goldIntensity * 0.04;

  return (
    <group ref={groupRef} position={[0, 3, -2]}>
      {[...Array(5)].map((_, i) => (
        <mesh
          key={i}
          rotation={[0, (i * Math.PI) / 2.5, 0.3]}
          position={[0, 0, 0]}
        >
          <planeGeometry args={[0.3, 8]} />
          <meshBasicMaterial
            color="#D8C66A"
            transparent
            opacity={opacity}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}
