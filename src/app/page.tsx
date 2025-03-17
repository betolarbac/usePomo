import Header from "./_components/header/header";
import LevelProgress from "./_components/level-progress/levelProgress";
import { LevelProvider } from "./_components/level-progress/levelContext";
import Player from "./_components/player/player";
import Pomodoro from "./_components/pomodoro/pomodoro";
import Todo from "./_components/todo/todo";
import { ConquestProvider } from "./_components/conquest-level/conquestContext";

export default function Home() {
  return (
    <LevelProvider>
      <ConquestProvider>
        <div className="flex gap-3 p-3 h-dvh">
          <Player />

          <div className="flex flex-col flex-1">
            <Header />

            <div>
              <div className="flex gap-9">
                <LevelProgress />
                <div className="h-28 mt-12 mb-6 border rounded-xl border-zinc-800 p-6 flex-1">
                  <h2>radios</h2>
                </div>
              </div>
              <div className="flex gap-9">
                <Pomodoro />
                <Todo />
              </div>
            </div>
          </div>
        </div>
      </ConquestProvider>
    </LevelProvider>
  );
}
