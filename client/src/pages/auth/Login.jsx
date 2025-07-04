import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendURL } from "../../utils/getBackendURL.js";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import toast from "react-hot-toast";
import { userAuth } from "../../context/user/UserContext.jsx";
import { ngoAuth } from "../../context/ngo/NgoContext.jsx";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [isUser, setIsUser] = useState(true);
  const { loginUser } = userAuth();
  const { loginNgo } = ngoAuth();

  const navigate = useNavigate();

  const toggleRole = (newRole) => {
    setRole(newRole);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    try {
      const endpoint = isUser ? "/api/user/login" : "/api/ngo/login";
      const finalData = {
        email: data.email,
        password: data.password,
      };

      const res = await axios.post(`${backendURL}${endpoint}`, finalData, {
        withCredentials: true,
      });
      if (!res.data.success) toast.error(res.data.message);

      toast.success("Log In Successful");

      const response = await axios.get(`${backendURL}/api/me`, {
        withCredentials: true,
      });
      const userData = { ...response.data.data, role: response.data.role };

      isUser ? loginUser(userData) : loginNgo(userData);

      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    setIsUser(role === "user" ? true : false);
  }, [role]);

  return (
    <div className="bg-gradient-to-br from-sky-100 via-sky-200 to-sky-100 h-screen w-screen flex flex-col items-center justify-center px-1">
      <div className="absolute top-6 left-6 cursor-pointer">
        <HomeIcon
          className="text-sky-800 text-3xl hover:scale-110 transition"
          onClick={() => navigate("/")}
        />
      </div>

      <div className="relative bg-white p-4 md:p-10 border border-white rounded-2xl shadow-xl w-full max-w-md hover:ring-2 ring-white transition duration-300 ease-in-out">
        <div className="absolute p-1 w-28 text-center bg-white rounded-t-xl -top-8 right-4">
          {isUser ? "User" : "NGO"}
        </div>
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Login
        </h1>
        <div className="pb-3 flex justify-center gap-5 text-gray-700">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="user"
              id="user"
              checked={role === "user"}
              onChange={() => toggleRole("user")}
            />
            <p>User</p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="ngo"
              id="ngo"
              checked={role === "ngo"}
              onChange={() => toggleRole("ngo")}
            />
            <p>NGO</p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-6 "
          autoComplete="off"
        >
          <div className="flex flex-col">
            <label className="text-sm mb-1 pl-1 text-gray-700">
              Enter Email
            </label>
            <input
              {...register("email", {
                required: "Email is Required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
              type="email"
              className="bg-white border border-gray-300 rounded-md p-2 px-3 focus:ring-2 focus:ring-teal-300 outline-none text-sm transition"
            />
            {errors.email && (
              <p className="pl-1 text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col relative">
            <label className="text-sm mb-1 pl-1 text-gray-700">
              Enter Password
            </label>
            <input
              {...register("password", {
                required: "Password is Required",
                minLength: {
                  value: 5,
                  message: "Minimum 5 characters are required",
                },
                maxLength: {
                  value: 30,
                  message: "Maximum 30 characters allowed",
                },
              })}
              type={showPassword ? "text" : "password"}
              className="bg-white border border-gray-300 rounded-md p-2 px-3 focus:ring-2 focus:ring-teal-300 outline-none text-sm transition pr-10"
            />
            <div
              className="absolute top-7.5 right-3 cursor-pointer text-gray-500 hover:text-gray-800 transition"
              onClick={toggleShowPassword}
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </div>
            <div className="text-sm text-blue-500 text-end pt-1">
              <span
                className=" hover:underline hover:cursor-pointer hover:text-blue-700"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </span>
            </div>

            {errors.password && (
              <p className="pl-1 text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-4 py-2 rounded-lg text-white font-semibold transition ${
              isSubmitting
                ? "bg-sky-300 cursor-not-allowed"
                : "bg-sky-500 hover:bg-sky-600"
            }`}
          >
            {isSubmitting ? "Logging..." : "Log In"}
          </button>
        </form>
        <div className="text-blue-500 text-sm text-center mt-5">
          <span
            className="hover:underline hover:cursor-pointer hover:text-blue-700"
            onClick={() => navigate("/signup")}
          >
            Don't have an account? Create Account
          </span>
        </div>
      </div>
    </div>
  );
};
export default Login;
