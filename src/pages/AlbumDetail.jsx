import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AlbumDetail = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);

  // 🔥 ADD THIS
  const BASE_URL = import.meta.env.VITE_API_URL;

  const handlePlay = (e) => {
    if (currentAudio && currentAudio !== e.target) {
      currentAudio.pause();
    }
    setCurrentAudio(e.target);
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/music/albums/${id}`, { // 🔥 CHANGE HERE
        withCredentials: true,
      })
      .then((res) => setAlbum(res.data.album))
      .catch((err) => console.log(err));
  }, [id]);

  if (!album) {
    return <div className="text-white p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-2xl sm:text-3xl font-bold">{album.title}</h1>
      <p className="text-gray-400 mb-6">
        by {album.artist?.username}
      </p>

      <h2 className="text-lg sm:text-xl mb-4">🎵 Songs</h2>

      {album.musics?.map((song) => (
        <div key={song._id} className="bg-zinc-900 p-3 sm:p-4 rounded mb-3">
          <p>{song.title}</p>

          <audio
            controls
            src={song.uri}
            onPlay={handlePlay}
            className="w-full mt-2"
          />
        </div>
      ))}

    </div>
  );
};

export default AlbumDetail;