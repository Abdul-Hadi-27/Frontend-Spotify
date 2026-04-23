/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setIsLoggedIn(true);
      setRole(user.role);
    } else {
      setIsLoggedIn(false);
      setRole(null);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true }
      );

      localStorage.removeItem("user");

      toast.success("Logged out 👋");
      setIsLoggedIn(false);
      setRole(null);
      navigate("/login");

    } catch (err) {
      console.log(err);
      toast.error("Logout failed ❌");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-zinc-900 px-4 sm:px-6 py-4 text-white gap-3 sm:gap-0">

      <h1
        onClick={() => navigate("/music")}
        className="cursor-pointer font-bold text-lg sm:text-xl"
      >
        🎧 SimpleSpot
      </h1>

      <div className="flex flex-wrap justify-center sm:justify-end gap-3">

        {isLoggedIn && (
          <>
            <button className="text-sm sm:text-base" onClick={() => navigate("/music")}>
              Music
            </button>

            {role === "artist" && (
              <button className="text-sm sm:text-base" onClick={() => navigate("/artist")}>
                Upload
              </button>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded text-sm sm:text-base"
            >
              Logout 🚪
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default Navbar;