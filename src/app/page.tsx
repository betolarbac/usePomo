import Header from "./_components/header/header";
import Player from "./_components/player/player";
import Pomodoro from "./_components/pomodoro/pomodoro";

export default function Home() {
  return (
    <div className="flex gap-3 p-3 h-dvh">
      <Player />

      <div className="flex flex-col flex-1">
        <Header />

        <div>
          <div className="p-4 h-28 my-12 border rounded-xl border-zinc-800">
            <h2 className="text-white">Radios</h2>
          </div>
          <div className="flex gap-9">
            <Pomodoro />
           <div className="border rounded-xl border-zinc-800 p-6 flex-1">
           <h2 className="text-white">Todo</h2>
           </div>
          </div>
        </div>
      </div>
    </div>
  );
}
