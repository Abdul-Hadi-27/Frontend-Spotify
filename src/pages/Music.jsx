import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Music = () => {
  const [music, setMusic] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);
  const navigate = useNavigate();
  

  const handlePlay = (e) => {
    if (currentAudio && currentAudio !== e.target) {
      currentAudio.pause();
    }
    setCurrentAudio(e.target);
  };

  useEffect(() => {
    axios.get("http://localhost:3000/api/music/", {
      withCredentials: true
    }).then(res => setMusic(res.data.musics));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/api/music/albums", {
      withCredentials: true
    }).then(res => setAlbums(res.data.albums));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">

      {/* Songs */}
      <h1 className="text-3xl mb-6">🎵 Songs</h1>

      <div className="grid md:grid-cols-3 gap-6">
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

      {/* Albums */}
      <h2 className="text-2xl mt-10 mb-4">💿 Albums</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {albums.map((album) => (
          <div
            key={album._id}
            onClick={() => navigate(`/albums/${album._id}`)} // 🔥 FIX
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