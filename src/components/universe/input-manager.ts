// ============================================================================
// THE YACINEVERSE — Centralized Input & Interaction Manager
// Single authoritative keyboard, mouse, pointer-lock and interaction coordinator
// Prevents event duplication, handles cooldowns, and routes [E] deterministically
// ============================================================================

export type InteractionContextType =
  | 'APPROACHING_PLANET'
  | 'NEAR_ARTIFACT'
  | 'NEAR_GATEWAY'
  | 'TERMINAL_OPEN'
  | 'NONE';

export interface InteractionTarget {
  context?: InteractionContextType;
  type?: InteractionContextType;
  id?: string;
  title?: string;
  label?: string;
  distance?: number;
  payload?: unknown;
  metadata?: unknown;
}

type InputEventListener = () => void;
type ContextChangeListener = (target: InteractionTarget) => void;

class CentralizedInputManager {
  private static instance: CentralizedInputManager;

  // Active Key States
  private keys: Record<string, boolean> = {};

  // Authoritative Interaction Target
  private currentTarget: InteractionTarget = { context: 'NONE', type: 'NONE' };
  private lastActivationTime: number = 0;
  private readonly ACTIVATION_COOLDOWN_MS = 400;

  // Listeners
  private interactionListeners: Set<(target: InteractionTarget) => void> = new Set();
  private contextChangeListeners: Set<ContextChangeListener> = new Set();
  private escapeListeners: Set<InputEventListener> = new Set();
  private terminalCloseHandler: (() => void) | null = null;

  private isInitialized = false;

  private constructor() {
    // Singleton
  }

  public static getInstance(): CentralizedInputManager {
    if (!CentralizedInputManager.instance) {
      CentralizedInputManager.instance = new CentralizedInputManager();
    }
    return CentralizedInputManager.instance;
  }

  public init(): void {
    if (this.isInitialized || typeof window === 'undefined') return;

    window.addEventListener('keydown', this.handleKeyDown, { capture: true });
    window.addEventListener('keyup', this.handleKeyUp, { capture: true });
    window.addEventListener('blur', this.handleBlur);

    this.isInitialized = true;
  }

  public cleanup(): void {
    if (!this.isInitialized || typeof window === 'undefined') return;

    window.removeEventListener('keydown', this.handleKeyDown, { capture: true });
    window.removeEventListener('keyup', this.handleKeyUp, { capture: true });
    window.removeEventListener('blur', this.handleBlur);

    this.keys = {};
    this.isInitialized = false;
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    // Ignore input if user is typing in a form input or textarea
    const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
    if (targetTag === 'input' || targetTag === 'textarea' || targetTag === 'select') {
      return;
    }

    this.keys[e.code] = true;

    // Handle Escape Key (Authoritative close)
    if (e.code === 'Escape') {
      if (this.terminalCloseHandler) {
        this.terminalCloseHandler();
        return;
      }
      this.escapeListeners.forEach((listener) => listener());
      return;
    }

    // Handle [E] Interaction (Ignore auto-repeat when held down)
    if (e.code === 'KeyE') {
      if (e.repeat) return; // Prevent repeated triggers from holding E

      const now = performance.now();
      if (now - this.lastActivationTime < this.ACTIVATION_COOLDOWN_MS) {
        return; // Cooldown active
      }

      this.lastActivationTime = now;
      this.triggerInteraction();
    }
  };

  private handleKeyUp = (e: KeyboardEvent) => {
    this.keys[e.code] = false;
  };

  private handleBlur = () => {
    // Reset keys on window blur to prevent stuck keys
    this.keys = {};
  };

  // --------------------------------------------------------------------------
  // Key State Queries
  // --------------------------------------------------------------------------
  public isKeyPressed(code: string): boolean {
    return !!this.keys[code];
  }

  public getMovementVector(): { x: number; y: number; z: number; boost: boolean } {
    let x = 0;
    let y = 0;
    let z = 0;

    if (this.isKeyPressed('KeyW') || this.isKeyPressed('ArrowUp')) z -= 1;
    if (this.isKeyPressed('KeyS') || this.isKeyPressed('ArrowDown')) z += 1;
    if (this.isKeyPressed('KeyA') || this.isKeyPressed('ArrowLeft')) x -= 1;
    if (this.isKeyPressed('KeyD') || this.isKeyPressed('ArrowRight')) x += 1;
    if (this.isKeyPressed('Space')) y += 1;
    if (this.isKeyPressed('KeyC') || this.isKeyPressed('ControlLeft') || this.isKeyPressed('ControlRight')) y -= 1;

    const boost = this.isKeyPressed('ShiftLeft') || this.isKeyPressed('ShiftRight');

    return { x, y, z, boost };
  }

  // --------------------------------------------------------------------------
  // Authoritative Interaction Target State
  // --------------------------------------------------------------------------
  public setInteractionTarget(target: InteractionTarget): void {
    const resolvedContext = target.context || target.type || 'NONE';
    const normalized: InteractionTarget = {
      ...target,
      context: resolvedContext,
      type: resolvedContext,
      label: target.label || target.title,
      title: target.title || target.label,
    };

    if (
      this.currentTarget.context === normalized.context &&
      this.currentTarget.id === normalized.id &&
      this.currentTarget.label === normalized.label
    ) {
      return; // No change
    }

    this.currentTarget = normalized;
    this.contextChangeListeners.forEach((listener) => listener(normalized));
  }

  public getInteractionTarget(): InteractionTarget {
    return this.currentTarget;
  }

  public getCurrentTarget(): InteractionTarget {
    return this.getInteractionTarget();
  }

  public clearInteractionTarget(): void {
    if (this.currentTarget.context === 'NONE') return;
    this.currentTarget = { context: 'NONE', type: 'NONE' };
    this.contextChangeListeners.forEach((listener) => listener(this.currentTarget));
  }

  /**
   * Executes the authoritative interaction for the current context
   */
  public triggerInteraction(): void {
    if (this.currentTarget.context === 'TERMINAL_OPEN') {
      if (this.terminalCloseHandler) {
        this.terminalCloseHandler();
        return;
      }
    }
    if (this.currentTarget.context === 'NONE') return;
    this.interactionListeners.forEach((listener) => listener(this.currentTarget));
  }

  public triggerAction(): void {
    this.triggerInteraction();
  }

  public registerTerminalCloseHandler(handler: () => void): void {
    this.terminalCloseHandler = handler;
  }

  public unregisterTerminalCloseHandler(): void {
    this.terminalCloseHandler = null;
  }

  // --------------------------------------------------------------------------
  // Event Subscriptions
  // --------------------------------------------------------------------------
  public onInteraction(callback: (target: InteractionTarget) => void): () => void {
    this.interactionListeners.add(callback);
    return () => this.interactionListeners.delete(callback);
  }

  public onContextChange(callback: ContextChangeListener): () => void {
    this.contextChangeListeners.add(callback);
    callback(this.currentTarget);
    return () => this.contextChangeListeners.delete(callback);
  }

  public onEscape(callback: InputEventListener): () => void {
    this.escapeListeners.add(callback);
    return () => this.escapeListeners.delete(callback);
  }
}

export const inputManager = CentralizedInputManager.getInstance();
