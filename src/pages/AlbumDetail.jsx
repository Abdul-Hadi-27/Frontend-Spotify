import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AlbumDetail = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);

  const handlePlay = (e) => {
    if (currentAudio && currentAudio !== e.target) {
      currentAudio.pause();
    }
    setCurrentAudio(e.target);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/music/albums/${id}`, {
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

      {/* Album Info */}
      <h1 className="text-3xl font-bold">{album.title}</h1>
      <p className="text-gray-400 mb-6">
        by {album.artist?.username}
      </p>

      {/* Songs */}
      <h2 className="text-xl mb-4">🎵 Songs</h2>

      {album.musics?.map((song) => (
        <div key={song._id} className="bg-zinc-900 p-4 rounded mb-3">
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