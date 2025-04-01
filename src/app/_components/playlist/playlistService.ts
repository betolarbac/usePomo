import { db } from "@/lib/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const createPlaylist = async (userId: string, playlistName: string) => {
  const docRef = await addDoc(collection(db, "users", userId, "playlists"), {
    name: playlistName,
    createdAt: new Date(),
    links: [],
  });
  return docRef.id;
};

export const addLinkToPlaylist = async (
  userId: string,
  playlistId: string,
  link: string
) => {
  const playlistRef = doc(db, "users", userId, "playlists", playlistId);
  const snapshot = await getDocs(collection(db, "users", userId, "playlists"));
  const playlistData = snapshot.docs
    .find((doc) => doc.id === playlistId)
    ?.data();

  if (playlistData) {
    await updateDoc(playlistRef, {
      links: [...playlistData.links, link],
    });
  }
};

export const fetchPlaylists = async (userId: string) => {
  const querySnapshot = await getDocs(
    collection(db, "users", userId, "playlists")
  );
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const deletePlaylist = async (userId: string, playlistId: string) => {
  const playlistRef = doc(db, "users", userId, "playlists", playlistId);

 await deleteDoc(playlistRef);
};
