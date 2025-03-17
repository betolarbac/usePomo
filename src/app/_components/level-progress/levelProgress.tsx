
"use client";
import { Progress } from "@/components/ui/progress";
import { Flame, Star } from "lucide-react";
import { useLevelContext } from "./levelContext";
import ConquestLevel from "../conquest-level/conquestLevel";

export default function LevelProgress() {
  const { level, points, streak, sessionsCompleted } = useLevelContext();
  
  const pointsForNextLevel = level * 10;
  
  const progressPercentage = (points / pointsForNextLevel) * 100;

  return (
    <div className="mt-12 mb-6 border rounded-xl border-zinc-800 p-6 flex-1">
      <div className="flex justify-end">
        <ConquestLevel />
      </div>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold bg-primary/10 hover:bg-primary/10 border border-primary text-primary">
            {level}
          </div>
          <div>
            <p className="text-zinc-400 text-sm font-bold">Level {level}</p>
            <p className="text-xs text-zinc-500">{points} / {pointsForNextLevel} XP</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className="font-medium text-zinc-500">{pointsForNextLevel} points</span>
        </div>
      </div>
      <Progress value={progressPercentage} className="h-2 my-2" />

      <div className="mt-auto">
        <div className="flex justify-between items-center">
          <p className="text-center text-sm text-gray-600">
            {sessionsCompleted > 0 
              ? `${sessionsCompleted} sessions completed` 
              : "No sessions completed yet"}
          </p>
          <div className="flex items-center gap-1">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium text-orange-500">
              {streak > 0 
                ? `${streak} day streak` 
                : "Start your streak today!"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
