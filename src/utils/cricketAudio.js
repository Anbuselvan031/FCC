// Web Audio API sound synthesizer for cricket animation effects
// Zero external dependencies or network requests

let audioCtx = null;
let isMuted = true;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setMuted(muted) {
  isMuted = muted;
  if (!muted) {
    getAudioContext();
  }
}

export function getMuted() {
  return isMuted;
}

/**
 * Synthesizes a friction slide / whoosh across grass turf
 */
export function playTurfSlideSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const bufferSize = ctx.sampleRate * 0.45;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.15));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Filter to sound like grass/turf friction
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(600, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.4);
    filter.Q.value = 2.5;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.42);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  } catch (err) {
    console.debug('Audio playback error:', err);
  }
}

/**
 * Synthesizes the sharp wooden tap of a bat sliding and grounding inside the crease
 */
export function playBatCreaseTap() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.13);
  } catch (err) {
    console.debug('Audio playback error:', err);
  }
}

/**
 * Quick cricket celebration crowd chime
 */
export function playCelebrationSting() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;

      const startTime = ctx.currentTime + idx * 0.08;
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.15, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.36);
    });
  } catch (err) {
    console.debug('Audio playback error:', err);
  }
}

/**
 * Synthesizes a deep 4D sub-bass kinetic impact shockwave
 */
export function play4DShockwave(timeScale = 1.0) {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Sub-bass impact oscillator
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    const baseFreq = timeScale < 0.5 ? 90 : 160;
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(32, ctx.currentTime + 0.45 * (1 / timeScale));

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.5);

    gain.gain.setValueAtTime(0.45, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55 * (1 / timeScale));

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.6 * (1 / timeScale));
  } catch (err) {
    console.debug('4D Audio error:', err);
  }
}

/**
 * Synthesizes a temporal dilation time-warp bend
 */
export function playTemporalWarp(targetRate = 1.0) {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const startFreq = targetRate < 1.0 ? 550 : 220;
    const endFreq = targetRate < 1.0 ? 180 : 660;

    osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + 0.28);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.32);
  } catch (err) {
    console.debug('Temporal warp audio error:', err);
  }
}

/**
 * Synthesizes a high-frequency prismatic hologram sparkle
 */
export function playHologramFoil() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(2200, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.16);
  } catch (err) {
    console.debug('Hologram audio error:', err);
  }
}
