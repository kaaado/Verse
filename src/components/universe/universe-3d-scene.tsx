'use client';

// ============================================================================
// THE YACINEVERSE — Upgraded Enormous Layered Space Environment & Central Nexus
// Multi-layer starfield, volumetric nebulae, asteroid fields & celestial planets
// ============================================================================

import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Stars, Float, Line } from '@react-three/drei';
import type { Project } from '@/types/database';
import { WORLDS_CONFIG, type WorldId } from './universe-types';

export interface Sector3DDef {
  id: WorldId;
  title: string;
  tagline: string;
  description?: string;
  position: [number, number, number];
  color: string;
  emissive: string;
  radius: number;
}

export const PLANETS_3D: Sector3DDef[] = [
  {
    id: 'core_systems',
    title: WORLDS_CONFIG.core_systems.title,
    tagline: WORLDS_CONFIG.core_systems.subtitle,
    description: WORLDS_CONFIG.core_systems.atmosphereDescription,
    position: WORLDS_CONFIG.core_systems.spaceCoordinates,
    color: WORLDS_CONFIG.core_systems.themeColor,
    emissive: WORLDS_CONFIG.core_systems.emissiveColor,
    radius: 3.4,
  },
  {
    id: 'ai_intelligence',
    title: WORLDS_CONFIG.ai_intelligence.title,
    tagline: WORLDS_CONFIG.ai_intelligence.subtitle,
    description: WORLDS_CONFIG.ai_intelligence.atmosphereDescription,
    position: WORLDS_CONFIG.ai_intelligence.spaceCoordinates,
    color: WORLDS_CONFIG.ai_intelligence.themeColor,
    emissive: WORLDS_CONFIG.ai_intelligence.emissiveColor,
    radius: 3.2,
  },
  {
    id: 'engineering',
    title: WORLDS_CONFIG.engineering.title,
    tagline: WORLDS_CONFIG.engineering.subtitle,
    description: WORLDS_CONFIG.engineering.atmosphereDescription,
    position: WORLDS_CONFIG.engineering.spaceCoordinates,
    color: WORLDS_CONFIG.engineering.themeColor,
    emissive: WORLDS_CONFIG.engineering.emissiveColor,
    radius: 3.0,
  },
  {
    id: 'creations',
    title: WORLDS_CONFIG.creations.title,
    tagline: WORLDS_CONFIG.creations.subtitle,
    description: WORLDS_CONFIG.creations.atmosphereDescription,
    position: WORLDS_CONFIG.creations.spaceCoordinates,
    color: WORLDS_CONFIG.creations.themeColor,
    emissive: WORLDS_CONFIG.creations.emissiveColor,
    radius: 2.8,
  },
  {
    id: 'origins',
    title: WORLDS_CONFIG.origins.title,
    tagline: WORLDS_CONFIG.origins.subtitle,
    description: WORLDS_CONFIG.origins.atmosphereDescription,
    position: WORLDS_CONFIG.origins.spaceCoordinates,
    color: WORLDS_CONFIG.origins.themeColor,
    emissive: WORLDS_CONFIG.origins.emissiveColor,
    radius: 3.6,
  },
];

export const SECTORS_3D = PLANETS_3D;

// Deterministic Asteroid Field Belt Coordinates (React 19 pure)
const ASTEROID_COUNT = 180;
function generateAsteroidBelt(): { pos: [number, number, number]; scale: number; rot: [number, number, number] }[] {
  const items = [];
  let seed = 1337;
  const lcg = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  for (let i = 0; i < ASTEROID_COUNT; i++) {
    const angle = lcg() * Math.PI * 2;
    const distance = 14 + lcg() * 8; // Donut between R=14 and R=22
    const height = (lcg() - 0.5) * 4;
    items.push({
      pos: [Math.cos(angle) * distance, height, Math.sin(angle) * distance] as [number, number, number],
      scale: 0.15 + lcg() * 0.35,
      rot: [lcg() * Math.PI, lcg() * Math.PI, 0] as [number, number, number],
    });
  }
  return items;
}
const STATIC_ASTEROIDS = generateAsteroidBelt();

// ----------------------------------------------------------------------------
// Central Nexus Megastructure
// ----------------------------------------------------------------------------
function CentralNexus({ onClick }: { onClick: () => void }) {
  const coreRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Group>(null!);
  const ring2Ref = useRef<THREE.Group>(null!);
  const ring3Ref = useRef<THREE.Group>(null!);
  const spireGroupRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 2.2) * 0.08;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.3;
    if (ring2Ref.current) ring2Ref.current.rotation.x = t * 0.25;
    if (ring3Ref.current) ring3Ref.current.rotation.y = -t * 0.2;
    if (spireGroupRef.current) spireGroupRef.current.rotation.y = t * 0.1;
  });

  return (
    <group
      position={[0, 0, 0]}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Central Pulsating Reactor Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshStandardMaterial
          color="#10B981"
          emissive="#06B6D4"
          emissiveIntensity={hovered ? 3.0 : 2.0}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Local Point Light */}
      <pointLight color="#10B981" intensity={35} distance={45} decay={2} />

      {/* Navigational Spire Array */}
      <group ref={spireGroupRef}>
        {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, idx) => (
          <group key={idx} rotation={[0, angle, 0]}>
            <mesh position={[4.5, 0, 0]}>
              <boxGeometry args={[1.2, 0.4, 0.4]} />
              <meshStandardMaterial color="#0B130E" metalness={0.9} />
            </mesh>
            <mesh position={[5.2, 0, 0]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshBasicMaterial color="#10B981" />
            </mesh>
          </group>
        ))}
      </group>

      {/* Orbital Energy Rings */}
      <group ref={ring1Ref}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[5.6, 0.08, 16, 64]} />
          <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={0.8} />
        </mesh>
      </group>

      <group ref={ring2Ref} rotation={[Math.PI / 4, 0, 0]}>
        <mesh>
          <torusGeometry args={[6.5, 0.06, 16, 64]} />
          <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={0.8} />
        </mesh>
      </group>

      <group ref={ring3Ref} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <mesh>
          <torusGeometry args={[7.4, 0.05, 16, 64]} />
          <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={0.7} />
        </mesh>
      </group>
    </group>
  );
}

// ----------------------------------------------------------------------------
// Asteroid Belt Assembly
// ----------------------------------------------------------------------------
function AsteroidBelt() {
  const beltRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (beltRef.current) {
      beltRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <group ref={beltRef}>
      {STATIC_ASTEROIDS.map((ast, idx) => (
        <mesh
          key={idx}
          position={ast.pos}
          scale={ast.scale}
          rotation={ast.rot}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#334155"
            roughness={0.9}
            metalness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// ----------------------------------------------------------------------------
// Celestial Planet Landmark with Atmospheric Glow Shell
// ----------------------------------------------------------------------------
function CelestialPlanet({
  planet,
  isActive,
  onSelect,
}: {
  planet: Sector3DDef;
  isActive: boolean;
  onSelect: (id: WorldId) => void;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const sphereRef = useRef<THREE.Mesh>(null!);
  const atmoRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.15;
    }
    if (atmoRef.current) {
      atmoRef.current.rotation.y -= delta * 0.08;
    }
  });

  return (
    <group
      ref={groupRef}
      position={planet.position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(planet.id);
      }}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Solid Planetary Core */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[planet.radius, 32, 32]} />
        <meshStandardMaterial
          color={planet.color}
          emissive={planet.emissive}
          emissiveIntensity={isActive ? 2.2 : hovered ? 1.6 : 0.8}
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Atmospheric Glow Shell */}
      <mesh ref={atmoRef}>
        <sphereGeometry args={[planet.radius * 1.15, 32, 32]} />
        <meshBasicMaterial
          color={planet.color}
          transparent
          opacity={isActive ? 0.35 : hovered ? 0.25 : 0.12}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Planetary Ring for Engineering and Creations */}
      {(planet.id === 'engineering' || planet.id === 'creations') && (
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <ringGeometry args={[planet.radius * 1.4, planet.radius * 2.0, 48]} />
          <meshBasicMaterial
            color={planet.color}
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Local Point Light */}
      <pointLight
        color={planet.color}
        intensity={isActive ? 25 : hovered ? 15 : 6}
        distance={25}
      />
    </group>
  );
}

// ----------------------------------------------------------------------------
// Constellation Conduits (Light Beams connecting Nexus to Planets)
// ----------------------------------------------------------------------------
function ConstellationConduits() {
  return (
    <group>
      {PLANETS_3D.map((p) => (
        <Line
          key={p.id}
          points={[[0, 0, 0], p.position]}
          color={p.color}
          transparent
          opacity={0.25}
          lineWidth={1}
        />
      ))}
    </group>
  );
}

// ----------------------------------------------------------------------------
// Master 3D Space Scene Graph
// ----------------------------------------------------------------------------
interface Universe3DSceneProps {
  projects?: Project[];
  activeSectorId: string | null;
  onSelectSector: (sectorId: string) => void;
  onResetNexus: () => void;
}

export function Universe3DScene({
  activeSectorId,
  onSelectSector,
  onResetNexus,
}: Universe3DSceneProps) {
  return (
    <>
      {/* Multi-Layer Starfield */}
      {/* Layer 1: Distant Faint Stars */}
      <Stars
        radius={240}
        depth={60}
        count={5000}
        factor={4}
        saturation={0.2}
        fade
        speed={0.8}
      />
      {/* Layer 2: Mid-Range Bright Stars */}
      <Stars
        radius={120}
        depth={40}
        count={2000}
        factor={6}
        saturation={0.5}
        fade
        speed={1.4}
      />

      {/* Volumetric Tinted Nebula Clouds */}
      <mesh position={[40, 20, -50]}>
        <sphereGeometry args={[35, 16, 16]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.03} />
      </mesh>
      <mesh position={[-50, -30, -40]}>
        <sphereGeometry args={[40, 16, 16]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.03} />
      </mesh>

      {/* Ambient & Directional Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[30, 40, 20]} intensity={1.0} />
      <directionalLight position={[-30, -30, -20]} intensity={0.4} color="#06B6D4" />

      {/* Central Nexus Megastructure */}
      <CentralNexus onClick={onResetNexus} />

      {/* Asteroid Belt */}
      <AsteroidBelt />

      {/* Constellation Conduit Light Beams */}
      <ConstellationConduits />

      {/* 5 Celestial Planets */}
      {PLANETS_3D.map((planet) => (
        <Float
          key={planet.id}
          speed={1.2}
          rotationIntensity={0.15}
          floatIntensity={0.3}
        >
          <CelestialPlanet
            planet={planet}
            isActive={activeSectorId === planet.id}
            onSelect={onSelectSector}
          />
        </Float>
      ))}
    </>
  );
}
