'use client';

// ============================================================================
// THE YACINEVERSE — Authoritative First-Person Flight Controller
// Connected directly to CentralizedInputManager (0 event conflicts, 0 duplicate keys)
// ============================================================================

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { WORLDS_CONFIG, type WorldId } from '../universe-types';
import { universeAudio } from '../universe-audio';
import { inputManager } from '../input-manager';

interface FlightControlsProps {
  enabled: boolean;
  onInitiateWarp: (worldId: WorldId) => void;
  onApproachWorld?: (worldId: WorldId | null) => void;
  onCameraUpdate?: (pos: [number, number, number], rot: [number, number, number]) => void;
}

export function FlightControls({
  enabled,
  onInitiateWarp,
  onApproachWorld,
  onCameraUpdate,
}: FlightControlsProps) {
  const velocity = useRef(new THREE.Vector3());
  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));
  const isPointerLocked = useRef(false);
  const isMouseDown = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });

  const closestWorld = useRef<WorldId | null>(null);

  useEffect(() => {
    if (!enabled) return;

    inputManager.init();

    // Subscribe to Authoritative Interaction [E]
    const unsubscribeInteraction = inputManager.onInteraction((target) => {
      if (target.context === 'APPROACHING_PLANET' && target.id) {
        onInitiateWarp(target.id as WorldId);
      }
    });

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

    document.addEventListener('pointerlockchange', handlePointerLockChange);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      unsubscribeInteraction();
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

    // Query Centralized Input Manager
    const { x, y, z, boost } = inputManager.getMovementVector();

    const accelRate = boost ? 55.0 : 25.0;
    const maxSpeed = boost ? 36.0 : 16.0;
    const damping = Math.exp(-6.0 * delta);

    const moveDirection = new THREE.Vector3(x, y, z);
    if (moveDirection.lengthSq() > 0) {
      moveDirection.normalize();
      moveDirection.applyQuaternion(state.camera.quaternion);
      velocity.current.addScaledVector(moveDirection, accelRate * delta);
    }

    if (velocity.current.length() > maxSpeed) {
      velocity.current.setLength(maxSpeed);
    }

    velocity.current.multiplyScalar(damping);
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
      onApproachWorld?.(detectedWorld);
      if (detectedWorld) {
        const config = WORLDS_CONFIG[detectedWorld];
        inputManager.setInteractionTarget({
          context: 'APPROACHING_PLANET',
          id: detectedWorld,
          title: config.title,
        });
      } else {
        const currentTarget = inputManager.getInteractionTarget();
        if (currentTarget.context === 'APPROACHING_PLANET') {
          inputManager.clearInteractionTarget();
        }
      }
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
