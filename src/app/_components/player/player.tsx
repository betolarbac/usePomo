"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CirclePause, Play, SkipForward, Volume1, Volume2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import Logo from "../Logo";
import Link from "next/link";
import { Slider } from "@/components/ui/slider";

const playList = ["jfKfPfyJRdk", "HuFYqnbVbzY", "Na0w3Mz46GA", "TtkFsfOP9QI"];

export default function Player() {
  const [pausePlayer, setPausePlayer] = useState(false);
  const [player, setPlayer] = useState<YT.Player | null>(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState([50]);
  const [musicTitle, setMusicTitle] = useState("");
  const [index, setIndex] = useState(0);

  const videoId = playList[index];
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
    const playerInstance = event.target;
    setPlayer(event.target);

    const videoData = playerInstance.getVideoData();

    setMusicTitle(videoData.title);

    playerInstance.setVolume(volume);
  };

  const reverPlayer = () => {
    setPausePlayer(!pausePlayer);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (player) {
        const currentTime = player.getCurrentTime();
        const duration = player.getDuration();
        setProgress((currentTime / duration) * 100);
      }
    }, 500);

    return () => clearInterval(interval);  
  }, [player]);

  useEffect(() => {
    player?.setVolume(volume[0]);
  }, [volume]);

  const NextItem = () => {
    setIndex((prevIndex) => (prevIndex + 1) % playList.length);
    setPausePlayer(false);
  };

  const prevItem = () => {
    setIndex(
      (prevIndex) => (prevIndex - 1 + playList.length) % playList.length
    );
    setPausePlayer(false);
  };

  return (
    <div
      style={{ backgroundImage: `url(${thumbnailUrl})` }}
      className="rounded-md bg-cover bg-center relative"
    >
      <div className="bg-[#1f1f1f] absolute top-0 left-0 right-0 bottom-0 opacity-[.9] z-10"></div>
      <YouTube videoId={videoId} opts={opts} onReady={onReady} />
      <div className="max-w-80 flex-1 p-6 border border-zinc-800 rounded-md h-full text-white flex flex-col justify-between z-20 relative">
        <header className="flex flex-col gap-5">
          <Logo />

          <div className="justify-items-center text-center">
            <p className="uppercase text-[.65rem]">tocando agora </p>
            <strong className="text-base line-clamp-2">{musicTitle}</strong>
          </div>
        </header>

        <div className="flex flex-col gap-3">
          <Image
            src={thumbnailUrl}
            alt="img"
            width={270}
            height={140}
            className="rounded"
          />

          <div className="flex flex-col gap-2">
            <strong className="text-base line-clamp-1">{musicTitle}</strong>
            <Link href="https://www.youtube.com/@LofiGirl" className="text-sm">
              Lofi Girl
            </Link>
            <Progress value={progress} />

            <div className="flex justify-between">
              <span>0:00</span>
              <span>3:00</span>
            </div>

            <div className="flex gap-2">
              <Volume1 className="w-5 h-5" />
              <Slider
                defaultValue={[50]}
                max={100}
                step={1}
                onValueChange={(val) => setVolume(val)}
              />
              <Volume2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="flex pb-11 flex-row gap-3 items-center justify-center">
          <Button onClick={prevItem}>
            <SkipForward className="w-5 h-5 rotate-180" />
          </Button>

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

          <Button onClick={NextItem}>
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
