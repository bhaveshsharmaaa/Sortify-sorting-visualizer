// utils/sortingHelpers.js

export const initParticles = (setParticles) => {
  const newParticles = [];
  const colors = [
    "#00ff41",
    "#00ffff",
    "#ff0080",
    "#ffff00",
    "#ff6b35",
    "#8b5cf6",
  ];

  for (let i = 0; i < 50; i++) {
    newParticles.push({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }
  setParticles(newParticles);
};

export const animateParticles = (setParticles, particleAnimationRef) => {
  setParticles((prevParticles) =>
    prevParticles.map((particle) => {
      let newX = particle.x + particle.vx;
      let newY = particle.y + particle.vy;
      let newVx = particle.vx;
      let newVy = particle.vy;

      if (newX <= 0 || newX >= window.innerWidth) {
        newVx = -newVx;
        newX = Math.max(0, Math.min(window.innerWidth, newX));
      }
      if (newY <= 0 || newY >= window.innerHeight) {
        newVy = -newVy;
        newY = Math.max(0, Math.min(window.innerHeight, newY));
      }

      return {
        ...particle,
        x: newX,
        y: newY,
        vx: newVx,
        vy: newVy,
        opacity: 0.1 + Math.sin(Date.now() * 0.001 + particle.id) * 0.2,
      };
    })
  );

  particleAnimationRef.current = requestAnimationFrame(() =>
    animateParticles(setParticles, particleAnimationRef)
  );
};

export const initAudioContext = (audioContextRef) => {
  if (!audioContextRef.current) {
    audioContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();
  }
  return audioContextRef.current;
};

export const playBeep = (
  audioContextRef,
  frequency,
  duration = 50,
  volume = 0.1
) => {
  try {
    const audioContext = initAudioContext(audioContextRef);
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(
      volume,
      audioContext.currentTime + 0.01
    );
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + duration / 1000
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
  } catch (error) {
    console.log("Audio not supported");
  }
};

export const playCompareSound = (audioContextRef) =>
  playBeep(audioContextRef, 800, 30, 0.05);
export const playSwapSound = (audioContextRef) =>
  playBeep(audioContextRef, 400, 50, 0.08);
export const playSortedSound = (audioContextRef) => {
  setTimeout(() => playBeep(audioContextRef, 523, 200, 0.1), 0);
  setTimeout(() => playBeep(audioContextRef, 659, 200, 0.1), 50);
  setTimeout(() => playBeep(audioContextRef, 784, 200, 0.1), 100);
  setTimeout(() => playBeep(audioContextRef, 1047, 300, 0.1), 150);
};
export const playHoverSound = (audioContextRef) =>
  playBeep(audioContextRef, 1200, 20, 0.03);
export const playClickSound = (audioContextRef) =>
  playBeep(audioContextRef, 600, 40, 0.06);

export const formatTime = (ms) => {
  const seconds = Math.floor(ms / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10);
  return `${seconds}.${milliseconds.toString().padStart(2, "0")}`;
};

export const startTimer = (
  setStartTime,
  setElapsedTime,
  setFinalTime,
  timerRef
) => {
  const now = Date.now();
  setStartTime(now);
  setElapsedTime(0);
  setFinalTime(null);

  timerRef.current = setInterval(() => {
    setElapsedTime(Date.now() - now);
  }, 10);
};

export const stopTimer = (startTime, setFinalTime, timerRef) => {
  if (timerRef.current) {
    clearInterval(timerRef.current);
    timerRef.current = null;
  }
  if (startTime) {
    const final = Date.now() - startTime;
    setFinalTime(final);
  }
};

export const generateArray = (
  arraySize,
  setArray,
  setCurrentStep,
  setSortingSteps,
  setComparing,
  setSwapping,
  setSorted,
  setPivot,
  setAuxiliary,
  setStats,
  setElapsedTime,
  setFinalTime,
  timerRef
) => {
  if (arraySize <= 0) return;

  const newArray = [];
  const minValue = 20;
  const maxValue = 300;
  const step = (maxValue - minValue) / arraySize;

  for (let i = 0; i < arraySize; i++) {
    const baseValue = minValue + i * step;
    const variation = (Math.random() - 0.5) * step * 0.3;
    newArray.push(Math.round(baseValue + variation));
  }

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = temp;
  }

  setArray(newArray);
  setCurrentStep(0);
  setSortingSteps([]);
  setComparing([]);
  setSwapping([]);
  setSorted([]);
  setPivot([]);
  setAuxiliary([]);
  setStats({
    comparisons: 0,
    swaps: 0,
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
  });
  setElapsedTime(0);
  setFinalTime(null);
  if (timerRef.current) {
    clearInterval(timerRef.current);
    timerRef.current = null;
  }
};
