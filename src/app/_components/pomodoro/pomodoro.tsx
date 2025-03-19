"use client";
import { Hourglass } from "lucide-react";
import Timer, { PomodoroStage } from "./timer";
import { useState } from "react";
import PomodoroNextStage from "./pomodoroNextStage";

export default function Pomodoro() {
  const [currentStage, setCurrentStage] = useState<PomodoroStage>("focus");
  const [nextStage, setNextStage] = useState<PomodoroStage>("shortBreak");

  return (
    <div className="border rounded-xl border-zinc-800 p-4 xl:p-6 flex-1">
      <div className="flex items-center justify-between border-b-[1px] border-zinc-800 pb-6">
        <div>
          <h3 className="text-zinc-400 text-2xl font-bold">Dados da sessão</h3>
          <p className="text-zinc-500 text-base font-normal">
            Acompanhe os próximos cíclos
          </p>
        </div>

        <div className="bg-zinc-800 p-2 rounded-sm">
          <Hourglass className="text-zinc-500" />
        </div>
      </div>

      <PomodoroNextStage currentStage={currentStage} nextStage={nextStage} />

      <div>
        <Timer
          onStageChange={(current, next) => {
            setCurrentStage(current);
            setNextStage(next);
          }}
        />
      </div>
    </div>
  );
}
