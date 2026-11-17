'use client';

// ============================================================================
// THE YACINEVERSE — Continuous Planetary Approach & Atmospheric Entry
// High-velocity orbital descent, plasma sheath particles, cloud deck penetration
// ============================================================================

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { WORLDS_CONFIG, type WorldId } from '../universe-types';
import { universeAudio } from '../universe-audio';

interface AtmosphericEntryProps {
  targetWorld: WorldId | 'space';
  onArrival: () => void;
}

// Generate deterministic pseudo-random particle positions
const PARTICLE_COUNT = 900;
function generateDeterministicEntryParticles(count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  let seed = 1337;
  const lcg = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  for (let i = 0; i < count; i++) {
    const angle = lcg() * Math.PI * 2;
    const r = 0.5 + lcg() * 9.5;
    pos[i * 3] = Math.cos(angle) * r;
    pos[i * 3 + 1] = (lcg() - 0.5) * 40;
    pos[i * 3 + 2] = Math.sin(angle) * r;
  }
  return pos;
}

const STATIC_ENTRY_PARTICLES = generateDeterministicEntryParticles(PARTICLE_COUNT);

export function AtmosphericEntry({ targetWorld, onArrival }: AtmosphericEntryProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const pointsRef = useRef<THREE.Points>(null!);
  const ringsRef = useRef<THREE.Group>(null!);
  const elapsed = useRef(0);

  const isDescendingToWorld = targetWorld !== 'space';
  const themeColor =
    isDescendingToWorld && WORLDS_CONFIG[targetWorld]
      ? WORLDS_CONFIG[targetWorld].themeColor
      : '#06B6D4';

  useEffect(() => {
    if (isDescendingToWorld) {
      universeAudio.playAtmosphericEntry();
    } else {
      universeAudio.playPortalTeleport();
    }

    const timer = setTimeout(() => {
      onArrival();
    }, 2800);

    return () => clearTimeout(timer);
  }, [isDescendingToWorld, onArrival]);

  useFrame((state, delta) => {
    elapsed.current += delta;
    const t = elapsed.current;

    // Follow camera
    if (groupRef.current) {
      groupRef.current.position.copy(state.camera.position);
    }

    // Move re-entry plasma particles upward past camera (simulating rapid descent)
    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position;
      const speed = isDescendingToWorld ? 45.0 * delta : -45.0 * delta;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        let y = posAttr.getY(i);
        y += speed;
        if (isDescendingToWorld) {
          if (y > 20) y = -20;
        } else {
          if (y < -20) y = 20;
        }
        posAttr.setY(i, y);
      }
      posAttr.needsUpdate = true;
    }

    // Expand atmospheric condensation vapor rings
    if (ringsRef.current) {
      ringsRef.current.rotation.y += delta * 1.2;
      const scale = 1.0 + Math.sin(t * 4) * 0.15;
      ringsRef.current.scale.set(scale, 1, scale);
    }

    // Mild atmospheric turbulence shake during the first 2 seconds
    if (t < 2.0) {
      const shakeAmount = (1.0 - t / 2.0) * 0.04;
      state.camera.position.x += (Math.sin(t * 30) - 0.5) * shakeAmount;
      state.camera.position.z += (Math.cos(t * 26) - 0.5) * shakeAmount;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Plasma Re-entry Streak Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[STATIC_ENTRY_PARTICLES, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.18}
          color={themeColor}
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Condensation Vapor Rings */}
      <group ref={ringsRef}>
        {[-8, -2, 4, 10].map((yOffset, idx) => (
          <mesh key={idx} position={[0, yOffset, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[4 + idx * 2.2, 4.4 + idx * 2.2, 32]} />
            <meshBasicMaterial
              color={themeColor}
              transparent
              opacity={0.35}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>

      {/* Atmospheric Entry Core Glow Light */}
      <pointLight color={themeColor} intensity={30} distance={50} />
    </group>
  );
}
