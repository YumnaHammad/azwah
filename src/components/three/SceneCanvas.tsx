"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { Vector3 } from "three";
import { useSceneState } from "@/components/providers/SceneProvider";
import { BottleAssembly } from "./BottleAssembly";
import { AmbientParticles } from "./AmbientParticles";
import { SprayParticles } from "./SprayParticles";
import { MistLayer } from "./MistLayer";
import { LightRays } from "./LightRays";
import { SceneEnvironment } from "./SceneEnvironment";

function CameraController() {
  const { camera } = useThree();
  const state = useSceneState();
  const target = useRef(new Vector3(0, 0.45, 0));
  const currentPos = useRef(new Vector3(0, 0.05, 9.2));

  useFrame((_, delta) => {
    const capOffset = state.capLift * 0.35;
    const desiredZ = state.cameraZ + capOffset * 0.6;
    const desiredY = state.cameraY + capOffset * 0.12;

    target.current.y = 0.45 + capOffset * 0.2;
    currentPos.current.z += (desiredZ - currentPos.current.z) * delta * 2.5;
    currentPos.current.y += (desiredY - currentPos.current.y) * delta * 2.5;

    const floatX = Math.sin(performance.now() * 0.00025) * 0.025;
    const floatY = Math.cos(performance.now() * 0.00035) * 0.015;

    camera.position.set(
      floatX,
      currentPos.current.y + floatY,
      currentPos.current.z
    );
    camera.lookAt(target.current);
  });

  return null;
}

function SceneContent() {
  const state = useSceneState();

  return (
    <>
      <CameraController />
      <SceneEnvironment />
      <Environment preset="city" environmentIntensity={0.3 + state.goldIntensity * 0.15} />
      <BottleAssembly />
      <ContactShadows
        position={[0, -0.38, 0]}
        opacity={0.35 * state.bottleOpacity}
        scale={6}
        blur={2.8}
        far={3.5}
      />
      <AmbientParticles />
      <SprayParticles />
      <MistLayer />
      <LightRays />
    </>
  );
}

export function SceneCanvas() {
  const state = useSceneState();

  return (
    <div className="canvas-container" style={{ opacity: state.canvasOpacity }}>
      <div className="hero-bg-gradient" />
      <div className="hero-bg-fog" />
      <div
        className="canvas-glow"
        style={{ opacity: 0.35 + state.goldIntensity * 0.35 }}
      />
      <div className="canvas-vignette" />
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.05, 9.2], fov: 30 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
        }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
