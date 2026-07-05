"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScene } from "@/components/providers/SceneProvider";

export function BoutiqueScene() {
  const groupRef = useRef<THREE.Group>(null);
  const { boutiqueProgress } = useScene();

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.visible = boutiqueProgress > 0.01;
  });

  const p = boutiqueProgress;
  const doorOpen = Math.min(1, p * 2.5) * 1.2;

  return (
    <group ref={groupRef} visible={false}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
      </mesh>

      <mesh position={[0, 2.5, -4]}>
        <boxGeometry args={[8, 6, 0.3]} />
        <meshStandardMaterial color="#141414" metalness={0.2} roughness={0.6} />
      </mesh>

      <mesh position={[0, 4.2, -3.82]}>
        <boxGeometry args={[3, 0.4, 0.05]} />
        <meshStandardMaterial
          color="#B89A3E"
          metalness={0.9}
          roughness={0.2}
          emissive="#B89A3E"
          emissiveIntensity={0.3 + p * 0.4}
        />
      </mesh>

      <mesh
        position={[-doorOpen * 0.5, 1.2, -3.7]}
        rotation={[0, -doorOpen * 0.6, 0]}
      >
        <boxGeometry args={[1, 2.4, 0.08]} />
        <meshStandardMaterial color="#1a1510" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh
        position={[doorOpen * 0.5, 1.2, -3.7]}
        rotation={[0, doorOpen * 0.6, 0]}
      >
        <boxGeometry args={[1, 2.4, 0.08]} />
        <meshStandardMaterial color="#1a1510" metalness={0.6} roughness={0.3} />
      </mesh>

      <group position={[0, 0, -1]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -2]}>
          <planeGeometry args={[12, 12]} />
          <meshStandardMaterial color="#2a1f14" roughness={0.7} />
        </mesh>

        {[-2.5, 0, 2.5].map((x, i) => (
          <group key={i} position={[x, 1.2, -3]}>
            <mesh>
              <boxGeometry args={[1.8, 2.2, 0.4]} />
              <meshStandardMaterial color="#3d2a1a" roughness={0.8} />
            </mesh>
            {[0.4, 1.0, 1.6].map((y, j) => (
              <mesh key={j} position={[0, y - 0.8, 0.15]}>
                <boxGeometry args={[1.6, 0.04, 0.3]} />
                <meshStandardMaterial color="#4a3525" roughness={0.6} />
              </mesh>
            ))}
            {[0.5, 1.1, 1.7].map((y, j) => (
              <mesh key={j} position={[0, y - 0.75, 0.35]}>
                <cylinderGeometry args={[0.06, 0.07, 0.2, 8]} />
                <meshStandardMaterial
                  color="#B89A3E"
                  metalness={0.8}
                  roughness={0.2}
                  emissive="#B89A3E"
                  emissiveIntensity={0.1 + p * 0.2}
                />
              </mesh>
            ))}
          </group>
        ))}

        <mesh position={[0, 2, -5.5]}>
          <boxGeometry args={[6, 0.08, 0.1]} />
          <meshStandardMaterial
            color="#B89A3E"
            metalness={0.95}
            roughness={0.15}
            emissive="#B89A3E"
            emissiveIntensity={0.15}
          />
        </mesh>
      </group>

      <pointLight position={[0, 3, -2]} intensity={1.5 + p * 2} color="#D8C66A" distance={15} />
      <pointLight position={[-3, 2, 0]} intensity={0.8} color="#ffeedd" distance={10} />
      <pointLight position={[3, 2, 0]} intensity={0.8} color="#ffeedd" distance={10} />
      <ambientLight intensity={0.15 + p * 0.25} color="#FAFAFA" />
    </group>
  );
}
