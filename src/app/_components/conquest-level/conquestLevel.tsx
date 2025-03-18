import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trophy } from "lucide-react";
import { useConquestContext, Achievement } from "./conquestContext";
import { Progress } from "@/components/ui/progress";

export default function ConquestLevel() {
  const { achievements } = useConquestContext();
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  
  const filteredAchievements = achievements.filter(achievement => {
    if (filter === 'all') return true;
    if (filter === 'unlocked') return achievement.unlocked;
    if (filter === 'locked') return !achievement.unlocked;
    return true;
  });

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <div className="mb-2">
      <Dialog>
      <DialogTrigger asChild>
        <div className="flex gap-2 bg-zinc-800 hover:bg-zinc-800/80 border-none p-2 px-3 rounded-sm cursor-pointer">
        <Button variant="link" className=" border-none p-3"><Trophy className="text-yellow-600"/></Button>
        <div className="flex flex-col">
          <span className="text-xs text-zinc-500">Conquistas</span>
          <span className="text-xs text-zinc-500">{unlockedCount} / {totalCount}</span>
        </div>
        </div>
      </DialogTrigger>
        <DialogContent className="bg-zinc-900 border border-zinc-800 text-zinc-300 max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-zinc-400">Suas Conquistas</DialogTitle>
            <DialogDescription className="text-zinc-500">
              Você desbloqueou {unlockedCount} de {totalCount} conquistas. Continue completando sessões para desbloquear mais!
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 flex gap-2">
            <button 
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-md text-sm ${filter === 'all' ? 'bg-primary/10 text-primary border border-primary' : 'bg-zinc-800 text-zinc-400'}`}
            >
              Todas
            </button>
            <button 
              onClick={() => setFilter('unlocked')}
              className={`px-3 py-1 rounded-md text-sm ${filter === 'unlocked' ? 'bg-primary/10 text-primary border border-primary' : 'bg-zinc-800 text-zinc-400'}`}
            >
              Desbloqueadas
            </button>
            <button 
              onClick={() => setFilter('locked')}
              className={`px-3 py-1 rounded-md text-sm ${filter === 'locked' ? 'bg-primary/10 text-primary border border-primary' : 'bg-zinc-800 text-zinc-400'}`}
            >
              Bloqueadas
            </button>
          </div>

          <div className="mt-4 space-y-4 overflow-y-auto pr-2 py-2 flex-1">
            {filteredAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const progress = Math.min(100, (achievement.currentAmount / achievement.requiredAmount) * 100);
  
  return (
    <div className={`p-4 rounded-lg border ${achievement.unlocked ? 'border-primary/30 bg-primary/5' : 'border-zinc-800 bg-zinc-900/30'}`}>
      <div className="flex items-center gap-3">
        <div className="text-2xl">{achievement.icon}</div>
        <div className="flex-1">
          <h4 className={`font-bold ${achievement.unlocked ? 'text-primary' : 'text-zinc-400'}`}>
            {achievement.name}
          </h4>
          <p className="text-sm text-zinc-500">{achievement.description}</p>
          
          <div className="mt-2">
            <div className="flex justify-between text-xs mb-1">
              <span className={achievement.unlocked ? 'text-primary' : 'text-zinc-500'}>
                {achievement.currentAmount} / {achievement.requiredAmount}
              </span>
              {achievement.unlocked && (
                <span className="text-primary">Concluído!</span>
              )}
            </div>
            <Progress 
              value={progress} 
              className={`h-1.5 ${achievement.unlocked ? 'bg-zinc-800' : 'bg-zinc-900'}`} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
