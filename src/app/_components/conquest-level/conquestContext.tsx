"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useLevelContext } from "../level-progress/levelContext";


export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requiredAmount: number;
  currentAmount: number;
  unlocked: boolean;
  category: "sessions" | "focus" | "streak";
}

interface ConquestContextType {
  achievements: Achievement[];
  updateAchievement: (
    category: "sessions" | "focus" | "streak",
    amount: number
  ) => void;
  focusTimeAccumulated: number;
  setFocusTimeAccumulated: (time: number) => void;
}

const ConquestContext = createContext<ConquestContextType | undefined>(
  undefined
);

export function useConquestContext() {
  const context = useContext(ConquestContext);
  if (!context) {
    throw new Error(
      "useConquestContext must be used within a ConquestProvider"
    );
  }
  return context;
}

const initialAchievements: Achievement[] = [
  {
    id: "first-session",
    name: "Primeiro Passo",
    description: "Complete sua primeira sessão de foco",
    icon: "🚀",
    requiredAmount: 1,
    currentAmount: 0,
    unlocked: false,
    category: "sessions",
  },
  {
    id: "five-sessions",
    name: "Ficando Produtivo",
    description: "Complete 5 sessões de foco",
    icon: "⚡",
    requiredAmount: 5,
    currentAmount: 0,
    unlocked: false,
    category: "sessions",
  },
  {
    id: "twenty-sessions",
    name: "Mestre da Produtividade",
    description: "Complete 20 sessões de foco",
    icon: "🏆",
    requiredAmount: 20,
    currentAmount: 0,
    unlocked: false,
    category: "sessions",
  },
  {
    id: "one-hour",
    name: "Hora do Poder",
    description: "Acumule 1 hora de tempo de foco",
    icon: "⏱️",
    requiredAmount: 60,
    currentAmount: 0,
    unlocked: false,
    category: "focus",
  },
  {
    id: "five-hours",
    name: "Trabalhador Profundo",
    description: "Acumule 5 horas de tempo de foco",
    icon: "🧠",
    requiredAmount: 300,
    currentAmount: 0,
    unlocked: false,
    category: "focus",
  },
  {
    id: "three-day-streak",
    name: "Consistência Começa",
    description: "Mantenha um streak de 3 dias",
    icon: "🔥",
    requiredAmount: 3,
    currentAmount: 0,
    unlocked: false,
    category: "streak",
  },
  {
    id: "seven-day-streak",
    name: "Guerreiro Semanal",
    description: "Mantenha um streak de 7 dias",
    icon: "🌟",
    requiredAmount: 7,
    currentAmount: 0,
    unlocked: false,
    category: "streak",
  },
];

interface ConquestProviderProps {
  children: ReactNode;
}

export function ConquestProvider({ children }: ConquestProviderProps) {
  const [achievements, setAchievements] =
    useState<Achievement[]>(initialAchievements);
  const { sessionsCompleted, streak } = useLevelContext();
  const [focusTimeAccumulated, setFocusTimeAccumulated] = useState(0);

  useEffect(() => {
    const storedAchievements = localStorage.getItem("pomodoro-achievements");
    const storedFocusMinutes = localStorage.getItem("pomodoro-focus-minutes");

    if (storedAchievements) {
      setAchievements(JSON.parse(storedAchievements));
    } else {
      setAchievements((prevAchievements) =>
        prevAchievements.map((achievement) => {
          if (achievement.category === "sessions") {
            return {
              ...achievement,
              currentAmount: sessionsCompleted,
              unlocked: sessionsCompleted >= achievement.requiredAmount,
              notificationShown:
                sessionsCompleted >= achievement.requiredAmount, 
            };
          } else if (achievement.category === "streak") {
            return {
              ...achievement,
              currentAmount: streak,
              unlocked: streak >= achievement.requiredAmount,
              notificationShown: streak >= achievement.requiredAmount, 
            };
          } else if (achievement.category === "focus") {
            const focusTime = storedFocusMinutes
              ? parseInt(storedFocusMinutes, 10)
              : 0;
            return {
              ...achievement,
              currentAmount: focusTime,
              unlocked: focusTime >= achievement.requiredAmount,
              notificationShown: focusTime >= achievement.requiredAmount, 
            };
          }
          return achievement;
        })
      );
    }

    if (storedFocusMinutes) {
      setFocusTimeAccumulated(parseInt(storedFocusMinutes, 10));
    }
  }, []); 

  useEffect(() => {
    localStorage.setItem("pomodoro-achievements", JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem(
      "pomodoro-focus-minutes",
      focusTimeAccumulated.toString()
    );
  }, [focusTimeAccumulated]);

  const updateAchievement = (
    category: "sessions" | "focus" | "streak",
    amount: number
  ) => {
    setAchievements((prevAchievements) =>
      prevAchievements.map((achievement) => {
        if (achievement.category === category) {
          const newAmount =
            category === "focus"
              ? amount
              : category === "sessions"
              ? sessionsCompleted
              : streak;

          const alreadyUnlocked = achievement.unlocked;
          const shouldBeUnlocked = newAmount >= achievement.requiredAmount;

          return {
            ...achievement,
            currentAmount: newAmount,
            unlocked: alreadyUnlocked || shouldBeUnlocked, 
          };
        }
        return achievement;
      })
    );
  };

  useEffect(() => {
    setAchievements((prevAchievements) =>
      prevAchievements.map((achievement) => {
        if (
          achievement.category === "sessions" ||
          achievement.category === "streak"
        ) {
          const newAmount =
            achievement.category === "sessions" ? sessionsCompleted : streak;
          const alreadyUnlocked = achievement.unlocked;
          const shouldBeUnlocked = newAmount >= achievement.requiredAmount;

          return {
            ...achievement,
            currentAmount: newAmount,
            unlocked: alreadyUnlocked || shouldBeUnlocked,
          };
        }
        return achievement;
      })
    );
  }, [sessionsCompleted, streak]);

  return (
    <ConquestContext.Provider
      value={{
        achievements,
        updateAchievement,
        focusTimeAccumulated,
        setFocusTimeAccumulated,
      }}
    >
      {children}
    </ConquestContext.Provider>
  );
}
