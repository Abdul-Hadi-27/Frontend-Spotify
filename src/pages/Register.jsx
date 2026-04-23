import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const { register, reset, handleSubmit } = useForm();

  const RegisterHandler = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        data,
        { withCredentials: true }
      );

      // 🔥 SAVE USER
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Registered Successfully ✅");
      reset();

      // 🔥 ROLE BASED NAVIGATION
      if (res.data.user.role === "artist") {
        navigate("/artist");
      } else {
        navigate("/music");
      }

    } catch (err) {
      console.error(err);
      toast.error("Registration failed ❌");
    }
  };

  return (
<form
  onSubmit={handleSubmit(RegisterHandler)}
  className="flex flex-col gap-4 items-center justify-center min-h-screen w-full bg-gray-800 px-4"
>
  <h2 className="text-2xl sm:text-3xl italic mb-4 text-white text-center">
    Welcome to SimpleSpot
  </h2>

  <input
    {...register("username")}
    className="w-full max-w-sm border-b p-2 text-lg sm:text-xl bg-transparent text-white outline-none"
    type="text"
    placeholder="john-doe"
    required
  />

  <input
    {...register("email")}
    className="w-full max-w-sm border-b p-2 text-lg sm:text-xl bg-transparent text-white outline-none"
    type="email"
    placeholder="john@doe.com"
    required
  />

  <input
    {...register("password")}
    className="w-full max-w-sm border-b p-2 text-lg sm:text-xl bg-transparent text-white outline-none"
    type="password"
    placeholder="********"
    required
  />

  <select
    {...register("role")}
    className="w-full max-w-sm border-b p-2 text-lg bg-gray-700 text-white outline-none"
    required
  >
    <option value="">Select Role</option>
    <option value="user">User</option>
    <option value="artist">Artist</option>
  </select>

  <button className="mt-5 px-4 py-2 bg-blue-500 rounded text-white w-full max-w-sm">
    Register Account
  </button>

  {/* 🔥 ADD THIS */}
  <p className="text-white text-sm sm:text-base">
    Already have an account?{" "}
    <Link className="text-red-400" to="/login">
      Login
    </Link>
  </p>
</form>
  );
};

export default Register;