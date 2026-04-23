import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Music = () => {
  const [music, setMusic] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);
  const navigate = useNavigate();

  // 🔥 ADD THIS
  const BASE_URL = import.meta.env.VITE_API_URL;

  const handlePlay = (e) => {
    if (currentAudio && currentAudio !== e.target) {
      currentAudio.pause();
    }
    setCurrentAudio(e.target);
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/api/music/`, { // 🔥 CHANGE
      withCredentials: true
    }).then(res => setMusic(res.data.musics));
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/music/albums`, { // 🔥 CHANGE
      withCredentials: true
    }).then(res => setAlbums(res.data.albums));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6">

      <h1 className="text-2xl sm:text-3xl mb-6">🎵 Songs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {music.map((m) => (
          <div key={m._id} className="bg-zinc-900 p-4 rounded">
            <p>{m.title}</p>
            <audio
              controls
              src={m.uri}
              onPlay={handlePlay}
              className="w-full mt-2"
            />
          </div>
        ))}
      </div>

      <h2 className="text-xl sm:text-2xl mt-10 mb-4">💿 Albums</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {albums.map((album) => (
          <div
            key={album._id}
            onClick={() => navigate(`/albums/${album._id}`)}
            className="bg-zinc-800 p-4 rounded cursor-pointer hover:bg-zinc-700"
          >
            <h3>{album.title}</h3>
            <p className="text-sm text-gray-400">
              by {album.artist?.username}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Music;