"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CirclePause, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";

export default function Player() {
  const [pausePlayer, setPausePlayer] = useState(false);
  const [player, setPlayer] = useState<YT.Player | null>(null);
  const [ progress, setProgress ] = useState(0)

  const videoId = "jfKfPfyJRdk";
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 0,
      controls: 0,
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onReady = (event: any) => {
    setPlayer(event.target);
  };

  const reverPlayer = () => {
    setPausePlayer(!pausePlayer)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (player) {
        const currentTime = player.getCurrentTime();
        const duration = player.getDuration();
        setProgress((currentTime / duration ) * 100)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [player])

  return (
    <div style={{ backgroundImage: `url(${thumbnailUrl})` }} className="rounded-md bg-cover bg-center relative">
      <div className="bg-[#1f1f1f] absolute top-0 left-0 right-0 bottom-0 opacity-[.9] z-10"></div>
      <YouTube videoId={videoId} opts={opts} onReady={onReady} />
      <div className="max-w-80 flex-1 p-6 border border-zinc-800 rounded-md h-full text-white flex flex-col justify-between z-20 relative">
        <header className="flex flex-col gap-5">
          <h1 className="font-extrabold text-center text-xl">UsePomo</h1>

          <div className="justify-items-center">
            <p className="uppercase text-[.65rem]">tocando agora </p>
            <strong className="text-base">O Canal Lo-Fi</strong>
          </div>
        </header>

        <div className="flex flex-col gap-3">
          <Image src={thumbnailUrl} alt="img" width={250} height={140} />

          <div className="flex flex-col gap-4">
            <strong className="text-base">O Canal Lo-Fi</strong>
            <Progress value={progress} />
          </div>
        </div>

        <div className="flex flex-col gap-3 pb-11 items-center">
          {pausePlayer ? (
            <Button
              className="w-12 h-12 rounded-full"
              onClick={() => player?.pauseVideo() && reverPlayer()}
            >
              <CirclePause className="w-6 h-6" />
            </Button>
          ) : (
            <Button
              className="w-12 h-12 rounded-full"
              onClick={() => player?.playVideo() && reverPlayer()}
            >
              <Play className="w-6 h-6" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
