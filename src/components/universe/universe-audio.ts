// ============================================================================
// THE YACINEVERSE — Authoritative Multi-Layer Audio Architecture
// Master gain routing, separate ambient/SFX buses, world-specific soundscapes
// Full session persistence, browser autoplay compliance & node lifecycle safety
// ============================================================================

export interface AudioSettings {
  masterMuted: boolean;
  ambientMuted: boolean;
  effectsMuted: boolean;
  masterVolume: number;
  ambientVolume: number;
  effectsVolume: number;
}

const DEFAULT_AUDIO_SETTINGS: AudioSettings = {
  masterMuted: false,
  ambientMuted: false,
  effectsMuted: false,
  masterVolume: 0.8,
  ambientVolume: 0.7,
  effectsVolume: 0.85,
};

class AuthoritativeAudioEngine {
  private ctx: AudioContext | null = null;
  private isInitialized = false;
  private settings: AudioSettings = { ...DEFAULT_AUDIO_SETTINGS };

  // Master Audio Routing Buses
  private masterGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private effectsGain: GainNode | null = null;

  // Active Sound Nodes
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneFilter: BiquadFilterNode | null = null;

  private thrusterGain: GainNode | null = null;
  private thrusterOsc: OscillatorNode | null = null;
  private thrusterFilter: BiquadFilterNode | null = null;

  private activeWorldId: string | null = null;
  private listeners: Set<(settings: AudioSettings) => void> = new Set();

  constructor() {
    this.loadSettings();
  }

  public subscribe(listener: (settings: AudioSettings) => void): () => void {
    this.listeners.add(listener);
    listener(this.getSettings());
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    const s = this.getSettings();
    this.listeners.forEach((listener) => listener(s));
  }

  // --------------------------------------------------------------------------
  // Initialization & Autoplay Handling
  // --------------------------------------------------------------------------
  public init(): void {
    if (this.isInitialized || typeof window === 'undefined') return;

    try {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return;

      this.ctx = new AudioCtxClass();

      // Master Bus Routing: All nodes route through masterGain -> destination
      this.masterGain = this.ctx.createGain();
      this.masterGain.connect(this.ctx.destination);

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.connect(this.masterGain);

      this.effectsGain = this.ctx.createGain();
      this.effectsGain.connect(this.masterGain);

      this.applyGains();
      this.setupAmbientDrone();
      this.setupThrusterSubsystem();

      this.isInitialized = true;
    } catch {
      // Audio unsupported or blocked
    }
  }

  public resume(): void {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // --------------------------------------------------------------------------
  // Settings Management & Persistence
  // --------------------------------------------------------------------------
  private loadSettings(): void {
    if (typeof window === 'undefined') return;
    try {
      const raw = sessionStorage.getItem('yacineverse_audio_settings');
      if (raw) {
        this.settings = { ...DEFAULT_AUDIO_SETTINGS, ...JSON.parse(raw) };
      }
    } catch {
      this.settings = { ...DEFAULT_AUDIO_SETTINGS };
    }
  }

  private saveSettings(): void {
    if (typeof window === 'undefined') return;
    try {
      sessionStorage.setItem('yacineverse_audio_settings', JSON.stringify(this.settings));
    } catch {}
  }

  public getSettings(): AudioSettings {
    return { ...this.settings };
  }

  public setMasterMute(muted: boolean): void {
    this.settings.masterMuted = muted;
    this.applyGains();
    this.saveSettings();
    this.notify();
  }

  public toggleMasterMute(): boolean {
    this.setMasterMute(!this.settings.masterMuted);
    return this.settings.masterMuted;
  }

  public toggleMute(): boolean {
    return this.toggleMasterMute();
  }

  public setAmbientMute(muted: boolean): void {
    this.settings.ambientMuted = muted;
    this.applyGains();
    this.saveSettings();
    this.notify();
  }

  public toggleAmbientMute(): boolean {
    this.setAmbientMute(!this.settings.ambientMuted);
    return this.settings.ambientMuted;
  }

  public setEffectsMute(muted: boolean): void {
    this.settings.effectsMuted = muted;
    this.applyGains();
    this.saveSettings();
    this.notify();
  }

  public toggleEffectsMute(): boolean {
    this.setEffectsMute(!this.settings.effectsMuted);
    return this.settings.effectsMuted;
  }

  public setMasterVolume(val: number): void {
    this.settings.masterVolume = Math.max(0, Math.min(1, val));
    this.applyGains();
    this.saveSettings();
    this.notify();
  }

  public setAmbientVolume(val: number): void {
    this.settings.ambientVolume = Math.max(0, Math.min(1, val));
    this.applyGains();
    this.saveSettings();
    this.notify();
  }

  public setEffectsVolume(val: number): void {
    this.settings.effectsVolume = Math.max(0, Math.min(1, val));
    this.applyGains();
    this.saveSettings();
    this.notify();
  }

  private applyGains(): void {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    if (this.masterGain) {
      const target = this.settings.masterMuted ? 0 : this.settings.masterVolume;
      this.masterGain.gain.setTargetAtTime(target, now, 0.05);
    }

    if (this.ambientGain) {
      const target = this.settings.ambientMuted ? 0 : this.settings.ambientVolume * 0.2;
      this.ambientGain.gain.setTargetAtTime(target, now, 0.05);
    }

    if (this.effectsGain) {
      const target = this.settings.effectsMuted ? 0 : this.settings.effectsVolume;
      this.effectsGain.gain.setTargetAtTime(target, now, 0.05);
    }
  }

  // --------------------------------------------------------------------------
  // Ambient Sound Engine (Continuous Cosmic Drone & World Harmonics)
  // --------------------------------------------------------------------------
  private setupCosmicDrone(): void {
    this.setupAmbientDrone();
  }

  private setupAmbientDrone(): void {
    if (!this.ctx || !this.ambientGain) return;

    try {
      this.droneFilter = this.ctx.createBiquadFilter();
      this.droneFilter.type = 'lowpass';
      this.droneFilter.frequency.setValueAtTime(220, this.ctx.currentTime);

      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc1.type = 'sine';
      this.droneOsc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1

      this.droneOsc2 = this.ctx.createOscillator();
      this.droneOsc2.type = 'triangle';
      this.droneOsc2.frequency.setValueAtTime(82.4, this.ctx.currentTime); // E2

      this.droneOsc1.connect(this.droneFilter);
      this.droneOsc2.connect(this.droneFilter);
      this.droneFilter.connect(this.ambientGain);

      this.droneOsc1.start();
      this.droneOsc2.start();
    } catch {
      // Ignore
    }
  }

  /**
   * Adapts the ambient soundscape to the unique atmosphere of each world
   */
  public setWorldAmbience(worldId: string | null): void {
    if (this.activeWorldId === worldId || !this.ctx || !this.droneOsc1 || !this.droneOsc2 || !this.droneFilter) {
      return;
    }

    this.activeWorldId = worldId;
    const now = this.ctx.currentTime;

    switch (worldId) {
      case 'core_systems':
        // High-density computational green drone
        this.droneOsc1.frequency.setTargetAtTime(48.99, now, 0.8); // G1
        this.droneOsc2.frequency.setTargetAtTime(97.99, now, 0.8); // G2
        this.droneFilter.frequency.setTargetAtTime(180, now, 0.8);
        break;

      case 'ai_intelligence':
        // Cyan neural synaptic resonance
        this.droneOsc1.frequency.setTargetAtTime(65.41, now, 0.8); // C2
        this.droneOsc2.frequency.setTargetAtTime(130.81, now, 0.8); // C3
        this.droneFilter.frequency.setTargetAtTime(320, now, 0.8);
        break;

      case 'engineering':
        // Industrial amber sub-bass rumble
        this.droneOsc1.frequency.setTargetAtTime(41.2, now, 0.8); // E1
        this.droneOsc2.frequency.setTargetAtTime(61.74, now, 0.8); // B1
        this.droneFilter.frequency.setTargetAtTime(140, now, 0.8);
        break;

      case 'creations':
        // Crystalline purple shimmer drone
        this.droneOsc1.frequency.setTargetAtTime(73.42, now, 0.8); // D2
        this.droneOsc2.frequency.setTargetAtTime(110.0, now, 0.8); // A2
        this.droneFilter.frequency.setTargetAtTime(400, now, 0.8);
        break;

      case 'origins':
        // Celestial chronometer choral pad
        this.droneOsc1.frequency.setTargetAtTime(55.0, now, 0.8); // A1
        this.droneOsc2.frequency.setTargetAtTime(164.81, now, 0.8); // E3
        this.droneFilter.frequency.setTargetAtTime(260, now, 0.8);
        break;

      default:
        // Deep space default
        this.droneOsc1.frequency.setTargetAtTime(55, now, 0.8);
        this.droneOsc2.frequency.setTargetAtTime(82.4, now, 0.8);
        this.droneFilter.frequency.setTargetAtTime(220, now, 0.8);
        break;
    }
  }

  // --------------------------------------------------------------------------
  // Thruster Sound Subsystem (Connected to effectsGain)
  // --------------------------------------------------------------------------
  private setupThrusterSubsystem(): void {
    if (!this.ctx || !this.effectsGain) return;

    try {
      this.thrusterGain = this.ctx.createGain();
      this.thrusterGain.gain.setValueAtTime(0, this.ctx.currentTime);

      this.thrusterFilter = this.ctx.createBiquadFilter();
      this.thrusterFilter.type = 'lowpass';
      this.thrusterFilter.frequency.setValueAtTime(120, this.ctx.currentTime);

      this.thrusterOsc = this.ctx.createOscillator();
      this.thrusterOsc.type = 'sawtooth';
      this.thrusterOsc.frequency.setValueAtTime(45, this.ctx.currentTime);

      this.thrusterOsc.connect(this.thrusterFilter);
      this.thrusterFilter.connect(this.thrusterGain);
      this.thrusterGain.connect(this.effectsGain);

      this.thrusterOsc.start();
    } catch {
      // Ignore
    }
  }

  public setThrusterIntensity(intensity: number): void {
    if (!this.ctx || !this.thrusterGain || !this.thrusterOsc || !this.thrusterFilter) return;

    const clamped = Math.max(0, Math.min(1, intensity));
    const now = this.ctx.currentTime;

    // Gain modulates from 0 to 0.16
    this.thrusterGain.gain.setTargetAtTime(clamped * 0.16, now, 0.08);

    // Pitch rises from 45Hz to 120Hz under full boost
    this.thrusterOsc.frequency.setTargetAtTime(45 + clamped * 75, now, 0.08);

    // Filter opens from 120Hz to 380Hz
    this.thrusterFilter.frequency.setTargetAtTime(120 + clamped * 260, now, 0.08);
  }

  // --------------------------------------------------------------------------
  // One-Shot SFX Methods (All routed cleanly through effectsGain)
  // --------------------------------------------------------------------------
  public playWarpSound(): void {
    if (!this.ctx || !this.effectsGain || this.settings.masterMuted || this.settings.effectsMuted) return;

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
      gain.connect(this.effectsGain);

      osc.start(now);
      osc.stop(now + 1.9);
    } catch {}
  }

  public playAtmosphericEntry(): void {
    if (!this.ctx || !this.effectsGain || this.settings.masterMuted || this.settings.effectsMuted) return;

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

      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 1.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.effectsGain);

      osc.start(now);
      osc.stop(now + 1.6);
    } catch {}
  }

  public playInteractionChime(): void {
    if (!this.ctx || !this.effectsGain || this.settings.masterMuted || this.settings.effectsMuted) return;

    try {
      const now = this.ctx.currentTime;
      const frequencies = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

      frequencies.forEach((freq, idx) => {
        if (!this.ctx || !this.effectsGain) return;
        const noteTime = now + idx * 0.07;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.12, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.45);

        osc.connect(gain);
        gain.connect(this.effectsGain);

        osc.start(noteTime);
        osc.stop(noteTime + 0.5);
      });
    } catch {}
  }

  public playPortalTeleport(): void {
    if (!this.ctx || !this.effectsGain || this.settings.masterMuted || this.settings.effectsMuted) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.6);
      osc.frequency.exponentialRampToValueAtTime(90, now + 1.1);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.effectsGain);

      osc.start(now);
      osc.stop(now + 1.3);
    } catch {}
  }
}

export const universeAudio = new AuthoritativeAudioEngine();
