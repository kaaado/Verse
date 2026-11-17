'use client';

// ============================================================================
// THE YACINEVERSE — First-Person Space Flight Controller
// 6-DOF kinematic space flight with WASD, mouse-look, boost, and boundary physics
// ============================================================================

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { WORLDS_CONFIG, type WorldId } from '../universe-types';
import { universeAudio } from '../universe-audio';

interface FlightControlsProps {
  enabled: boolean;
  onApproachWorld: (worldId: WorldId | null) => void;
  onInitiateWarp: (worldId: WorldId) => void;
  onCameraUpdate?: (pos: [number, number, number], rot: [number, number, number]) => void;
}

export function FlightControls({
  enabled,
  onApproachWorld,
  onInitiateWarp,
  onCameraUpdate,
}: FlightControlsProps) {
  // Flight Kinematics
  const velocity = useRef(new THREE.Vector3());
  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));
  const isPointerLocked = useRef(false);
  const isMouseDown = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });

  // Key States
  const keys = useRef<{
    forward: boolean;
    backward: boolean;
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
    boost: boolean;
    interact: boolean;
  }>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
    down: false,
    boost: false,
    interact: false,
  });

  const closestWorld = useRef<WorldId | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keys.current.forward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          keys.current.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = true;
          break;
        case 'Space':
          keys.current.up = true;
          break;
        case 'KeyC':
        case 'ControlLeft':
        case 'ControlRight':
          keys.current.down = true;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          keys.current.boost = true;
          break;
        case 'KeyE':
          if (closestWorld.current) {
            onInitiateWarp(closestWorld.current);
          }
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keys.current.forward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          keys.current.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = false;
          break;
        case 'Space':
          keys.current.up = false;
          break;
        case 'KeyC':
        case 'ControlLeft':
        case 'ControlRight':
          keys.current.down = false;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          keys.current.boost = false;
          break;
      }
    };

    const handlePointerLockChange = () => {
      isPointerLocked.current = document.pointerLockElement !== null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isPointerLocked.current) {
        const movementX = e.movementX || 0;
        const movementY = e.movementY || 0;

        euler.current.y -= movementX * 0.0022;
        euler.current.x -= movementY * 0.0022;
        euler.current.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, euler.current.x));
      } else if (isMouseDown.current) {
        const deltaX = e.clientX - previousMouse.current.x;
        const deltaY = e.clientY - previousMouse.current.y;
        previousMouse.current = { x: e.clientX, y: e.clientY };

        euler.current.y -= deltaX * 0.003;
        euler.current.x -= deltaY * 0.003;
        euler.current.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, euler.current.x));
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        isMouseDown.current = true;
        previousMouse.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseUp = () => {
      isMouseDown.current = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [enabled, onInitiateWarp]);

  useFrame((state, delta) => {
    if (!enabled) return;

    // Apply orientation
    state.camera.quaternion.setFromEuler(euler.current);

    // Movement Physics
    const accelRate = keys.current.boost ? 55.0 : 25.0;
    const maxSpeed = keys.current.boost ? 35.0 : 16.0;
    const damping = Math.exp(-6.0 * delta); // Smooth velocity decay

    const moveDirection = new THREE.Vector3();
    if (keys.current.forward) moveDirection.z -= 1;
    if (keys.current.backward) moveDirection.z += 1;
    if (keys.current.left) moveDirection.x -= 1;
    if (keys.current.right) moveDirection.x += 1;
    if (keys.current.up) moveDirection.y += 1;
    if (keys.current.down) moveDirection.y -= 1;

    if (moveDirection.lengthSq() > 0) {
      moveDirection.normalize();
      moveDirection.applyQuaternion(state.camera.quaternion);
      velocity.current.addScaledVector(moveDirection, accelRate * delta);
    }

    // Apply speed clamp
    if (velocity.current.length() > maxSpeed) {
      velocity.current.setLength(maxSpeed);
    }

    // Apply damping
    velocity.current.multiplyScalar(damping);

    // Apply displacement to camera
    state.camera.position.addScaledVector(velocity.current, delta);

    // Soft Boundary Check (Radius R = 90 from origin)
    const distFromOrigin = state.camera.position.length();
    if (distFromOrigin > 90) {
      const pullVector = state.camera.position.clone().normalize().negate();
      velocity.current.addScaledVector(pullVector, 30.0 * delta);
    }

    // Dynamic Thruster Sound
    universeAudio.setThrusterIntensity(velocity.current.length() / maxSpeed);

    // World Proximity Detection
    let detectedWorld: WorldId | null = null;
    let minDistance = Infinity;

    for (const [id, config] of Object.entries(WORLDS_CONFIG)) {
      const worldPos = new THREE.Vector3(...config.spaceCoordinates);
      const dist = state.camera.position.distanceTo(worldPos);
      if (dist < config.approachRadius + 6 && dist < minDistance) {
        minDistance = dist;
        detectedWorld = id as WorldId;
      }
    }

    if (detectedWorld !== closestWorld.current) {
      closestWorld.current = detectedWorld;
      onApproachWorld(detectedWorld);
    }

    if (onCameraUpdate) {
      onCameraUpdate(
        [state.camera.position.x, state.camera.position.y, state.camera.position.z],
        [state.camera.rotation.x, state.camera.rotation.y, state.camera.rotation.z]
      );
    }
  });

  return null;
}
