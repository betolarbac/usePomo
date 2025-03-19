"use client";
import { Button } from "@/components/ui/button";
import { usePlayer } from "./playerContext";
import Image from "next/image";
import { Play } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function PlayerRadio() {
  const { radios, playRadio, currentRadio, isPlaying, setIsPlaying } =
    usePlayer();

  return (
    <div className="mt-0 xl:mt-12 mb-6 border rounded-xl border-zinc-800 p-4 xl:p-6 flex-1">
      <div>
        <h2 className="text-xl font-bold text-zinc-400 mb-4">Radios</h2>
        <ScrollArea className="">
        <div className="flex gap-4">
          {radios.map((radio) => {
            const thumbnailUrl = `https://img.youtube.com/vi/${radio.id}/mqdefault.jpg`;
            const isActive = currentRadio?.id === radio.id;

            return (
              <div
                key={radio.id}
                className={`flex flex-col items-center p-2 rounded-md cursor-pointer hover:bg-zinc-800/50 transition-colors ${
                  isActive ? "bg-zinc-800/70" : ""
                }`}
                onClick={() => {
                  playRadio(radio);
                  setIsPlaying(false);
                }}
              >
                <div className="relative  flex-shrink-0 w-20 h-20">
                  {thumbnailUrl ? (
                    <Image
                      src={thumbnailUrl}
                      alt={radio.title}
                      width={200}
                      height={200}
                      className="rounded-sm object-cover w-20 h-20"
                    />
                  ) : null}
                  {isActive && !isPlaying ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-sm">
                      <Button
                        className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/5 border border-primary text-primary"
                        onClick={() => playRadio(radio)}
                      >
                        <Play className="w-6 h-6" />
                      </Button>
                    </div>
                  ) : isActive && isPlaying ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-sm">
                      <div className="w-6 h-6 bg-primary rounded-full animate-pulse"></div>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}

        </div>
        <ScrollBar orientation="horizontal"/>
        </ScrollArea>
      </div>
    </div>
  );
}
