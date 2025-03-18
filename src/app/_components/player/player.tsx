"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CirclePause, Play, SkipForward, Volume1, Volume2 } from "lucide-react";
import Image from "next/image";
import Logo from "../Logo";
import Link from "next/link";
import { Slider } from "@/components/ui/slider";
import { usePlayer } from "./playerContext";

export default function Player() {
  const { 
    currentRadio, 
    isPlaying, 
    togglePlay, 
    volume, 
    setVolume, 
    progress, 
    nextRadio, 
    prevRadio 
  } = usePlayer();

  if (!currentRadio) return null;

  const thumbnailUrl = `https://img.youtube.com/vi/${currentRadio.id}/maxresdefault.jpg`;

  return (
    <div
      style={{ backgroundImage: `url(${thumbnailUrl})` }}
      className="rounded-md bg-cover bg-center relative"
    >
      <div className="bg-[#1f1f1f] absolute top-0 left-0 right-0 bottom-0 opacity-[.9] z-10"></div>
      <div className="max-w-80 flex-1 p-6 border border-zinc-800 rounded-md h-full text-white flex flex-col justify-between z-20 relative">
        <header className="flex flex-col gap-5">
          <Logo />

          <div className="justify-items-center text-center">
            <p className="uppercase text-[.65rem]">tocando agora </p>
            <strong className="text-base line-clamp-2">{currentRadio.title}</strong>
          </div>
        </header>

        <div className="flex flex-col gap-3">
          <Image
            src={thumbnailUrl}
            alt={currentRadio.title}
            width={270}
            height={140}
            className="rounded"
          />

          <div className="flex flex-col gap-2">
            <strong className="text-base line-clamp-1">{currentRadio.title}</strong>
            <Link href="https://www.youtube.com/@LofiGirl" className="text-sm">
              {currentRadio.artist}
            </Link>
            <Progress value={progress} />

            <div className="flex justify-between">
              <span className="bg-red-400/10 px-1 text-sm rounded-sm border border-red-500 text-red-500">Live</span>
            </div>

            <div className="flex gap-2">
              <Volume1 className="w-5 h-5" />
              <Slider
                defaultValue={volume}
                max={100}
                step={1}
                onValueChange={(val) => setVolume(val)}
              />
              <Volume2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="flex pb-11 flex-row gap-3 items-center justify-center">
          <Button onClick={prevRadio} className="bg-primary/10 hover:bg-primary/5 border border-primary text-primary">
            <SkipForward className="w-5 h-5 rotate-180" />
          </Button>

          <Button
            className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/5 border border-primary text-primary"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <CirclePause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </Button>

          <Button onClick={nextRadio} className="bg-primary/10 hover:bg-primary/5 border border-primary text-primary">
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
