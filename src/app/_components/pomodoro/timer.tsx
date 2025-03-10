"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw } from "lucide-react";

type PomodoroStage = "focus" | "shortBreak" | "longBreak";

const stageDurations = {
  focus: 25 * 60, // 25 minutes
  shortBreak: 5 * 60, // 5 minutes
  longBreak: 15 * 60, // 15 minutes
};

const stageSequence: PomodoroStage[] = [
  "focus",
  "shortBreak",
  "focus",
  "shortBreak",
  "focus",
  "shortBreak",
  "focus",
  "longBreak",
];

export default function Timer() {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(stageDurations.focus);
  const [isRunning, setIsRunning] = useState(false);

  const currentStage = stageSequence[currentStageIndex];
  const totalDuration = stageDurations[currentStage];
  const percentage = ((totalDuration - timeLeft) / totalDuration) * 100;
  
  const moveToNextStage = () => {
    const nextIndex = (currentStageIndex + 1) % stageSequence.length;
    setCurrentStageIndex(nextIndex);
    setTimeLeft(stageDurations[stageSequence[nextIndex]]);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      moveToNextStage();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(stageDurations[currentStage]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getStageColor = () => {
    switch (currentStage) {
      case "focus":
        return "text-primary";
      case "shortBreak":
        return "text-amber-500";
      case "longBreak":
        return "text-cyan-500";
      default:
        return "text-primary";
    }
  };

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center space-y-6 p-6 max-w-md mx-auto">
      <div className="relative w-56 h-56">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-muted stroke-current text-zinc-800"
            strokeWidth="5"
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
          />
          <circle
            className={`stroke-current ${getStageColor()}`}
            strokeWidth="5"
            strokeLinecap="round"
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
              transition: "stroke-dashoffset 0.5s ease",
            }}
            transform="rotate(-90 50 50)"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-zinc-100">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button onClick={resetTimer} variant="outline">
          <RotateCcw />
        </Button>

        {isRunning ? (
          <Button onClick={pauseTimer} variant="default">
            <Pause />
          </Button>
        ) : (
          <Button onClick={startTimer} variant="default">
            <Play />
          </Button>
        )}
      </div>
    </div>
  );
}
