"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LevelContextType {
  level: number;
  points: number;
  streak: number;
  sessionsCompleted: number;
  addPoints: (amount: number) => void;
  incrementSession: () => void;
}

const LevelContext = createContext<LevelContextType | undefined>(undefined);

export function useLevelContext() {
  const context = useContext(LevelContext);
  if (!context) {
    throw new Error("useLevelContext must be used within a LevelProvider");
  }
  return context;
}

interface LevelProviderProps {
  children: ReactNode;
}

export function LevelProvider({ children }: LevelProviderProps) {
  const [level, setLevel] = useState(1);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0); 
  const [sessionsCompleted, setSessionsCompleted] = useState(0); 
  const [lastSessionDate, setLastSessionDate] = useState<string | null>(null);


  const getPointsForNextLevel = (currentLevel: number) => currentLevel * 10;

  useEffect(() => {
    const storedData = localStorage.getItem('pomodoro-progress');
    if (storedData) {
      const { level, points, streak, sessionsCompleted, lastSessionDate } = JSON.parse(storedData);
      setLevel(level);
      setPoints(points);
      setStreak(streak);
      setSessionsCompleted(sessionsCompleted);
      setLastSessionDate(lastSessionDate);
      
      updateStreak(lastSessionDate);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pomodoro-progress', JSON.stringify({
      level,
      points,
      streak,
      sessionsCompleted,
      lastSessionDate
    }));
  }, [level, points, streak, sessionsCompleted, lastSessionDate]);

  const updateStreak = (lastDate: string | null) => {
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();

    if (!lastDate) {
      setStreak(1);
      setLastSessionDate(today);
    } else if (lastDate === today) {
    } else if (lastDate === yesterdayString) {
      setStreak(prev => prev + 1);
      setLastSessionDate(today);
    } else {
      setStreak(1);
      setLastSessionDate(today);
    }
  };

  const addPoints = (amount: number) => {
    const streakBonus = Math.floor(amount * (streak * 0.1));
    const totalPoints = amount + streakBonus;
    
    const newPoints = points + totalPoints;
    setPoints(newPoints);
    
    const pointsNeeded = getPointsForNextLevel(level);
    if (newPoints >= pointsNeeded) {
      setLevel(prev => prev + 1);
      setPoints(newPoints - pointsNeeded);
    }
  };

  const incrementSession = () => {
    setSessionsCompleted(prev => prev + 1);
    updateStreak(lastSessionDate);
  };

  return (
    <LevelContext.Provider value={{
      level,
      points,
      streak,
      sessionsCompleted,
      addPoints,
      incrementSession
    }}>
      {children}
    </LevelContext.Provider>
  );
}