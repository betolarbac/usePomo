import { Button } from "@/components/ui/button";
import { PomodoroStage } from "./timer";
import { Brain, GlassWater } from "lucide-react";

type PomodoroNextStageProps = {
  currentStage: PomodoroStage;
  nextStage: PomodoroStage;
};

export default function PomodoroNextStage({
  currentStage,
  nextStage,
}: PomodoroNextStageProps) {
  const getStageButton = (stage: PomodoroStage) => {
    switch (stage) {
      case "focus":
        return (
          <Button className="bg-primary/10 hover:bg-primary/10 border border-primary text-primary text-sm font-semibold">
            <Brain className="text-primary mr-2" />
            Foco
          </Button>
        );
      case "shortBreak":
        return (
          <Button className="bg-amber-400/10 hover:bg-amber-400/10 border border-amber-500 text-amber-500 text-sm font-semibold">
            <GlassWater className="text-amber-500 mr-2" />
            Pausa Curta
          </Button>
        );
      case "longBreak":
        return (
          <Button className="bg-cyan-400/10 hover:bg-cyan-400/10 border border-cyan-500 text-cyan-500 text-sm font-semibold">
            <GlassWater className="text-cyan-500 mr-2" />
            Pausa Longa
          </Button>
        );
    }
  };

  return (
    <div className="flex flex-col items-stretch justify-between pt-6 gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-zinc-400 text-lg font-semibold">Modo atual:</h3>
          <p className="text-zinc-500 text-sm font-medium">
            Ciclo atual do cronômetro
          </p>
        </div>
        {getStageButton(currentStage)}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-zinc-400 text-lg font-semibold">Próximo modo:</h3>
          <p className="text-zinc-500 text-sm font-medium">
            Qual ciclo será ativado
          </p>
        </div>
        {getStageButton(nextStage)}
      </div>
    </div>
  );
}
