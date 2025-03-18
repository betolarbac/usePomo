import Header from "./_components/header/header";
import LevelProgress from "./_components/level-progress/levelProgress";
import { LevelProvider } from "./_components/level-progress/levelContext";
import Player from "./_components/player/player";
import Pomodoro from "./_components/pomodoro/pomodoro";
import Todo from "./_components/todo/todo";
import { ConquestProvider } from "./_components/conquest-level/conquestContext";
import PlayerRadio from "./_components/player/playerRadio";
import { PlayerProvider } from "./_components/player/playerContext";

export default function Home() {
  return (
    <LevelProvider>
      <ConquestProvider>
      <PlayerProvider >
      <div className="flex gap-3 p-3 h-dvh">
          <Player />

          <div className="flex flex-col flex-1">
            <Header />

            <div>
              <div className="flex gap-9">
                <LevelProgress />

                <PlayerRadio />
              </div>
              <div className="flex gap-9">
                <Pomodoro />
                <Todo />
              </div>
            </div>
          </div>
        </div>
      </PlayerProvider>
      </ConquestProvider>
    </LevelProvider>
  );
}
