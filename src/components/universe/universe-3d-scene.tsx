'use client';

// ============================================================================
// THE YACINEVERSE — 3D Game-Quality Universe Explorer Scene
// Built with Three.js, @react-three/fiber, and @react-three/drei
// Immersive WebGL celestial visualization with interactive sectors & camera rig
// ============================================================================

import React, { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, Html, Line } from '@react-three/drei';
import type { Project } from '@/types/database';

export interface Sector3DDef {
  id: string;
  title: string;
  tagline: string;
  position: [number, number, number];
  cameraOffset: [number, number, number];
  color: string;
  emissive: string;
  description: string;
}

export const SECTORS_3D: Sector3DDef[] = [
  {
    id: 'core_systems',
    title: 'Core Systems & Architecture',
    tagline: 'Distributed Backends & Zero-Trust Engines',
    position: [-22, 3, -10],
    cameraOffset: [-14, 6, 2],
    color: '#10B981',
    emissive: '#059669',
    description: 'Distributed backends, high-concurrency microservices, and Zero-Trust database isolation.',
  },
  {
    id: 'ai_intelligence',
    title: 'AI & Machine Intelligence',
    tagline: 'Neural Inference & Multi-Agent Pipelines',
    position: [22, 5, -12],
    cameraOffset: [14, 8, 0],
    color: '#06B6D4',
    emissive: '#0891B2',
    description: 'Neural network inference, computer vision models, and autonomous multi-agent pipelines.',
  },
  {
    id: 'engineering',
    title: 'Engineering & Field Systems',
    tagline: 'Offline-First Protocols & Edge Telemetry',
    position: [16, -14, 8],
    cameraOffset: [10, -8, 20],
    color: '#F59E0B',
    emissive: '#D97706',
    description: 'Offline-first sync protocols, IoT edge telemetry, and resilient field operations.',
  },
  {
    id: 'creations',
    title: 'Creations & Utilities',
    tagline: 'Developer Tooling & Interactive Sandboxes',
    position: [-18, -12, 10],
    cameraOffset: [-10, -6, 22],
    color: '#8B5CF6',
    emissive: '#7C3AED',
    description: 'Interactive developer tools, creative sandboxes, and open-source utility engines.',
  },
  {
    id: 'origins',
    title: 'Origins & Evolution',
    tagline: 'Foundations, Research & Philosophy',
    position: [0, 20, -8],
    cameraOffset: [0, 24, 6],
    color: '#EC4899',
    emissive: '#DB2777',
    description: 'Foundational research, academic computer science roots, and architectural principles.',
  },
];

// ----------------------------------------------------------------------------
// Camera Kinematics Rig
// Smoothly interpolates camera position & look-at vector towards target
// ----------------------------------------------------------------------------
function CameraRig({
  activeSectorId,
  isNexusFocused,
}: {
  activeSectorId: string | null;
  isNexusFocused: boolean;
}) {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetPos = useRef(new THREE.Vector3(0, 10, 48));

  useFrame((state, delta) => {
    // Determine target camera position and look-at
    if (activeSectorId) {
      const sector = SECTORS_3D.find((s) => s.id === activeSectorId);
      if (sector) {
        targetPos.current.set(...sector.cameraOffset);
        targetLookAt.current.set(...sector.position);
      }
    } else if (isNexusFocused) {
      targetPos.current.set(0, 3, 20);
      targetLookAt.current.set(0, 0, 0);
    } else {
      // Default orbit position with subtle mouse parallax
      const mouseX = (state.pointer.x * 4);
      const mouseY = (state.pointer.y * 3);
      targetPos.current.set(mouseX, 10 + mouseY, 48);
      targetLookAt.current.set(0, 0, 0);
    }

    // Kinematic damping interpolation
    const dampSpeed = 3.2 * delta;
    camera.position.lerp(targetPos.current, THREE.MathUtils.clamp(dampSpeed, 0, 0.2));
    currentLookAt.current.lerp(targetLookAt.current, THREE.MathUtils.clamp(dampSpeed, 0, 0.2));
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

// ----------------------------------------------------------------------------
// Central Nexus Hub
// Pulsating core, layered wireframe shells, counter-rotating energy rings
// ----------------------------------------------------------------------------
function CentralNexus({
  onClick,
  isFocused,
}: {
  onClick: () => void;
  isFocused: boolean;
}) {
  const coreRef = useRef<THREE.Mesh>(null!);
  const shellRef1 = useRef<THREE.Mesh>(null!);
  const shellRef2 = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Group>(null!);
  const ring2Ref = useRef<THREE.Group>(null!);
  const ring3Ref = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Pulse core scale and light
    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 2.5) * 0.08;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    // Rotate shells
    if (shellRef1.current) {
      shellRef1.current.rotation.x = t * 0.2;
      shellRef1.current.rotation.y = t * 0.3;
    }
    if (shellRef2.current) {
      shellRef2.current.rotation.x = -t * 0.15;
      shellRef2.current.rotation.z = t * 0.25;
    }

    // Counter-rotating orbital rings
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.4;
    if (ring2Ref.current) ring2Ref.current.rotation.x = t * 0.35;
    if (ring3Ref.current) ring3Ref.current.rotation.y = -t * 0.3;
  });

  return (
    <group
      position={[0, 0, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Central Pulsating Emissive Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshStandardMaterial
          color="#10B981"
          emissive="#06B6D4"
          emissiveIntensity={hovered || isFocused ? 2.5 : 1.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Point Light emitted from Nexus */}
      <pointLight
        color="#10B981"
        intensity={hovered || isFocused ? 40 : 25}
        distance={35}
        decay={2}
      />

      {/* Inner Wireframe Icosahedron */}
      <mesh ref={shellRef1}>
        <icosahedronGeometry args={[3.4, 1]} />
        <meshStandardMaterial
          color="#06B6D4"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Outer Wireframe Dodecahedron */}
      <mesh ref={shellRef2}>
        <dodecahedronGeometry args={[4.2, 0]} />
        <meshStandardMaterial
          color="#10B981"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Orbital Ring 1: Horizontal */}
      <group ref={ring1Ref}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[5.2, 0.06, 16, 64]} />
          <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* Orbital Ring 2: Tilted 45 deg */}
      <group ref={ring2Ref} rotation={[Math.PI / 4, 0, 0]}>
        <mesh>
          <torusGeometry args={[6.0, 0.05, 16, 64]} />
          <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* Orbital Ring 3: Tilted -45 deg */}
      <group ref={ring3Ref} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <mesh>
          <torusGeometry args={[6.8, 0.04, 16, 64]} />
          <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={0.7} />
        </mesh>
      </group>

      {/* 3D Floating Nexus Label */}
      <Html position={[0, -5, 0]} center distanceFactor={28} pointerEvents="none">
        <div className="flex flex-col items-center pointer-events-none select-none">
          <span className="text-[10px] font-mono tracking-widest text-[#10B981] bg-[#0B0F19]/80 px-2 py-0.5 rounded border border-[#10B981]/30 uppercase whitespace-nowrap">
            CENTRAL NEXUS (0,0,0)
          </span>
          <span className="text-[9px] font-mono text-[#94A3B8] mt-0.5">
            Click to return to orbit
          </span>
        </div>
      </Html>
    </group>
  );
}

// ----------------------------------------------------------------------------
// Constellation Conduits (Light Beams connecting Nexus to Sectors)
// ----------------------------------------------------------------------------
function ConstellationConduits({ sectors }: { sectors: Sector3DDef[] }) {
  return (
    <group>
      {sectors.map((sector) => (
        <Line
          key={sector.id}
          points={[
            [0, 0, 0],
            sector.position,
          ]}
          color={sector.color}
          transparent
          opacity={0.25}
          lineWidth={1}
        />
      ))}
    </group>
  );
}

// ----------------------------------------------------------------------------
// Thematic Sector Landmark Component
// Unique 3D geometry, lighting, hover effects, and interactive click trigger
// ----------------------------------------------------------------------------
function SectorLandmark({
  sector,
  isActive,
  projectCount,
  onSelect,
}: {
  sector: Sector3DDef;
  isActive: boolean;
  projectCount: number;
  onSelect: (id: string) => void;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y =
        sector.position[1] + Math.sin(t * 1.5 + sector.position[0]) * 0.4;
    }

    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.4;
      meshRef.current.rotation.x = t * 0.2;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.6;
    }
  });

  // Render sector-specific geometry
  const renderGeometry = () => {
    switch (sector.id) {
      case 'core_systems':
        // Layered Cybernetic Cube Monolith
        return (
          <mesh ref={meshRef}>
            <boxGeometry args={[3.2, 3.2, 3.2]} />
            <meshStandardMaterial
              color={sector.color}
              emissive={sector.emissive}
              emissiveIntensity={isActive ? 2.2 : hovered ? 1.6 : 0.9}
              wireframe={!isActive && !hovered}
              roughness={0.3}
              metalness={0.7}
            />
          </mesh>
        );

      case 'ai_intelligence':
        // Geodesic Neural Sphere with Node Particles
        return (
          <mesh ref={meshRef}>
            <icosahedronGeometry args={[2.4, 2]} />
            <meshStandardMaterial
              color={sector.color}
              emissive={sector.emissive}
              emissiveIntensity={isActive ? 2.4 : hovered ? 1.8 : 1.0}
              wireframe
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        );

      case 'engineering':
        // Orbital Station Ring Array
        return (
          <mesh ref={meshRef}>
            <octahedronGeometry args={[2.5, 0]} />
            <meshStandardMaterial
              color={sector.color}
              emissive={sector.emissive}
              emissiveIntensity={isActive ? 2.2 : hovered ? 1.6 : 0.8}
              roughness={0.4}
              metalness={0.6}
            />
          </mesh>
        );

      case 'creations':
        // Crystalline Prism Cluster
        return (
          <mesh ref={meshRef}>
            <coneGeometry args={[2.2, 4.5, 5]} />
            <meshStandardMaterial
              color={sector.color}
              emissive={sector.emissive}
              emissiveIntensity={isActive ? 2.3 : hovered ? 1.7 : 0.9}
              roughness={0.2}
              metalness={0.7}
            />
          </mesh>
        );

      case 'origins':
        // Celestial Beacon Spire
        return (
          <mesh ref={meshRef}>
            <cylinderGeometry args={[0.3, 1.8, 5, 8]} />
            <meshStandardMaterial
              color={sector.color}
              emissive={sector.emissive}
              emissiveIntensity={isActive ? 2.5 : hovered ? 1.9 : 1.0}
              roughness={0.3}
              metalness={0.8}
            />
          </mesh>
        );

      default:
        return (
          <mesh ref={meshRef}>
            <sphereGeometry args={[2, 16, 16]} />
            <meshStandardMaterial color={sector.color} />
          </mesh>
        );
    }
  };

  return (
    <group
      ref={groupRef}
      position={[sector.position[0], sector.position[1], sector.position[2]]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(sector.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Sector Main Geometry */}
      {renderGeometry()}

      {/* Orbiting Satellite Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.8, 0.05, 12, 48]} />
        <meshStandardMaterial
          color={sector.color}
          emissive={sector.color}
          emissiveIntensity={isActive ? 1.5 : hovered ? 1.0 : 0.4}
        />
      </mesh>

      {/* Localized Point Light */}
      <pointLight
        color={sector.color}
        intensity={isActive ? 25 : hovered ? 15 : 8}
        distance={20}
        decay={2}
      />

      {/* 3D Floating Sector Label */}
      <Html position={[0, -3.8, 0]} center distanceFactor={30} pointerEvents="none">
        <div
          className={`flex flex-col items-center select-none transition-all duration-300 ${
            isActive
              ? 'scale-110'
              : hovered
              ? 'scale-105'
              : 'scale-95 opacity-80'
          }`}
        >
          <div
            style={{
              borderColor: sector.color,
              boxShadow: isActive ? `0 0 16px ${sector.color}66` : undefined,
            }}
            className="flex items-center space-x-1.5 bg-[#0B0F19]/90 backdrop-blur-md px-3 py-1 rounded-full border text-xs font-mono font-bold whitespace-nowrap"
          >
            <span
              style={{ backgroundColor: sector.color }}
              className="w-2 h-2 rounded-full inline-block"
            />
            <span style={{ color: '#F8FAFC' }}>{sector.title}</span>
            <span
              style={{ color: sector.color, borderColor: `${sector.color}44` }}
              className="text-[10px] bg-[#1E293B]/60 px-1.5 py-0.2 rounded border font-mono ml-1"
            >
              {projectCount}
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#94A3B8] mt-0.5 drop-shadow">
            [{sector.position[0]}, {sector.position[1]}, {sector.position[2]}]
          </span>
        </div>
      </Html>
    </group>
  );
}

// ----------------------------------------------------------------------------
// Main 3D Universe Scene Graph
// ----------------------------------------------------------------------------
interface Universe3DSceneProps {
  projects: Project[];
  activeSectorId: string | null;
  onSelectSector: (sectorId: string) => void;
  onResetNexus: () => void;
}

export function Universe3DScene({
  projects,
  activeSectorId,
  onSelectSector,
  onResetNexus,
}: Universe3DSceneProps) {
  // Compute project count per sector
  const projectCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of projects) {
      if (p.sector) {
        map[p.sector] = (map[p.sector] || 0) + 1;
      }
    }
    return map;
  }, [projects]);

  return (
    <>
      {/* Deep Space Background Stars */}
      <Stars
        radius={140}
        depth={60}
        count={6000}
        factor={5}
        saturation={0.5}
        fade
        speed={1.2}
      />

      {/* Ambient & Directional Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[20, 30, 20]} intensity={0.8} />
      <directionalLight position={[-20, -20, -20]} intensity={0.3} color="#06B6D4" />

      {/* Constellation Conduits connecting Nexus to Sectors */}
      <ConstellationConduits sectors={SECTORS_3D} />

      {/* Central Nexus (Click to reset view) */}
      <CentralNexus
        onClick={onResetNexus}
        isFocused={activeSectorId === null}
      />

      {/* 5 Thematic Sector Landmarks */}
      {SECTORS_3D.map((sector) => (
        <Float
          key={sector.id}
          speed={1.5}
          rotationIntensity={0.2}
          floatIntensity={0.4}
        >
          <SectorLandmark
            sector={sector}
            isActive={activeSectorId === sector.id}
            projectCount={projectCounts[sector.id] || 0}
            onSelect={onSelectSector}
          />
        </Float>
      ))}

      {/* Camera Rig with Kinematic Damping */}
      <CameraRig
        activeSectorId={activeSectorId}
        isNexusFocused={activeSectorId === null}
      />
    </>
  );
}
