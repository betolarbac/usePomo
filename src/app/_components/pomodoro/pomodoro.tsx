import { Button } from "@/components/ui/button";
import { Brain, GlassWater, Hourglass } from "lucide-react";
import Timer from "./timer";

export default function Pomodoro() {
  return (
    <div className="border rounded-xl border-zinc-800 p-6 flex-1">
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

      <div className="flex flex-col items-stretch justify-between pt-6 gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-zinc-400 text-lg font-semibold">Modo atual:</h3>
            <p className="text-zinc-500 text-sm font-medium">
              Cíclo atual do cronômetro
            </p>
          </div>

          <Button className="bg-primary/10 hover:bg-primary/10 border border-primary text-primary text-sm font-semibold">
            <Brain className="text-primary"/>
            Foco
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-zinc-400 text-lg font-semibold">
              Próximo modo:
            </h3>
            <p className="text-zinc-500 text-sm font-medium">
              Qual cíclo será ativado
            </p>
          </div>

          <Button className="bg-cyan-400/10 hover:bg-primary/10 border border-cyan-500 text-cyan-500 text-sm font-semibold">
            <GlassWater className="text-cyan-500"/>
            Pausa Longa
          </Button>
        </div>
      </div>

      <div>
        <Timer />
      </div>
    </div>
  );
}
