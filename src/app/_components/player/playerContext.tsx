"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from "react";
import YouTube from "react-youtube";

// Definindo o tipo para uma rádio/música
interface Radio {
  id: string;
  title: string;
  artist: string;
  thumbnailUrl?: string;
}

// Definindo o tipo para o contexto
interface PlayerContextType {
  currentRadio: Radio | null;
  player: YT.Player | null;
  isPlaying: boolean;
  volume: number[];
  progress: number;
  radios: Radio[];
  playRadio: (radio: Radio) => void;
  togglePlay: () => void;
  setVolume: (volume: number[]) => void;
  nextRadio: () => void;
  prevRadio: () => void;
  updateRadios: (newRadios: Radio[]) => void;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultRadios = [
  {
    id: "jfKfPfyJRdk",
    title: "lofi hip hop radio ",
    artist: "Lofi Girl 2",
  },
  {
    id: "HuFYqnbVbzY",
    title: "Chillhop Radio - jazzy & lofi hip hop beats",
    artist: "Chillhop Music",
  },
  {
    id: "Na0w3Mz46GA",
    title: "Coffee Shop Radio - lofi & jazz hip hop",
    artist: "Lofi Girl",
  },
  {
    id: "TtkFsfOP9QI",
    title: "Cozy Coffee Shop Ambience",
    artist: "Lofi Girl",
  },
  {
    id: "4xDzrJKXOOY",
    title: "synthwave radio 🌌 beats to chill/game to",
    artist: "Lofi Girl",
  },
  {
    id: "P6Segk8cr-c",
    title: "sad lofi radio ☔ beats for rainy days",
    artist: "Lofi Girl",
  },
  {
    id: "28KRPhVzCus",
    title: "lofi hip hop radio 💤 beats to sleep/chill to",
    artist: "Lofi Girl",
  },
];

// Criando o contexto
const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

// Provider do contexto
export function PlayerProvider({ children }: { children: ReactNode }) {
  const [player, setPlayer] = useState<YT.Player | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState([50]);
  const [progress, setProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [radios, setRadios] = useState<Radio[]>(defaultRadios);
  const [currentRadio, setCurrentRadio] = useState<Radio | null>(
    defaultRadios[0]
  );

  const radiosFetched = useRef(false);

  useEffect(() => {
    const fetchVideoTitles = async () => {
      if (radiosFetched.current) return; 
      radiosFetched.current = true;
    
      try {
        const updatedRadios = await Promise.all(
          radios.map(async (radio) => {
            try {
              const response = await fetch(
                `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${radio.id}&format=json`
              );
    
              if (!response.ok) throw new Error("Failed to fetch data");
    
              const data = await response.json();
              return { ...radio, title: data.title, thumbnailUrl: data.thumbnail_url };
            } catch (error) {
              console.error(`Failed to fetch data for video ${radio.id}:`, error);
              return radio; // Retorna a rádio original em caso de erro
            }
          })
        );
    
        setRadios(updatedRadios);
      } catch (error) {
        console.error("Error fetching video titles:", error);
      }
    };
    

    fetchVideoTitles();
  }, []);

  // Configurações do player do YouTube
  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 0,
      controls: 0,
    },
  };

  // Função para lidar com o evento onReady do YouTube
  const onReady = (event: { target: YT.Player }) => {
    const playerInstance = event.target;
    setPlayer(playerInstance);
    playerInstance.setVolume(volume[0]);
  };

  useEffect(() => {
    if (!player) return; // 🚀 Evita erro caso `player` seja `null`

    const interval = setInterval(() => {
      const currentTime = player.getCurrentTime();
      const duration = player.getDuration();
      if (duration > 0) {
        setProgress((currentTime / duration) * 100);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [player]);

  // Atualiza o volume quando ele muda
  useEffect(() => {
    player?.setVolume(volume[0]);
  }, [volume]);

  const playRadio = (radio: Radio) => {
    const index = radios.findIndex((r) => r.id === radio.id);
    if (index !== -1) {
      setCurrentIndex(index);
      setCurrentRadio(radio);

      if (player) {
        player.loadVideoById(radio.id);
        player.playVideo();
        setIsPlaying(true);
      } else {
        console.warn("Player is not initialized yet.");
      }
    }
  };

  // Função para alternar entre play e pause
  const togglePlay = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Função para ir para a próxima rádio
  const nextRadio = () => {
    const newIndex = (currentIndex + 1) % radios.length;
    setCurrentIndex(newIndex);
    setCurrentRadio(radios[newIndex]);

    if (player) {
      player.loadVideoById(radios[newIndex].id);
      // Maintain current playing state when switching
      if (isPlaying) {
        player.playVideo();
      }
    }

    setIsPlaying(false);
  };

  // Função para ir para a rádio anterior
  const prevRadio = () => {
    const newIndex = (currentIndex - 1 + radios.length) % radios.length;
    setCurrentIndex(newIndex);
    setCurrentRadio(radios[newIndex]);

    if (player) {
      player.loadVideoById(radios[newIndex].id);
      // Maintain current playing state when switching
      if (isPlaying) {
        player.playVideo();
      }
    }

    setIsPlaying(false);
  };

  // Função para atualizar a lista de rádios
  const updateRadios = (newRadios: Radio[]) => {
    setRadios(newRadios);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentRadio,
        player,
        isPlaying,
        volume,
        progress,
        radios,
        playRadio,
        togglePlay,
        setVolume: setVolumeState,
        nextRadio,
        prevRadio,
        updateRadios,
        setIsPlaying,
      }}
    >
      {currentRadio?.id && (
        <YouTube
          videoId={currentRadio.id}
          opts={opts}
          onReady={onReady}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}
      {children}
    </PlayerContext.Provider>
  );
}

// Hook personalizado para usar o contexto
export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}
