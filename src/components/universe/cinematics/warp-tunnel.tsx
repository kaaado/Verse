'use client';

// ============================================================================
// THE YACINEVERSE — 3D Hyperspace Warp Tunnel & Star Streak FX
// Dynamic star streaks, cylindrical warp rings, and camera acceleration
// ============================================================================

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { WORLDS_CONFIG, type WorldId } from '../universe-types';
import { universeAudio } from '../universe-audio';

interface WarpTunnelProps {
  targetWorld: WorldId | 'space';
  onArrival: () => void;
}

// Generate deterministic pseudo-random star positions outside render (React 19 pure)
const STAR_COUNT = 1200;
function generateDeterministicStarPositions(count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  let seed = 42;
  const lcg = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  for (let i = 0; i < count; i++) {
    const radius = 2.0 + lcg() * 14.0;
    const theta = lcg() * Math.PI * 2;
    pos[i * 3] = Math.cos(theta) * radius;
    pos[i * 3 + 1] = Math.sin(theta) * radius;
    pos[i * 3 + 2] = (lcg() - 0.5) * 120;
  }
  return pos;
}

const STATIC_STAR_POSITIONS = generateDeterministicStarPositions(STAR_COUNT);

export function WarpTunnel({ targetWorld, onArrival }: WarpTunnelProps) {
  const pointsRef = useRef<THREE.Points>(null!);
  const ringsGroupRef = useRef<THREE.Group>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const elapsed = useRef(0);

  const themeColor =
    targetWorld !== 'space' && WORLDS_CONFIG[targetWorld]
      ? WORLDS_CONFIG[targetWorld].themeColor
      : '#06B6D4';

  useEffect(() => {
    universeAudio.playWarpSound();
    const timer = setTimeout(() => {
      universeAudio.playAtmosphericEntry();
      onArrival();
    }, 2400);

    return () => clearTimeout(timer);
  }, [onArrival]);

  useFrame((state, delta) => {
    elapsed.current += delta;

    // Follow camera position
    if (groupRef.current) {
      groupRef.current.position.copy(state.camera.position);
    }

    // Accelerate star streaks past camera
    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position;
      const speed = 120.0 * delta;
      for (let i = 0; i < STAR_COUNT; i++) {
        let z = posAttr.getZ(i);
        z += speed;
        if (z > 50) z = -70; // Wrap around
        posAttr.setZ(i, z);
      }
      posAttr.needsUpdate = true;
    }

    // Rotate and pulse warp rings
    if (ringsGroupRef.current) {
      ringsGroupRef.current.rotation.z += delta * 1.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Star Streaks */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[STATIC_STAR_POSITIONS, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.25}
          color={themeColor}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Warp Rings Array */}
      <group ref={ringsGroupRef}>
        {[-30, -15, 0, 15, 30].map((zPos, idx) => (
          <mesh key={idx} position={[0, 0, zPos]}>
            <torusGeometry args={[8.0 + (idx % 2) * 2, 0.08, 16, 64]} />
            <meshBasicMaterial
              color={themeColor}
              transparent
              opacity={0.5}
            />
          </mesh>
        ))}
      </group>

      {/* Atmospheric Entry Flash Light */}
      <pointLight color={themeColor} intensity={25} distance={60} />
    </group>
  );
}
