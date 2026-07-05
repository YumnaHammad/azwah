"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneState } from "@/components/providers/SceneProvider";
import {
  useGlassMaterial,
  useGoldMaterial,
  useLiquidMaterial,
} from "@/lib/materials";

export function PerfumeBottle() {
  const groupRef = useRef<THREE.Group>(null);
  const capRef = useRef<THREE.Group>(null);
  const state = useSceneState();

  const glassMat = useGlassMaterial();
  const goldMat = useGoldMaterial();
  const liquidMat = useLiquidMaterial();

  const bodyGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.15, 0, 0.5, 0.02, 0.62, 0.05);
    shape.lineTo(0.68, 0.35);
    shape.bezierCurveTo(0.7, 0.8, 0.62, 1.6, 0.58, 2.1);
    shape.bezierCurveTo(0.52, 2.45, 0.42, 2.65, 0.35, 2.72);
    shape.lineTo(-0.35, 2.72);
    shape.bezierCurveTo(-0.42, 2.65, -0.52, 2.45, -0.58, 2.1);
    shape.bezierCurveTo(-0.62, 1.6, -0.7, 0.8, -0.68, 0.35);
    shape.lineTo(-0.62, 0.05);
    shape.bezierCurveTo(-0.5, 0.02, -0.15, 0, 0, 0);

    return new THREE.LatheGeometry(shape.getPoints(48), 48);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        state.bottleRotation + performance.now() * 0.00006;
    }

    if (capRef.current) {
      const lift = state.capLift * 0.65;
      const rotation = state.capLift * 0.35;
      capRef.current.position.y = 2.78 + lift;
      capRef.current.rotation.y = rotation;
      capRef.current.rotation.z = state.capLift * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      <mesh geometry={bodyGeometry} material={glassMat} castShadow receiveShadow />

      <mesh position={[0, 0.85, 0]} scale={[0.82, 0.78, 0.82]}>
        <cylinderGeometry args={[0.46, 0.5, 1.45, 48]} />
        <primitive object={liquidMat} attach="material" />
      </mesh>

      <mesh position={[0, 2.55, 0]}>
        <cylinderGeometry args={[0.2, 0.24, 0.14, 48]} />
        <primitive object={goldMat} attach="material" />
      </mesh>

      <group ref={capRef} position={[0, 2.78, 0]}>
        <mesh>
          <cylinderGeometry args={[0.26, 0.28, 0.38, 48]} />
          <primitive object={goldMat} attach="material" />
        </mesh>
        <mesh position={[0, 0.24, 0]}>
          <sphereGeometry
            args={[0.26, 48, 16, 0, Math.PI * 2, 0, Math.PI / 2]}
          />
          <primitive object={goldMat} attach="material" />
        </mesh>
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.05, 0.07, 0.12, 16]} />
          <meshStandardMaterial color="#c9c9c9" metalness={0.95} roughness={0.15} />
        </mesh>
      </group>

      <mesh position={[0, 1.25, 0.54]}>
        <boxGeometry args={[0.75, 0.55, 0.015]} />
        <meshStandardMaterial
          color="#B89A3E"
          metalness={0.85}
          roughness={0.25}
          transparent
          opacity={0.95}
        />
      </mesh>

      <mesh position={[0, 1.25, 0.555]}>
        <planeGeometry args={[0.5, 0.08]} />
        <meshStandardMaterial
          color="#FAFAFA"
          metalness={0.3}
          roughness={0.5}
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}
