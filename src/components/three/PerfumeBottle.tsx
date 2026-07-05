"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneState } from "@/components/providers/SceneProvider";
import {
  useGlassMaterial,
  useGoldMaterial,
  useOudLiquidMaterial,
} from "@/lib/materials";

/** Luxury Oud bottle — fixed neck + pump, cap lifts separately */
export function PerfumeBottle() {
  const groupRef = useRef<THREE.Group>(null);
  const capRef = useRef<THREE.Group>(null);
  const atomizerRef = useRef<THREE.Group>(null);
  const tubeRef = useRef<THREE.Mesh>(null);
  const state = useSceneState();

  const glassMat = useGlassMaterial();
  const goldMat = useGoldMaterial();
  const oudMat = useOudLiquidMaterial();

  const tubeMat = useMemo(() => {
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#f0ece4"),
      metalness: 0.05,
      roughness: 0.08,
      transmission: 0.75,
      thickness: 0.12,
      transparent: true,
      opacity: 0.55,
      ior: 1.42,
    });
    mat.userData.skipFade = true;
    return mat;
  }, []);

  const pumpMat = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#e8e4dc"),
      metalness: 0.95,
      roughness: 0.1,
    });
    mat.userData.skipFade = true;
    return mat;
  }, []);

  const labelTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = "#F5F5F0";
    ctx.fillRect(0, 0, 512, 128);

    ctx.strokeStyle = "rgba(184, 154, 62, 0.25)";
    ctx.lineWidth = 2;
    ctx.strokeRect(6, 6, 500, 116);

    ctx.fillStyle = "#083D2B";
    ctx.font = "600 56px Georgia, 'Times New Roman', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("AZWAH", 256, 66);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    return texture;
  }, []);

  const labelMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: labelTexture ?? undefined,
      color: labelTexture ? "#ffffff" : "#FAFAFA",
      metalness: 0.2,
      roughness: 0.35,
      transparent: true,
      opacity: 0.95,
    });
  }, [labelTexture]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        state.bottleRotation + performance.now() * 0.00005;
    }

    if (capRef.current) {
      const unlock = state.capUnlock * Math.PI * 0.3;
      const lift = state.capLift * 0.55;
      capRef.current.rotation.y = unlock;
      capRef.current.position.y = 1.58 + lift;
      capRef.current.position.x = state.capLift * 0.12;
      capRef.current.rotation.z = state.capLift * 0.05;
    }

    if (atomizerRef.current) {
      atomizerRef.current.position.y = -state.atomizerPress * 0.035;
    }

    if (tubeRef.current) {
      tubeMat.opacity = 0.2 + state.dipTubeVisible * 0.75;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.05, 0]}>
      {/* Glass body */}
      <mesh position={[0, 0.69, 0]} castShadow receiveShadow material={glassMat}>
        <boxGeometry args={[0.68, 1.38, 0.48]} />
      </mesh>

      {/* Oud liquid */}
      <mesh position={[0, 0.58, 0]} material={oudMat}>
        <boxGeometry args={[0.52, 0.88, 0.34]} />
      </mesh>

      {/* Gold base plate */}
      <mesh position={[0, 0.04, 0]} material={goldMat}>
        <boxGeometry args={[0.7, 0.05, 0.5]} />
      </mesh>

      {/* Gold shoulder band */}
      <mesh position={[0, 1.22, 0]} material={goldMat}>
        <boxGeometry args={[0.62, 0.04, 0.44]} />
      </mesh>

      {/* Front label with AZWAH branding */}
      <mesh position={[0, 0.72, 0.248]} material={goldMat}>
        <boxGeometry args={[0.42, 0.32, 0.012]} />
      </mesh>
      <mesh position={[0, 0.72, 0.256]} material={labelMat}>
        <planeGeometry args={[0.28, 0.07]} />
      </mesh>

      {/* Dip tube */}
      <mesh
        ref={tubeRef}
        position={[0.04, 0.72, 0]}
        rotation={[0, 0, 0.03]}
        material={tubeMat}
      >
        <cylinderGeometry args={[0.012, 0.016, 1.15, 10]} />
      </mesh>

      {/* Fixed neck + pump */}
      <group position={[0, 1.38, 0]}>
        <mesh position={[0, 0.04, 0]} material={goldMat}>
          <cylinderGeometry args={[0.14, 0.18, 0.1, 32]} />
        </mesh>

        <group ref={atomizerRef} position={[0, 0.12, 0]}>
          <mesh material={pumpMat}>
            <cylinderGeometry args={[0.09, 0.11, 0.08, 24]} />
          </mesh>
          <mesh position={[0, 0.06, 0]}>
            <cylinderGeometry args={[0.04, 0.05, 0.05, 16]} />
            <meshStandardMaterial color="#d4cfc4" metalness={0.98} roughness={0.06} />
          </mesh>
        </group>
      </group>

      {/* Ornate cap — lifts off */}
      <group ref={capRef} position={[0, 1.58, 0]}>
        <mesh material={goldMat}>
          <cylinderGeometry args={[0.2, 0.22, 0.22, 32]} />
        </mesh>
        <mesh position={[0, 0.16, 0]} material={goldMat}>
          <sphereGeometry
            args={[0.2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]}
          />
        </mesh>
        <mesh position={[0, 0.32, 0]} material={goldMat}>
          <sphereGeometry args={[0.06, 16, 16]} />
        </mesh>
      </group>
    </group>
  );
}
