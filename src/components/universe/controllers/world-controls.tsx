'use client';

// ============================================================================
// THE YACINEVERSE — First-Person Interior World Controller
// Surface and platform exploration with artifact proximity detection & interaction
// ============================================================================

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import type { InteractiveArtifact } from '../universe-types';

interface WorldControlsProps {
  enabled: boolean;
  artifacts: InteractiveArtifact[];
  onNearArtifact: (artifact: InteractiveArtifact | null) => void;
  onActivateArtifact: (artifact: InteractiveArtifact) => void;
  onNearExitPortal: (isNear: boolean) => void;
  onReturnToSpace: () => void;
}

export function WorldControls({
  enabled,
  artifacts,
  onNearArtifact,
  onActivateArtifact,
  onNearExitPortal,
  onReturnToSpace,
}: WorldControlsProps) {
  const velocity = useRef(new THREE.Vector3());
  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));
  const isPointerLocked = useRef(false);
  const isMouseDown = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });
  const hasInitializedPos = useRef(false);

  const activeNearArtifact = useRef<InteractiveArtifact | null>(null);
  const nearExit = useRef(false);

  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    boost: false,
  });

  useEffect(() => {
    if (!enabled) return;

    hasInitializedPos.current = false;

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
        case 'ShiftLeft':
        case 'ShiftRight':
          keys.current.boost = true;
          break;
        case 'KeyE':
          if (nearExit.current) {
            onReturnToSpace();
          } else if (activeNearArtifact.current) {
            onActivateArtifact(activeNearArtifact.current);
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
        euler.current.x = Math.max(-Math.PI / 2.3, Math.min(Math.PI / 2.3, euler.current.x));
      } else if (isMouseDown.current) {
        const deltaX = e.clientX - previousMouse.current.x;
        const deltaY = e.clientY - previousMouse.current.y;
        previousMouse.current = { x: e.clientX, y: e.clientY };

        euler.current.y -= deltaX * 0.003;
        euler.current.x -= deltaY * 0.003;
        euler.current.x = Math.max(-Math.PI / 2.3, Math.min(Math.PI / 2.3, euler.current.x));
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
  }, [enabled, onActivateArtifact, onReturnToSpace]);

  useFrame((state, delta) => {
    if (!enabled) return;

    if (!hasInitializedPos.current) {
      state.camera.position.set(0, 1.8, 12);
      state.camera.rotation.set(0, 0, 0);
      euler.current.set(0, 0, 0, 'YXZ');
      hasInitializedPos.current = true;
    }

    // Apply orientation
    state.camera.quaternion.setFromEuler(euler.current);

    // Walking speed
    const walkSpeed = keys.current.boost ? 14.0 : 8.0;
    const damping = Math.exp(-9.0 * delta);

    const moveDir = new THREE.Vector3();
    if (keys.current.forward) moveDir.z -= 1;
    if (keys.current.backward) moveDir.z += 1;
    if (keys.current.left) moveDir.x -= 1;
    if (keys.current.right) moveDir.x += 1;

    if (moveDir.lengthSq() > 0) {
      moveDir.normalize();
      moveDir.applyAxisAngle(new THREE.Vector3(0, 1, 0), euler.current.y);
      velocity.current.addScaledVector(moveDir, walkSpeed * 10 * delta);
    }

    if (velocity.current.length() > walkSpeed) {
      velocity.current.setLength(walkSpeed);
    }

    velocity.current.multiplyScalar(damping);
    state.camera.position.addScaledVector(velocity.current, delta);
    state.camera.position.setY(1.8); // Maintain eye height

    // Platform boundary clamp (Radius R = 28)
    const distFromCenter = Math.hypot(state.camera.position.x, state.camera.position.z);
    if (distFromCenter > 28) {
      const angle = Math.atan2(state.camera.position.z, state.camera.position.x);
      state.camera.position.setX(Math.cos(angle) * 28);
      state.camera.position.setZ(Math.sin(angle) * 28);
    }

    // Check distance to Exit Portal (situated at [0, 0, 14])
    const exitPos = new THREE.Vector3(0, 1.8, 14);
    const distToExit = state.camera.position.distanceTo(exitPos);
    const isNowNearExit = distToExit < 4.5;
    if (isNowNearExit !== nearExit.current) {
      nearExit.current = isNowNearExit;
      onNearExitPortal(isNowNearExit);
    }

    // Check distance to artifacts
    let closestArtifact: InteractiveArtifact | null = null;
    let minArtifactDist = Infinity;

    for (const art of artifacts) {
      const artPos = new THREE.Vector3(...art.position);
      const d = state.camera.position.distanceTo(artPos);
      if (d < 5.5 && d < minArtifactDist) {
        minArtifactDist = d;
        closestArtifact = art;
      }
    }

    if (closestArtifact !== activeNearArtifact.current) {
      activeNearArtifact.current = closestArtifact;
      onNearArtifact(closestArtifact);
    }
  });

  return null;
}
