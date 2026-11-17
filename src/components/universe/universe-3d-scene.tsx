'use client';

// ============================================================================
// THE YACINEVERSE — Enterprise Grand Space Environment & Central Nexus Landmark
// Layered Starfields, Volumetric Nebulae, Orbital Asteroids, Kinetic Megastructure & 5 Distinct Planetary Silhouettes
// ============================================================================

import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Stars, Float, Line } from '@react-three/drei';
import type { Project } from '@/types/database';
import { WORLDS_CONFIG, type WorldId } from './universe-types';
import { DESIGN_TOKENS } from '@/lib/design-tokens';

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
    color: DESIGN_TOKENS.worlds.core_systems.primary,
    emissive: DESIGN_TOKENS.worlds.core_systems.emissive,
    radius: 3.4,
  },
  {
    id: 'ai_intelligence',
    title: WORLDS_CONFIG.ai_intelligence.title,
    tagline: WORLDS_CONFIG.ai_intelligence.subtitle,
    description: WORLDS_CONFIG.ai_intelligence.atmosphereDescription,
    position: WORLDS_CONFIG.ai_intelligence.spaceCoordinates,
    color: DESIGN_TOKENS.worlds.ai_intelligence.primary,
    emissive: DESIGN_TOKENS.worlds.ai_intelligence.emissive,
    radius: 3.2,
  },
  {
    id: 'engineering',
    title: WORLDS_CONFIG.engineering.title,
    tagline: WORLDS_CONFIG.engineering.subtitle,
    description: WORLDS_CONFIG.engineering.atmosphereDescription,
    position: WORLDS_CONFIG.engineering.spaceCoordinates,
    color: DESIGN_TOKENS.worlds.engineering.primary,
    emissive: DESIGN_TOKENS.worlds.engineering.emissive,
    radius: 3.0,
  },
  {
    id: 'creations',
    title: WORLDS_CONFIG.creations.title,
    tagline: WORLDS_CONFIG.creations.subtitle,
    description: WORLDS_CONFIG.creations.atmosphereDescription,
    position: WORLDS_CONFIG.creations.spaceCoordinates,
    color: DESIGN_TOKENS.worlds.creations.primary,
    emissive: DESIGN_TOKENS.worlds.creations.emissive,
    radius: 2.8,
  },
  {
    id: 'origins',
    title: WORLDS_CONFIG.origins.title,
    tagline: WORLDS_CONFIG.origins.subtitle,
    description: WORLDS_CONFIG.origins.atmosphereDescription,
    position: WORLDS_CONFIG.origins.spaceCoordinates,
    color: DESIGN_TOKENS.worlds.origins.primary,
    emissive: DESIGN_TOKENS.worlds.origins.emissive,
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
    const distance = 14 + lcg() * 9;
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
// Central Nexus Megastructure Landmark
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
          color={DESIGN_TOKENS.core.hudEmerald}
          emissive={DESIGN_TOKENS.core.hudCyan}
          emissiveIntensity={hovered ? 3.0 : DESIGN_TOKENS.lighting.nexusGlow}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Local Point Light */}
      <pointLight
        color={DESIGN_TOKENS.core.hudEmerald}
        intensity={hovered ? 45 : 35}
        distance={45}
        decay={2}
      />

      {/* Navigational Spire Array with Signal Beacons */}
      <group ref={spireGroupRef}>
        {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, idx) => (
          <group key={idx} rotation={[0, angle, 0]}>
            <mesh position={[4.5, 0, 0]}>
              <boxGeometry args={[1.4, 0.35, 0.35]} />
              <meshStandardMaterial color="#0B130E" metalness={0.92} roughness={0.18} />
            </mesh>
            <mesh position={[5.3, 0, 0]}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshBasicMaterial color={DESIGN_TOKENS.core.hudEmerald} />
            </mesh>
            {/* Beacon beam vertical line */}
            <mesh position={[5.3, 0.8, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 1.4, 8]} />
              <meshBasicMaterial color={DESIGN_TOKENS.core.hudCyan} transparent opacity={0.6} />
            </mesh>
          </group>
        ))}
      </group>

      {/* 3 Orbital Accelerator Rings */}
      <group ref={ring1Ref}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[5.6, 0.08, 16, 64]} />
          <meshStandardMaterial
            color={DESIGN_TOKENS.core.hudCyan}
            emissive={DESIGN_TOKENS.core.hudCyan}
            emissiveIntensity={0.9}
          />
        </mesh>
      </group>

      <group ref={ring2Ref} rotation={[Math.PI / 4, 0, 0]}>
        <mesh>
          <torusGeometry args={[6.6, 0.06, 16, 64]} />
          <meshStandardMaterial
            color={DESIGN_TOKENS.core.hudEmerald}
            emissive={DESIGN_TOKENS.core.hudEmerald}
            emissiveIntensity={0.9}
          />
        </mesh>
      </group>

      <group ref={ring3Ref} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <mesh>
          <torusGeometry args={[7.6, 0.05, 16, 64]} />
          <meshStandardMaterial
            color={DESIGN_TOKENS.core.hudViolet}
            emissive={DESIGN_TOKENS.core.hudViolet}
            emissiveIntensity={0.8}
          />
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
      beltRef.current.rotation.y += delta * 0.035;
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
            metalness={0.25}
          />
        </mesh>
      ))}
    </group>
  );
}

// ----------------------------------------------------------------------------
// Celestial Planet Landmark with Distinct Silhouette & Atmospheric Shell
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
  const satellitesRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.15;
    }
    if (atmoRef.current) {
      atmoRef.current.rotation.y -= delta * 0.08;
    }
    if (satellitesRef.current) {
      satellitesRef.current.rotation.y += delta * 0.25;
      satellitesRef.current.rotation.z += delta * 0.1;
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
      {/* 1. Solid Planetary Core */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[planet.radius, 32, 32]} />
        <meshStandardMaterial
          color={planet.color}
          emissive={planet.emissive}
          emissiveIntensity={isActive ? 2.4 : hovered ? 1.8 : 0.9}
          roughness={0.35}
          metalness={0.65}
        />
      </mesh>

      {/* 2. Atmospheric Glow Shell */}
      <mesh ref={atmoRef}>
        <sphereGeometry args={[planet.radius * 1.15, 32, 32]} />
        <meshBasicMaterial
          color={planet.color}
          transparent
          opacity={isActive ? 0.38 : hovered ? 0.28 : 0.14}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* 3. Distinct Planetary Architectural Silhouettes */}
      {/* Core Systems: Monolith Relay Satellites */}
      {planet.id === 'core_systems' && (
        <group ref={satellitesRef}>
          {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((angle, i) => (
            <group key={i} rotation={[0.3, angle, 0]}>
              <mesh position={[planet.radius * 1.6, 0, 0]}>
                <boxGeometry args={[0.3, 0.8, 0.2]} />
                <meshStandardMaterial color="#0B130E" emissive="#10B981" emissiveIntensity={0.6} />
              </mesh>
            </group>
          ))}
          {/* Equatorial Orbit Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[planet.radius * 1.6, 0.03, 12, 48]} />
            <meshBasicMaterial color="#10B981" transparent opacity={0.4} />
          </mesh>
        </group>
      )}

      {/* AI Intelligence: Geodesic Neural Lattice Cage */}
      {planet.id === 'ai_intelligence' && (
        <mesh>
          <icosahedronGeometry args={[planet.radius * 1.25, 2]} />
          <meshBasicMaterial
            color="#06B6D4"
            wireframe
            transparent
            opacity={isActive ? 0.45 : hovered ? 0.35 : 0.2}
          />
        </mesh>
      )}

      {/* Engineering: Heavy Industrial Orbital Ring & Solar Trusses */}
      {planet.id === 'engineering' && (
        <group rotation={[Math.PI / 3, 0, 0]}>
          <mesh>
            <ringGeometry args={[planet.radius * 1.35, planet.radius * 1.9, 48]} />
            <meshStandardMaterial
              color="#F59E0B"
              emissive="#D97706"
              emissiveIntensity={0.5}
              side={THREE.DoubleSide}
              transparent
              opacity={0.35}
            />
          </mesh>
          <mesh>
            <torusGeometry args={[planet.radius * 1.9, 0.05, 12, 48]} />
            <meshBasicMaterial color="#FBBF24" />
          </mesh>
        </group>
      )}

      {/* Creations: Prismatic Double Tilted Rings & Floating Prisms */}
      {planet.id === 'creations' && (
        <group>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <ringGeometry args={[planet.radius * 1.3, planet.radius * 1.7, 48]} />
            <meshBasicMaterial
              color="#8B5CF6"
              transparent
              opacity={0.32}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
            <torusGeometry args={[planet.radius * 1.5, 0.04, 12, 48]} />
            <meshBasicMaterial color="#A78BFA" transparent opacity={0.5} />
          </mesh>
        </group>
      )}

      {/* Origins: Astrolabe Memory Rings */}
      {planet.id === 'origins' && (
        <group>
          <mesh rotation={[Math.PI / 6, 0, 0]}>
            <torusGeometry args={[planet.radius * 1.45, 0.04, 16, 64]} />
            <meshStandardMaterial color="#EC4899" emissive="#DB2777" emissiveIntensity={0.6} />
          </mesh>
          <mesh rotation={[-Math.PI / 3, Math.PI / 3, 0]}>
            <torusGeometry args={[planet.radius * 1.75, 0.03, 16, 64]} />
            <meshBasicMaterial color="#F472B6" transparent opacity={0.35} />
          </mesh>
        </group>
      )}

      {/* Local Point Light */}
      <pointLight
        color={planet.color}
        intensity={isActive ? 25 : hovered ? 16 : 8}
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
          opacity={0.28}
          lineWidth={1.2}
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
        <meshBasicMaterial color={DESIGN_TOKENS.core.hudCyan} transparent opacity={0.035} />
      </mesh>
      <mesh position={[-50, -30, -40]}>
        <sphereGeometry args={[40, 16, 16]} />
        <meshBasicMaterial color={DESIGN_TOKENS.core.hudViolet} transparent opacity={0.035} />
      </mesh>
      <mesh position={[20, -40, 30]}>
        <sphereGeometry args={[30, 16, 16]} />
        <meshBasicMaterial color={DESIGN_TOKENS.core.hudEmerald} transparent opacity={0.025} />
      </mesh>

      {/* Ambient & Directional Lighting */}
      <ambientLight intensity={DESIGN_TOKENS.lighting.ambientSpace} />
      <directionalLight position={[30, 40, 20]} intensity={DESIGN_TOKENS.lighting.sunIntensity} />
      <directionalLight position={[-30, -30, -20]} intensity={0.5} color={DESIGN_TOKENS.core.hudCyan} />

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
