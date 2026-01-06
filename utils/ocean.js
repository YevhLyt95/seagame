export const WAVE_SPEED = 0.5;      // Швидкість руху хвиль
export const WAVE_AMPLITUDE = 0.25;
export const getWaveHeight = (x, z, time) => {
    const waveLength = 2.5;
    const waveAmplitude = 0.25;
    const waveSpeed = 0.6;

    const wave1 = Math.sin(x / waveLength + time * waveSpeed) * waveAmplitude;
    const wave2 = Math.sin(z / (waveLength * 1.5) + time * (waveSpeed * 0.8)) * waveAmplitude;
  
    return wave1 + wave2;
}