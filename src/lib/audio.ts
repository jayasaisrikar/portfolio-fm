export const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  // @ts-ignore
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  return new AudioContext();
};

let audioCtx: AudioContext | null = null;
let humOscillator: OscillatorNode | null = null;
let humGain: GainNode | null = null;

export const initAudio = () => {
  if (!audioCtx) {
    audioCtx = getAudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

export const startLightsaberHum = () => {
  initAudio();
  if (!audioCtx) return;
  
  if (humOscillator) return; // already playing
  
  humOscillator = audioCtx.createOscillator();
  humGain = audioCtx.createGain();
  
  // Mix of 50Hz and 100Hz 
  humOscillator.type = 'sawtooth';
  humOscillator.frequency.value = 55; // Base hum

  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 150;
  filter.Q.value = 5;
  
  humOscillator.connect(filter);
  filter.connect(humGain);
  humGain.connect(audioCtx.destination);
  
  humGain.gain.setValueAtTime(0, audioCtx.currentTime);
  humGain.gain.linearRampToValueAtTime(0.02, audioCtx.currentTime + 0.5);
  
  humOscillator.start();
};

export const stopLightsaberHum = () => {
  if (humGain && audioCtx) {
    humGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);
    setTimeout(() => {
      if (humOscillator) {
        humOscillator.stop();
        humOscillator.disconnect();
        humOscillator = null;
      }
      if (humGain) {
        humGain.disconnect();
        humGain = null;
      }
    }, 300);
  }
};

let isBreathing = false;

// Synthetic Vader Breath
export const playVaderBreath = () => {
  initAudio();
  if (!audioCtx || isBreathing) return;
  
  isBreathing = true;

  // Creates a white noise buffer
  const bufferSize = audioCtx.sampleRate * 3; // 3 seconds
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  
  const whiteNoise = audioCtx.createBufferSource();
  whiteNoise.buffer = buffer;
  
  // Filter to make it sound like breath inside a mask
  const bandpass = audioCtx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.value = 800;
  bandpass.Q.value = 0.5;

  const lowpass = audioCtx.createBiquadFilter();
  lowpass.type = 'lowpass';
  lowpass.frequency.value = 1500;

  const gain = audioCtx.createGain();
  
  whiteNoise.connect(bandpass);
  bandpass.connect(lowpass);
  lowpass.connect(gain);
  gain.connect(audioCtx.destination);
  
  // Envelope for the breath (inhale ... exhale)
  const cx = audioCtx.currentTime;
  gain.gain.setValueAtTime(0, cx);
  
  // Inhale
  gain.gain.linearRampToValueAtTime(0.12, cx + 1.0);
  gain.gain.linearRampToValueAtTime(0, cx + 1.4);
  
  // Exhale
  gain.gain.linearRampToValueAtTime(0.08, cx + 1.6);
  gain.gain.linearRampToValueAtTime(0, cx + 2.8);

  whiteNoise.start(cx);
  
  setTimeout(() => {
    isBreathing = false;
  }, 3000);
};
