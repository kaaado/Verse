// ============================================================================
// THE YACINEVERSE — Procedural Web Audio Synthesis Engine
// Zero-asset, zero-network, latency-free soundscape using Web Audio API
// Ambient cosmic drone, thruster hum, warp acceleration, and interaction chimes
// ============================================================================

class UniverseAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isInitialized: boolean = false;

  // Audio Nodes
  private droneGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private thrusterGain: GainNode | null = null;
  private thrusterNoiseNode: AudioBufferSourceNode | null = null;

  constructor() {
    // AudioContext is initialized on first user gesture to comply with browser autoplay policy
  }

  public init(): void {
    if (this.isInitialized || typeof window === 'undefined') return;

    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return;

      this.ctx = new AudioCtxClass();
      this.isInitialized = true;
      this.setupCosmicDrone();
    } catch {
      // Audio unsupported or blocked
    }
  }

  public resume(): void {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.droneGain && this.ctx) {
      this.droneGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.12, this.ctx.currentTime, 0.1);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // --------------------------------------------------------------------------
  // Ambient Cosmic Drone (Continuous low-frequency detuned pads)
  // --------------------------------------------------------------------------
  private setupCosmicDrone(): void {
    if (!this.ctx) return;

    try {
      const masterFilter = this.ctx.createBiquadFilter();
      masterFilter.type = 'lowpass';
      masterFilter.frequency.setValueAtTime(220, this.ctx.currentTime);

      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(this.isMuted ? 0 : 0.12, this.ctx.currentTime);

      // Low fundamental oscillator (55Hz / A1)
      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc1.type = 'sine';
      this.droneOsc1.frequency.setValueAtTime(55, this.ctx.currentTime);

      // Detuned harmonic oscillator (82.4Hz / E2)
      this.droneOsc2 = this.ctx.createOscillator();
      this.droneOsc2.type = 'triangle';
      this.droneOsc2.frequency.setValueAtTime(82.4, this.ctx.currentTime);

      this.droneOsc1.connect(masterFilter);
      this.droneOsc2.connect(masterFilter);
      masterFilter.connect(this.droneGain);
      this.droneGain.connect(this.ctx.destination);

      this.droneOsc1.start();
      this.droneOsc2.start();
    } catch {
      // Audio graph failure fallback
    }
  }

  // --------------------------------------------------------------------------
  // Thruster Acceleration Sound (Modulates with boost)
  // --------------------------------------------------------------------------
  public setThrusterIntensity(intensity: number): void {
    if (!this.ctx || this.isMuted || !this.thrusterGain) return;
    const target = Math.min(Math.max(intensity, 0), 1) * 0.18;
    this.thrusterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.08);
  }

  // --------------------------------------------------------------------------
  // Warp / Hyperspace Jump Sound Effect
  // --------------------------------------------------------------------------
  public playWarpSound(): void {
    if (!this.ctx || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(300, now);
      filter.frequency.exponentialRampToValueAtTime(2400, now + 1.2);
      filter.Q.setValueAtTime(4, now);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 1.2);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.9);
    } catch {
      // Audio ignore
    }
  }

  // --------------------------------------------------------------------------
  // World Atmospheric Entry / Arrival Sound
  // --------------------------------------------------------------------------
  public playAtmosphericEntry(): void {
    if (!this.ctx || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 1.4);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.exponentialRampToValueAtTime(120, now + 1.4);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 1.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.6);
    } catch {
      // Audio ignore
    }
  }

  // --------------------------------------------------------------------------
  // Interactive Artifact / Hologram Chime (Harmonic Pentatonic Sine)
  // --------------------------------------------------------------------------
  public playInteractionChime(): void {
    if (!this.ctx || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      const frequencies = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      
      frequencies.forEach((freq, idx) => {
        if (!this.ctx) return;
        const noteTime = now + idx * 0.08;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.12, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(noteTime);
        osc.stop(noteTime + 0.5);
      });
    } catch {
      // Audio ignore
    }
  }

  // --------------------------------------------------------------------------
  // Portal Teleportation Hum
  // --------------------------------------------------------------------------
  public playPortalTeleport(): void {
    if (!this.ctx || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.7);
      osc.frequency.exponentialRampToValueAtTime(100, now + 1.2);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.4);
    } catch {
      // Audio ignore
    }
  }
}

// Global Singleton Instance
export const universeAudio = new UniverseAudioEngine();
