import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Albums = () => {
  const [songs, setSongs] = useState([]);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  // 🔥 ADD THIS
  const BASE_URL = import.meta.env.VITE_API_URL;

  // 🔥 Fetch songs
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/music/`, { // 🔥 CHANGE
        withCredentials: true,
      })
      .then((res) => {
        setSongs(res.data.musics);
      })
      .catch((err) => console.log(err));
  }, []);

  // 🔥 Select toggle
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  // 🔥 Submit album
  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;

    if (selected.length === 0) {
      return toast.error("Select at least one song ❌");
    }

    try {
      await axios.post(
        `${BASE_URL}/api/music/album`, // 🔥 CHANGE
        {
          title,
          musics: selected,
        },
        { withCredentials: true }
      );

      toast.success("Album created 💿");

      setSelected([]);
      e.target.reset();

      navigate("/music");

    } catch (err) {
      console.log(err);
      toast.error("Album failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6">

      <div className="max-w-xl mx-auto bg-zinc-900 p-4 sm:p-6 rounded-xl shadow-lg">

        <h1 className="text-xl sm:text-2xl mb-4 text-center">💿 Create Album</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            name="title"
            placeholder="Album title"
            required
            className="p-3 bg-zinc-800 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="max-h-64 overflow-y-auto bg-zinc-800 p-2 sm:p-3 rounded-lg">

            {songs.length > 0 ? (
              songs.map((song) => (
                <div
                  key={song._id}
                  className="flex items-center justify-between p-2 hover:bg-zinc-700 rounded"
                >
                  <div>
                    <p className="font-medium">{song.title}</p>
                    <p className="text-xs text-gray-400">
                      {song.artist?.username}
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={selected.includes(song._id)}
                    onChange={() => toggleSelect(song._id)}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center">
                No songs available
              </p>
            )}

          </div>

          <p className="text-sm text-gray-400">
            Selected: {selected.length}
          </p>

          <button className="bg-blue-500 hover:bg-blue-600 py-3 rounded-lg">
            Create Album 💿
          </button>

        </form>

        <button
          onClick={() => navigate("/artist")}
          className="mt-4 w-full bg-gray-700 hover:bg-gray-600 py-2 rounded-lg"
        >
          Back to Upload 🎵
        </button>

      </div>
    </div>
  );
};

export default Albums;