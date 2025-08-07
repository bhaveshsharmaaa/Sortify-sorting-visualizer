import React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "./components/ui/Button";
import { Slider } from "./components/ui/Slider";
import {
  Play,
  Pause,
  RotateCcw,
  Zap,
  BarChart3,
  Activity,
  Cpu,
  Clock,
  Sparkles,
  Code2,
  Binary,
} from "lucide-react";

// Import all sorting algorithms
import { bubbleSort } from "./algorithms/bubble-sort.js";
import { selectionSort } from "./algorithms/selection-sort.js";
import { insertionSort } from "./algorithms/insertion-sort.js";
import { quickSort } from "./algorithms/quick-sort.js";
import { mergeSort } from "./algorithms/merge-sort.js";
import { heapSort } from "./algorithms/heap-sort.js";
import { shellSort } from "./algorithms/shell-sort.js";
import { cocktailSort } from "./algorithms/cocktail-sort.js";
import { gnomeSort } from "./algorithms/gnome-sort.js";
import { countingSort } from "./algorithms/counting-sort.js";
import { oddEvenSort } from "./algorithms/odd-even-sort.js";
import { combSort } from "./algorithms/comb-sort.js";
import { cycleSort } from "./algorithms/cycle-sort.js";
import { radixSort } from "./algorithms/radix-sort.js";
import { bucketSort } from "./algorithms/bucket-sort.js";
import { pigeonholeSort } from "./algorithms/pigeonhole-sort.js";
import { algorithms } from "./lib/utils.jsx";

export default function Component() {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(25);
  const [speed, setSpeed] = useState(50);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble");
  const [currentStep, setCurrentStep] = useState(0);
  const [sortingSteps, setSortingSteps] = useState([]);
  const [comparing, setComparing] = useState([]);
  const [swapping, setSwapping] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [pivot, setPivot] = useState([]);
  const [auxiliary, setAuxiliary] = useState([]);
  const [stats, setStats] = useState({
    comparisons: 0,
    swaps: 0,
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
  });
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [finalTime, setFinalTime] = useState(null);
  const [particles, setParticles] = useState([]);

  const intervalRef = useRef(null);
  const timerRef = useRef(null);
  const audioContextRef = useRef(null);
  const particleAnimationRef = useRef(null);

  const initParticles = useCallback(() => {
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
  }, []);

  const animateParticles = useCallback(() => {
    setParticles((prevParticles) =>
      prevParticles.map((particle) => {
        let newX = particle.x + particle.vx;
        let newY = particle.y + particle.vy;
        let newVx = particle.vx;
        let newVy = particle.vy;

        // Bounce off edges
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

    particleAnimationRef.current = requestAnimationFrame(animateParticles);
  }, []);

  useEffect(() => {
    initParticles();
    animateParticles();

    return () => {
      if (particleAnimationRef.current) {
        cancelAnimationFrame(particleAnimationRef.current);
      }
    };
  }, [initParticles, animateParticles]);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playBeep = useCallback(
    (frequency, duration = 50, volume = 0.1) => {
      try {
        const audioContext = initAudioContext();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(
          frequency,
          audioContext.currentTime
        );
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
    },
    [initAudioContext]
  );

  const playCompareSound = useCallback(
    () => playBeep(800, 30, 0.05),
    [playBeep]
  );
  const playSwapSound = useCallback(() => playBeep(400, 50, 0.08), [playBeep]);
  const playSortedSound = useCallback(() => {
    setTimeout(() => playBeep(523, 200, 0.1), 0);
    setTimeout(() => playBeep(659, 200, 0.1), 50);
    setTimeout(() => playBeep(784, 200, 0.1), 100);
    setTimeout(() => playBeep(1047, 300, 0.1), 150);
  }, [playBeep]);
  const playHoverSound = useCallback(
    () => playBeep(1200, 20, 0.03),
    [playBeep]
  );
  const playClickSound = useCallback(() => playBeep(600, 40, 0.06), [playBeep]);

  const startTimer = useCallback(() => {
    const now = Date.now();
    setStartTime(now);
    setElapsedTime(0);
    setFinalTime(null);

    timerRef.current = setInterval(() => {
      setElapsedTime(Date.now() - now);
    }, 10);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (startTime) {
      const final = Date.now() - startTime;
      setFinalTime(final);
    }
  }, [startTime]);

  const formatTime = useCallback((ms) => {
    const seconds = Math.floor(ms / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${seconds}.${milliseconds.toString().padStart(2, "0")}s`;
  }, []);

  const generateArray = useCallback(() => {
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
  }, [arraySize]);

  useEffect(() => {
    generateArray();
  }, [generateArray]);

  useEffect(() => {
    generateArray();
  }, [generateArray]);

  const getSortingSteps = (algorithm, arr) => {
    if (!arr || arr.length === 0) return [];

    switch (algorithm) {
      case "bubble":
        return bubbleSort(arr, setStats);
      case "selection":
        return selectionSort(arr, setStats);
      case "insertion":
        return insertionSort(arr, setStats);
      case "quick":
        return quickSort(arr, setStats);
      case "merge":
        return mergeSort(arr, setStats);
      case "heap":
        return heapSort(arr, setStats);
      case "shell":
        return shellSort(arr, setStats);
      case "cocktail":
        return cocktailSort(arr, setStats);
      case "gnome":
        return gnomeSort(arr, setStats);
      case "counting":
        return countingSort(arr, setStats);
      case "oddeven":
        return oddEvenSort(arr, setStats);
      case "comb":
        return combSort(arr, setStats);
      case "cycle":
        return cycleSort(arr, setStats);
      case "radix":
        return radixSort(arr, setStats);
      case "bucket":
        return bucketSort(arr, setStats);
      case "pigeonhole":
        return pigeonholeSort(arr, setStats);
      default:
        return bubbleSort(arr, setStats);
    }
  };

  const startSorting = () => {
    playClickSound();

    if (isPaused && sortingSteps.length > 0) {
      setIsPaused(false);
      setIsRunning(true);
      startTimer();
      return;
    }

    const steps = getSortingSteps(selectedAlgorithm, array);
    setSortingSteps(steps);
    setCurrentStep(0);
    setIsRunning(true);
    setIsPaused(false);
    startTimer();
  };

  const pauseSorting = () => {
    playClickSound();
    setIsPaused(true);
    setIsRunning(false);
    stopTimer();
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const resetSorting = () => {
    playClickSound();
    setIsRunning(false);
    setIsPaused(false);
    setCurrentStep(0);
    setSortingSteps([]);
    setComparing([]);
    setSwapping([]);
    setSorted([]);
    setPivot([]);
    setAuxiliary([]);
    stopTimer();
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    generateArray();
  };

  useEffect(() => {
    if (isRunning && !isPaused && sortingSteps.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= sortingSteps.length - 1) {
            setIsRunning(false);
            stopTimer();
            playSortedSound();
            return prev;
          }

          const step = sortingSteps[prev + 1];
          setArray([...step.array]);
          setComparing([...(step.comparing || [])]);
          setSwapping([...(step.swapping || [])]);
          setSorted([...(step.sorted || [])]);
          setPivot([...(step.pivot || [])]);
          setAuxiliary([...(step.auxiliary || [])]);

          // Play sounds based on step type
          if (step.comparing && step.comparing.length > 0) {
            playCompareSound();
          } else if (step.swapping && step.swapping.length > 0) {
            playSwapSound();
          }

          return prev + 1;
        });
      }, 101 - speed);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [
    isRunning,
    isPaused,
    sortingSteps,
    speed,
    stopTimer,
    playSortedSound,
    playCompareSound,
    playSwapSound,
  ]);

  const getBarColor = (index) => {
    if (sorted.includes(index)) return "#00ff41";
    if (pivot && pivot.includes(index)) return "#ff6b35";
    if (swapping.includes(index)) return "#ff0080";
    if (comparing.includes(index)) return "#00ffff";
    if (auxiliary && auxiliary.includes(index)) return "#ffff00";
    return "#00ff41";
  };

  const getBarGlow = (index) => {
    if (sorted.includes(index)) return "0 0 20px #00ff41, 0 0 40px #00ff41";
    if (pivot && pivot.includes(index))
      return "0 0 20px #ff6b35, 0 0 40px #ff6b35";
    if (swapping.includes(index)) return "0 0 20px #ff0080, 0 0 40px #ff0080";
    if (comparing.includes(index)) return "0 0 20px #00ffff, 0 0 40px #00ffff";
    if (auxiliary && auxiliary.includes(index))
      return "0 0 20px #ffff00, 0 0 40px #ffff00";
    return "none";
  };

  const getCurrentAlgorithm = () => {
    return Object.values(algorithms)
      .flat()
      .find((algo) => algo.id === selectedAlgorithm);
  };

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  const maxValue = array.length > 0 ? Math.max(...array) : 1;
  const progress =
    sortingSteps.length > 0 ? (currentStep / sortingSteps.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-green-400 font-mono p-4 relative overflow-hidden">
      {/* Animated Game-like Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0 animate-pulse"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,255,65,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,255,65,0.3) 1px, transparent 1px)
              `,
              backgroundSize: "30px 30px",
              animation: "gridMove 20s linear infinite",
            }}
          />
        </div>

        {/* Floating Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              animation: `float ${3 + (particle.id % 3)}s ease-in-out infinite`,
            }}
          />
        ))}

        {/* Animated Geometric Shapes */}
        <div
          className="absolute top-20 left-10 w-20 h-20 border border-cyan-400 opacity-20 animate-spin"
          style={{ animationDuration: "20s" }}
        />
        <div className="absolute top-40 right-20 w-16 h-16 border border-purple-400 opacity-20 animate-bounce" />
        <div className="absolute bottom-40 left-20 w-24 h-24 border border-yellow-400 opacity-20 animate-pulse" />
        <div
          className="absolute bottom-20 right-40 w-12 h-12 border border-pink-400 opacity-20 animate-spin"
          style={{ animationDuration: "15s" }}
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 via-transparent to-cyan-900/10 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Beautiful Enhanced Header */}
        <div className="text-center mb-12 relative">
          {/* Animated Border Lines */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-60 animate-pulse" />
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40" />
          {/* Main Title with Enhanced Effects */}
          <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center flex justify-center items-center sm:text-left relative">
              <span className="bg-gradient-to-r from-green-300 via-green-400 to-cyan-400 bg-clip-text text-transparent animate-pulse flex justify-center sm:justify-start items-center">
                {"> SORTING_VISUALIZER"}
              </span>

              {/* Background glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400/20 to-cyan-400/20 blur-xl animate-pulse pointer-events-none -z-10" />
            </h1>

            {/* Decorative Icons */}
            <div className="hidden sm:block absolute top-1/2 left-2 sm:-left-8 md:-left-12 lg:-left-16 transform -translate-y-1/2">
              <Code2
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-green-400 animate-spin"
                style={{ animationDuration: "8s" }}
                aria-hidden="true"
              />
            </div>
            <div className="hidden sm:block absolute top-1/2 right-2 sm:-right-8 md:-right-12 lg:-right-16 transform -translate-y-1/2">
              <Binary
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-cyan-400 animate-bounce"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Subtitle with Animation */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
            <p className="text-lg opacity-90 bg-gradient-to-r from-green-300 to-cyan-300 bg-clip-text text-transparent font-semibold">
              [INITIALIZING] Quantum Algorithm Visualization Matrix...
            </p>
            <Sparkles
              className="w-5 h-5 text-yellow-400 animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
          </div>
          {/* Status Indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div
              className={`w-3 h-3 rounded-full animate-pulse shadow-lg ${
                isOnline
                  ? "bg-green-400 shadow-green-400/50"
                  : "bg-red-500 shadow-red-500/50"
              }`}
            />
            <p className="text-sm opacity-80">
              • SYSTEM STATUS:{" "}
              <span
                className={`font-bold animate-pulse ${
                  isOnline ? "text-green-300" : "text-red-400"
                }`}
              >
                {isOnline ? "ONLINE" : "OFFLINE"}
              </span>
            </p>
            <div
              className={`w-3 h-3 rounded-full animate-pulse shadow-lg ${
                isOnline
                  ? "bg-green-400 shadow-green-400/50"
                  : "bg-red-500 shadow-red-500/50"
              }`}
              style={{ animationDelay: "0.3s" }}
            />
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-0 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-60" />
          <div className="absolute top-8 right-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-pulse" />
          <div className="absolute bottom-0 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" />
        </div>

        {/* Enhanced Algorithm Selection Matrix */}
        <div className="border-2 border-green-400 rounded-lg p-6 mb-8 bg-black/50 backdrop-blur-sm shadow-2xl shadow-green-400/20 relative overflow-hidden">
          {/* Background Animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 via-transparent to-cyan-900/10 animate-pulse" />

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-6 relative z-10">
            <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 animate-pulse" />
            <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              {"> ALGORITHM_SELECTION_MATRIX"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {Object.entries(algorithms).map(
              ([category, algos], categoryIndex) => (
                <div key={category} className="space-y-3">
                  <h3
                    className={`font-bold mb-3 flex items-center gap-2 ${
                      categoryIndex === 0
                        ? "text-red-400"
                        : categoryIndex === 1
                        ? "text-purple-400" // Changed from green to purple
                        : categoryIndex === 2
                        ? "text-yellow-400"
                        : "text-blue-400"
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    {category === "basic"
                      ? "Basic Comparison"
                      : category === "advanced"
                      ? "Advanced Comparison"
                      : category === "hybrid"
                      ? "Hybrid Comparison"
                      : "Non-Comparison-Based"}{" "}
                    Algorithms
                  </h3>
                  {algos.map((algo) => (
                    <button
                      key={algo.id}
                      onClick={() => {
                        if (!isRunning) {
                          playClickSound();
                          setSelectedAlgorithm(algo.id);
                        }
                      }}
                      onMouseEnter={() => playHoverSound()}
                      disabled={isRunning}
                      className={`block w-full text-left text-sm p-3 mb-2 rounded-md border transition-all duration-300 relative overflow-hidden ${
                        selectedAlgorithm === algo.id
                          ? "bg-green-400 text-black border-green-400 shadow-lg shadow-green-400/50 scale-105"
                          : "border-gray-600 hover:border-green-400 hover:bg-green-400/10 hover:shadow-md hover:shadow-green-400/30"
                      } ${
                        isRunning
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer hover:scale-102"
                      }`}
                    >
                      {selectedAlgorithm === algo.id && (
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-cyan-400/20 to-green-400/20 animate-pulse" />
                      )}
                      <div className="relative z-10">
                        <div className="font-semibold">{algo.name}</div>
                        <div className="text-xs opacity-75">
                          Time: {algo.complexity} | Space: {algo.space}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )
            )}
          </div>

          <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
              <div>
                <span className="text-yellow-400 font-semibold">SELECTED:</span>
                <div className="text-green-300 font-bold">
                  {getCurrentAlgorithm()?.name}
                </div>
              </div>
              <div>
                <span className="text-cyan-400 font-semibold">
                  TIME COMPLEXITY:
                </span>
                <div className="text-green-300 font-bold">
                  {getCurrentAlgorithm()?.complexity}
                </div>
              </div>
              <div>
                <span className="text-magenta-400 font-semibold">
                  SPACE COMPLEXITY:
                </span>
                <div className="text-green-300 font-bold">
                  {getCurrentAlgorithm()?.space}
                </div>
              </div>
              <div>
                <span className="text-orange-400 font-semibold">STATUS:</span>
                <div className="text-green-300 font-bold">
                  {isRunning ? "RUNNING" : "READY"}
                </div>
              </div>
              <div>
                <span className="text-purple-400 font-semibold">
                  PROCESS TIME:
                </span>
                <div className="text-green-300 font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {finalTime ? formatTime(finalTime) : formatTime(elapsedTime)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Statistics Panel */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-black/50 border border-green-400 rounded-lg p-4 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-transparent animate-pulse" />
            <div className="flex items-center gap-2 mb-2 relative z-10">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-sm font-semibold">
                COMPARISONS
              </span>
            </div>
            <div className="text-2xl font-bold text-green-300 relative z-10">
              {stats.comparisons.toLocaleString()}
            </div>
          </div>

          <div className="bg-black/50 border border-green-400 rounded-lg p-4 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent animate-pulse" />
            <div className="flex items-center gap-2 mb-2 relative z-10">
              <Activity className="w-4 h-4 text-magenta-400" />
              <span className="text-magenta-400 text-sm font-semibold">
                SWAPS
              </span>
            </div>
            <div className="text-2xl font-bold text-green-300 relative z-10">
              {stats.swaps.toLocaleString()}
            </div>
          </div>

          <div className="bg-black/50 border border-green-400 rounded-lg p-4 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 to-transparent animate-pulse" />
            <div className="flex items-center gap-2 mb-2 relative z-10">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 text-sm font-semibold">
                ARRAY SIZE
              </span>
            </div>
            <div className="text-2xl font-bold text-green-300 relative z-10">
              {array.length}
            </div>
          </div>

          <div className="bg-black/50 border border-green-400 rounded-lg p-4 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 to-transparent animate-pulse" />
            <div className="flex items-center gap-2 mb-2 relative z-10">
              <Cpu className="w-4 h-4 text-orange-400" />
              <span className="text-orange-400 text-sm font-semibold">
                STEP
              </span>
            </div>
            <div className="text-2xl font-bold text-green-300 relative z-10">
              {currentStep}/{Math.max(sortingSteps.length - 1, 0)}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {isRunning && (
          <div className="my-6 w-full max-w-full mx-auto">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-cyan-400 font-semibold">PROGRESS</span>
              <span className="text-green-400 font-bold">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden border border-green-400/30">
              <div
                className="h-full bg-gradient-to-r from-green-400 via-cyan-400 to-green-400 transition-all duration-100 ease-in-out relative will-change-[width]"
                style={{ width: `${Math.round(progress)}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Visualization */}
        <div
          className="border-2 border-green-400 rounded-lg p-6 mb-8 
  h-[35rem] sm:h-[28rem] md:h-96 
  bg-black/50 backdrop-blur-sm shadow-2xl shadow-green-400/20 
  relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 via-transparent to-cyan-900/10 animate-pulse" />

          {/* Legend (Responsive & Wrapping) */}
          <div className="absolute top-4 left-4 right-4 text-sm opacity-75 relative z-10">
            <div className="flex flex-wrap gap-4">
              {[
                {
                  color: "bg-green-400",
                  label: "Normal/Sorted",
                  glow: "#00ff41",
                },
                { color: "bg-cyan-400", label: "Comparing", glow: "#00ffff" },
                { color: "bg-pink-400", label: "Swapping", glow: "#ff0080" },
                { color: "bg-orange-400", label: "Pivot", glow: "#ff6b35" },
              ].map(({ color, label, glow }, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 ${color} rounded`}
                    style={{ boxShadow: `0 0 10px ${glow}` }}
                  />
                  <span className="whitespace-nowrap">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="h-full w-full flex items-end justify-center gap-[0.2vw] pt-12 px-[2vw] relative z-10">
            {array.map((value, index) => {
              const barHeightPercent = (value / maxValue) * 100;
              const barWidth = Math.max(100 / array.length, 2); // responsive
              const fontSize = `${Math.max(1, 10 - array.length / 20)}px`;

              return (
                <div
                  key={index}
                  className="transition-all duration-200 ease-out transform hover:scale-105 rounded-t-sm relative flex flex-col items-center"
                  onMouseEnter={() => playHoverSound()}
                  style={{
                    height: `max(${barHeightPercent}%, 10px)`,
                    width: `${barWidth}vw`,
                    backgroundColor: getBarColor(index),
                    boxShadow: getBarGlow(index),
                    border: sorted.includes(index)
                      ? "1px solid #00ff41"
                      : "none",
                  }}
                >
                  {/* Value label */}
                  <div
                    className="absolute -top-5 text-xs font-bold text-green-300 bg-black/70 px-1 rounded border border-green-400/30"
                    style={{
                      fontSize,
                      minWidth: "16px",
                      textAlign: "center",
                    }}
                  >
                    {value}
                  </div>

                  {(comparing.includes(index) || swapping.includes(index)) && (
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent animate-pulse" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Control Panel */}
        <div className="border-2 border-green-400 rounded-lg p-6 bg-black/50 backdrop-blur-sm shadow-2xl shadow-green-400/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 via-transparent to-cyan-900/10 animate-pulse" />

          <div className="flex items-center gap-3 mb-6 relative z-10">
            <Activity className="w-6 h-6 text-green-400 animate-pulse" />
            <h2 className="text-xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              {"> CONTROL_PANEL"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end relative z-10">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-cyan-400">
                ARRAY_SIZE
              </label>
              <Slider
                value={[arraySize]}
                onValueChange={(value) => {
                  if (!isRunning) {
                    playHoverSound();
                    setArraySize(value[0]);
                  }
                }}
                min={1}
                max={100}
                step={1}
                disabled={isRunning}
                className="w-full"
              />
              <div className="text-sm text-center bg-gray-800 rounded px-3 py-1 border border-green-400/30">
                {arraySize} elements
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-magenta-400">
                SPEED
              </label>
              <Slider
                value={[speed]}
                onValueChange={(value) => {
                  playHoverSound();
                  setSpeed(value[0]);
                }}
                min={1}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="text-sm text-center bg-gray-800 rounded px-3 py-1 border border-green-400/30">
                {speed}% speed
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-yellow-400">
                ACTIONS
              </label>
              <div className="flex gap-3">
                <Button
                  onClick={isRunning ? pauseSorting : startSorting}
                  onMouseEnter={() => playHoverSound()}
                  disabled={array.length === 0}
                  size="sm"
                  className="bg-green-400 text-black hover:bg-green-300 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-400/50 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse" />
                  {isRunning ? (
                    <Pause className="w-4 h-4 relative z-10" />
                  ) : (
                    <Play className="w-4 h-4 relative z-10" />
                  )}
                </Button>
                <Button
                  onClick={resetSorting}
                  onMouseEnter={() => playHoverSound()}
                  size="sm"
                  variant="outline"
                  className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-400/50"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-orange-400">
                EXECUTE
              </label>
              <Button
                onClick={startSorting}
                onMouseEnter={() => playHoverSound()}
                disabled={isRunning || array.length === 0}
                className="w-full bg-gradient-to-r from-green-400 to-cyan-400 text-black hover:from-green-300 hover:to-cyan-300 font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-400/50 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 animate-pulse" />
                <Zap className="w-4 h-4 mr-2 relative z-10" />
                <span className="relative z-10">INITIALIZE</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="mt-8 text-xs opacity-60 flex flex-col sm:flex-row sm:justify-between items-center border-t border-green-400/30 pt-4 gap-y-2 relative text-center sm:text-left">
          <span className="w-full sm:w-auto">© Sortify</span>

          <span className="w-full sm:w-auto">
            COMPILED WITH{" "}
            <span className="text-red-500 font-extrabold">&lt;3</span> BY Akash
            &amp; Bhavesh
          </span>

          <div className="flex gap-4">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
            <div
              className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-400/50"
              style={{ animationDelay: "1s" }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(30px, 30px);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}
