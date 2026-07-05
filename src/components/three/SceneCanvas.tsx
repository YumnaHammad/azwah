"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { Vector3 } from "three";
import { useScene, useSceneState } from "@/components/providers/SceneProvider";
import { BottleAssembly } from "./BottleAssembly";
import { AmbientParticles } from "./AmbientParticles";
import { SprayParticles } from "./SprayParticles";
import { MistLayer } from "./MistLayer";
import { LightRays } from "./LightRays";
import { SceneEnvironment } from "./SceneEnvironment";
import { BottleHalo } from "./BottleHalo";
import { BoutiqueScene } from "./BoutiqueScene";

function BottleCamera() {
  const { camera } = useThree();
  const state = useSceneState();
  const target = useRef(new Vector3(0, 0.52, 0));
  const currentPos = useRef(new Vector3(0, 0, 8.6));

  useFrame((_, delta) => {
    /* Pull back & tilt up when cap rises so finial is never clipped */
    const capOffset = state.capLift;
    const desiredZ = state.cameraZ + capOffset * 1.1;
    const desiredY = state.cameraY - capOffset * 0.05;

    target.current.y = 0.52 + capOffset * 0.18;
    currentPos.current.z += (desiredZ - currentPos.current.z) * delta * 2.5;
    currentPos.current.y += (desiredY - currentPos.current.y) * delta * 2.5;

    const t = performance.now();
    camera.position.set(
      Math.sin(t * 0.00025) * 0.02,
      currentPos.current.y + Math.cos(t * 0.00035) * 0.012,
      currentPos.current.z
    );
    camera.lookAt(target.current);
  });

  return null;
}

function BoutiqueCamera() {
  const { camera } = useThree();
  const { boutiqueProgress } = useScene();
  const current = useRef(new Vector3(0, 1.6, 12));

  useFrame((_, delta) => {
    const p = boutiqueProgress;
    const targetZ = 12 - p * 11;
    const targetY = 1.6 - p * 0.3;
    current.current.z += (targetZ - current.current.z) * delta * 1.5;
    current.current.y += (targetY - current.current.y) * delta * 1.5;
    camera.position.copy(current.current);
    camera.lookAt(0, 1.2, -4);
  });

  return null;
}

function SceneRouter() {
  const { viewMode, boutiqueProgress } = useScene();
  const state = useSceneState();
  const bottleAlpha = viewMode === "boutique" ? Math.max(0, 1 - boutiqueProgress * 2) : state.bottleOpacity;
  const showBottle = viewMode === "bottle" || boutiqueProgress < 0.5;

  return (
    <>
      {viewMode === "bottle" && <BottleCamera />}
      {viewMode === "boutique" && <BoutiqueCamera />}

      <SceneEnvironment warmth={state.environmentWarmth} mode={viewMode} />

      {showBottle && (
        <group visible={bottleAlpha > 0.01}>
          <Environment preset="city" environmentIntensity={0.35 + state.goldIntensity * 0.15} />
          <BottleHalo />
          <BottleAssembly />
          <ContactShadows
            position={[0, -0.38, 0]}
            opacity={0.4 * bottleAlpha}
            scale={6}
            blur={2.8}
            far={3.5}
          />
          <AmbientParticles />
          <SprayParticles />
          <MistLayer />
          <LightRays />
        </group>
      )}

      {(viewMode === "boutique" || boutiqueProgress > 0) && <BoutiqueScene />}
    </>
  );
}

export function SceneCanvas({ compact = false }: { compact?: boolean }) {
  const state = useSceneState();
  const { viewMode, boutiqueProgress } = useScene();

  const opacity =
    viewMode === "boutique"
      ? 0.4 + boutiqueProgress * 0.6
      : state.canvasOpacity;

  const warmth = state.environmentWarmth;

  return (
    <div className="canvas-container" style={{ opacity }}>
      <div
        className="hero-bg-gradient"
        style={{
          filter: `saturate(${1 + warmth * 0.3}) brightness(${1 + warmth * 0.15})`,
        }}
      />
      <div className="hero-bg-fog" />
      <div
        className="canvas-glow"
        style={{ opacity: 0.35 + state.goldIntensity * 0.4 + warmth * 0.2 }}
      />
      <div className="canvas-vignette" />
      <Canvas
        dpr={compact ? [1, 1.25] : [1, 1.5]}
        camera={{ position: [0, 0, compact ? 9.4 : 8.6], fov: compact ? 32 : 28 }}
        gl={{ antialias: !compact, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <SceneRouter />
        </Suspense>
      </Canvas>
    </div>
  );
}
