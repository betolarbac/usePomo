import Player from "./_components/player/player";

export default function Home() {
  return (
    <div className="flex gap-3 p-3 h-dvh">
      <Player />

      <h2>Pomo</h2>
      <h2>Todo</h2>
    </div>
  );
}
