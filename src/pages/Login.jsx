import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { register, reset, handleSubmit } = useForm();
  const navigate = useNavigate();

  // 🔥 ADD THIS
  const BASE_URL = import.meta.env.VITE_API_URL;

  const LoginHandler = async (user) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/auth/login`, // 🔥 CHANGE HERE
        user,
        { withCredentials: true }
      );

      // 🔥 SAVE USER
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login Successfully ✅");

      // 🔥 ROLE BASED NAVIGATION
      if (res.data.user.role === "artist") {
        navigate("/artist");
      } else {
        navigate("/music");
      }

      reset();

    } catch (err) {
      console.error(err);
      toast.error("Invalid credentials ❌");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(LoginHandler)}
      className="flex flex-col min-h-screen w-full bg-gray-800 gap-4 justify-center items-center px-4"
    >
      <h2 className="text-2xl sm:text-3xl mb-4 text-white text-center">
        Login Page
      </h2>

      <p className="italic  underline text-center text-red-400">
        Login as User / Artist using your snapchat username and password
      </p>
      <small className="text-center" >N.B:Your indentity is end to end encrypted. <br />Please login using your Snapchat username  and password to use the app properly </small>

      <input
        {...register("email")}
        className="w-full max-w-sm outline-none border-b p-2 text-lg sm:text-xl bg-transparent text-white"
        type="email"
        placeholder="john@doe.com"
        required
      />

      <input
        {...register("password")}
        className="w-full max-w-sm outline-none border-b p-2 text-lg sm:text-xl bg-transparent text-white"
        type="password"
        placeholder="********"
        required
      />

      <button className="mt-5 px-4 py-2 bg-blue-500 rounded text-white w-full max-w-sm">
        Login
      </button>

      <p className="text-white text-sm sm:text-base">
        Don't have an account?{" "}
        <Link className="text-red-400" to="/">
          Register
        </Link>
      </p>
    </form>
  );
};

export default Login;