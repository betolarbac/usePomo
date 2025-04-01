import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { auth } from "@/lib/firebaseConfig";
import { useEffect, useState } from "react";
import {
  addLinkToPlaylist,
  createPlaylist,
  deletePlaylist,
  fetchPlaylists,
} from "./playlistService";
import { ListMusic, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import PlayListDetails from "./playlistDetails";

interface Playlist {
  id: string;
  name: string;
  links: string[];
  createdAt?: Date;
}

export default function Playlist() {
  const [user, setUser] = useState(auth.currentUser);
  const [playlistName, setPlaylistName] = useState("");
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [link, setLink] = useState("");

  useEffect(() => {
    // Set up auth state listener
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchPlaylists(currentUser.uid).then((playlistData) => {
          // Ensure the data matches the Playlist interface
          const typedPlaylists: Playlist[] = playlistData.map(
            (playlist: {
              id: string;
              name?: string;
              links?: string[];
              createdAt?: Date;
            }) => ({
              id: playlist.id,
              name: playlist.name || "",
              links: playlist.links || [],
              createdAt: playlist.createdAt,
            })
          );
          setPlaylists(typedPlaylists);
        });
      }
    });

    // Clean up subscription
    return () => unsubscribe();
  }, []);

  const handleCreatePlaylist = async () => {
    if (user && playlistName) {
      const playlistId = await createPlaylist(user.uid, playlistName);
      setPlaylists([
        ...playlists,
        { id: playlistId, name: playlistName, links: [] },
      ]);
      setPlaylistName("");
    }
  };

  const handleAddLink = async () => {
    if (user && selectedPlaylist && link) {
      await addLinkToPlaylist(user.uid, selectedPlaylist, link);
      setPlaylists(
        playlists.map((p) =>
          p.id === selectedPlaylist
            ? { ...p, links: [...(p.links || []), link] }
            : p
        )
      );
      setLink("");
    }
  };

  function deletePlaylistId(playlistId: string) {
    if (user) {
      deletePlaylist(user.uid, playlistId)
        .then(() => {
          setPlaylists(playlists.filter((p) => p.id !== playlistId));
          if (selectedPlaylist === playlistId) {
            setSelectedPlaylist(null);
          }
        })
        .catch((error) => {
          console.error("Erro ao deletar playlist:", error);
        });
    }
  }

  const deleteLinkFromPlaylist = (playlistId: string, linkIndex: number) => {
    if (user) {
      const playlist = playlists.find(p => p.id === playlistId);

      if (playlist) {
       const updatedLinks = [...playlist.links];
       updatedLinks.splice(linkIndex, 1);
       
       setPlaylists(
         playlists.map(p =>
          p.id === playlistId
           ? {...p, links: updatedLinks }
            : p
        )
       )
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary/10 hover:bg-primary/5 border border-primary text-primary h-10">
          <ListMusic />
          Playlist
        </Button>
      </DialogTrigger>
      <DialogContent className=" bg-zinc-900 border rounded-xl border-zinc-900 text-zinc-400">
        <DialogHeader>
          <DialogTitle className="text-zinc-400 font-bold">
            Playlist
          </DialogTitle>
          <DialogDescription>Crie e gerencie suas playlists</DialogDescription>
        </DialogHeader>

        <div>
          <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Nova Playlist"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            className="flex-1 border-none bg-zinc-800 text-zinc-400 h-10"
          />
          <Button
            onClick={handleCreatePlaylist}
            type="submit"
            className="bg-primary/10 hover:bg-primary/5 border border-primary text-primary h-10"
          >
            <ListMusic />
            Adicionar
          </Button>
          </div>

          <h2 className="my-4 font-bold">Suas Playlists</h2>
          <ul>
            {playlists.map((playlist) => (
              <li
                key={playlist.id}
                className={`cursor-pointer p-1 flex justify-between items-center ${
                  selectedPlaylist === playlist.id ? "bg-zinc-800 text-zinc-400 rounded-md" : ""
                }`}
              >
                <span onClick={() => setSelectedPlaylist(playlist.id)} className="flex-1">
                  {playlist.name}
                </span>
                <Button
                 variant="ghost"
                      className="hover:bg-transparent p-0 mr-2"
                  onClick={() => deletePlaylistId(playlist.id)}
                >
                  <Trash2 className="text-red-500 w-5 h-5" />
                </Button>

              </li>
            ))}
          </ul>

          {selectedPlaylist && (
            <div className="mt-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Adicionar Link"
                  className="flex-1 border-none bg-zinc-800 text-zinc-400 h-10"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddLink();
                    }
                  }}
                />
                <Button
                  onClick={handleAddLink}
                  className="bg-primary/10 hover:bg-primary/5 border border-primary text-primary h-10"
                >
                  <Plus />
                  Adicionar
                </Button>
              </div>

              {playlists.map((playlist) => {
                if (playlist.id === selectedPlaylist) {
                  return (
                    <div key={playlist.id} className="mt-4">
                      <h3 className="font-bold text-zinc-400">Adicionar musica na playlist {playlist.name}</h3>
                      <ul className="mt-2">
                        {playlist.links.length === 0 ? (
                          <li className="text-zinc-500">Nenhum link adicionado</li>
                        ) : (
                          playlist.links.map((link, index) => (
                            <li key={index} className="p-2 border-b border-zinc-800 flex justify-between items-center">
                              <PlayListDetails detailsId={link.split('v=')[1]?.split('&')[0] || link}/>
                              <Button
                                variant="ghost"
                                className="hover:bg-transparent p-0 ml-2"
                                onClick={() => {
                                
                                   deleteLinkFromPlaylist(playlist.id, index);
                                }}
                              >
                                <Trash2 className="text-red-500 w-5 h-5" />
                              </Button>
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
