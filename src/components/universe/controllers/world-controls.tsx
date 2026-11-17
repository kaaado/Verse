'use client';

// ============================================================================
// THE YACINEVERSE — Authoritative First-Person World Ground Controller
// Connected directly to CentralizedInputManager (0 event conflicts, 0 duplicate keys)
// ============================================================================

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import type { InteractiveArtifact } from '../universe-types';
import { inputManager } from '../input-manager';

interface WorldControlsProps {
  enabled: boolean;
  artifacts: InteractiveArtifact[];
  activeArtifact?: InteractiveArtifact | null;
  onActivateArtifact?: (artifact: InteractiveArtifact) => void;
  onCloseArtifact?: () => void;
  onNearArtifact?: (artifact: InteractiveArtifact | null) => void;
  onNearExitPortal?: (near: boolean) => void;
  onReturnToSpace: () => void;
}

export function WorldControls({
  enabled,
  artifacts,
  activeArtifact,
  onActivateArtifact,
  onCloseArtifact,
  onNearArtifact,
  onNearExitPortal,
  onReturnToSpace,
}: WorldControlsProps) {
  const velocity = useRef(new THREE.Vector3());
  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));
  const isPointerLocked = useRef(false);
  const isMouseDown = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });
  const hasInitializedPos = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    inputManager.init();
    hasInitializedPos.current = false;

    // Subscribe to Authoritative Interaction [E]
    const unsubscribeInteraction = inputManager.onInteraction((target) => {
      if (target.context === 'TERMINAL_OPEN') {
        onCloseArtifact?.();
      } else if (target.context === 'NEAR_GATEWAY') {
        onReturnToSpace();
      } else if (target.context === 'NEAR_ARTIFACT' && target.payload) {
        onActivateArtifact?.(target.payload as InteractiveArtifact);
      }
    });

    // Subscribe to [Escape]
    const unsubscribeEscape = inputManager.onEscape(() => {
      if (activeArtifact) {
        onCloseArtifact?.();
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

    document.addEventListener('pointerlockchange', handlePointerLockChange);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      unsubscribeInteraction();
      unsubscribeEscape();
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [enabled, activeArtifact, onActivateArtifact, onCloseArtifact, onReturnToSpace]);

  // Synchronize active terminal with input target
  useEffect(() => {
    if (activeArtifact) {
      inputManager.setInteractionTarget({
        context: 'TERMINAL_OPEN',
        id: activeArtifact.id,
        title: activeArtifact.title,
      });
    }
  }, [activeArtifact]);

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

    // If terminal is open, freeze player movement
    if (activeArtifact) return;

    // Query Centralized Input Manager
    const { x, z, boost } = inputManager.getMovementVector();

    const walkSpeed = boost ? 14.0 : 8.0;
    const damping = Math.exp(-9.0 * delta);

    const moveDir = new THREE.Vector3(x, 0, z);
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

    // Check distance to Exit Gateway (situated at [0, 1.8, 14])
    const exitPos = new THREE.Vector3(0, 1.8, 14);
    const distToExit = state.camera.position.distanceTo(exitPos);

    if (distToExit < 4.5) {
      onNearExitPortal?.(true);
      onNearArtifact?.(null);
      inputManager.setInteractionTarget({
        context: 'NEAR_GATEWAY',
        title: 'Return to Space Orbit',
      });
      return;
    }

    onNearExitPortal?.(false);

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

    onNearArtifact?.(closestArtifact);

    if (closestArtifact) {
      inputManager.setInteractionTarget({
        context: 'NEAR_ARTIFACT',
        id: closestArtifact.id,
        title: closestArtifact.title,
        payload: closestArtifact,
      });
    } else {
      const currentTarget = inputManager.getInteractionTarget();
      if (currentTarget.context === 'NEAR_ARTIFACT' || currentTarget.context === 'NEAR_GATEWAY') {
        inputManager.clearInteractionTarget();
      }
    }
  });

  return null;
}
