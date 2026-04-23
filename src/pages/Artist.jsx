import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Artist = () => {
 
  const navigate = useNavigate();

  const handleMusicSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      await axios.post(
        "http://localhost:3000/api/music/upload",
        formData,
        { withCredentials: true }
      );

      toast.success("Music uploaded 🎵");
      e.target.reset();
      navigate('/music');

    } catch (err) {
      console.log(err);
      toast.error("Upload failed ❌");
    }
  };

  return (
 <div className="min-h-screen bg-black flex items-center justify-center px-4">

  <div className="bg-zinc-900 p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md">

    <h1 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">
      🎵 Upload Music
    </h1>

    <form onSubmit={handleMusicSubmit} className="flex flex-col gap-5">

      <input
        type="file"
        name="music"
        className="w-full text-white bg-zinc-800 p-2 rounded-lg"
      />

      <input
        type="text"
        name="title"
        className="p-3 rounded-lg bg-zinc-800 text-white"
      />

      <button className="bg-green-500 text-white py-3 rounded-lg">
        Upload 🎧
      </button>

    </form>

    <button
      onClick={() => navigate("/artist/album")}
      className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg"
    >
      Create Album 💿
    </button>

  </div>
</div>
  );
};

export default Artist;