import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {backendURL} from '../../utils/getBackendURL.js'
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import toast, {Toaster} from 'react-hot-toast'

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
		try {
			const res = await axios.post(`${backendURL}/api/user/signup`,data)
			if(!res.data.success) toast.error(res.data.message)
			toast.success("Please verify your email")
			
			localStorage.removeItem("user")
			const expiryTime = new Date() + 10*60*1000
			localStorage.setItem("user",JSON.stringify({
				data:{
					email: data.email,
					role: "user"
				}, expiresAt: expiryTime
			}))
			navigate('/verify-email')
		} catch (error) {
			toast.error(error?.response?.data?.message)
		}
  };

  return (
    <div className="bg-gradient-to-br from-sky-100 via-sky-200 to-sky-100 h-screen w-screen flex flex-col items-center justify-center px-4">
      <div className="absolute top-6 left-6 cursor-pointer">
        <HomeIcon
          className="text-sky-800 text-3xl hover:scale-110 transition"
          onClick={() => navigate("/")}
        />
      </div>

      <div className="bg-white p-8 md:p-10 border border-white rounded-2xl shadow-xl w-full max-w-md hover:ring-2 ring-white transition duration-300 ease-in-out">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Signup
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-6 "
          autoComplete="off"
        >
          <div className="flex flex-col">
            <label className="text-sm mb-1 pl-1 text-gray-700">
              Enter Name
            </label>
            <input
              {...register("name", {
                required: "Name is Required",
                pattern: {
                  value: /^[a-zA-Z0-9 ]+$/,
                  message: "Enter a valid name",
                },
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters required",
                },
                maxLength: {
                  value: 30,
                  message: "Maximum 30 characters allowed",
                },
              })}
              type="text"
              className="bg-white border border-gray-300 rounded-md p-2 px-3 focus:ring-2 focus:ring-teal-300 outline-none text-sm transition"
            />
            {errors.name && (
              <p className="pl-1 text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

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

          <div className="flex flex-col">
            <label className="text-sm mb-1 pl-1 text-gray-700">
              Enter Phone Number
            </label>
            <input
              {...register("phoneNumber", {
                pattern: {
                  value: /^[0-9 ]+$/,
                  message: "Enter a valid phone number",
                },
              })}
              type="text"
              className="bg-white border border-gray-300 rounded-md p-2 px-3 focus:ring-2 focus:ring-teal-300 outline-none text-sm transition"
            />
            {errors.phoneNumber && (
              <p className="pl-1 text-red-500 text-sm mt-1">
                {errors.phoneNumber.message}
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
							<span className=" hover:underline hover:cursor-pointer hover:text-blue-700">Forgot Password?</span>
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
            {isSubmitting ? "Signing up..." : "Signup"}
          </button>
        </form>
				<div className="text-blue-500 text-sm text-center mt-5">
					<span className="hover:underline hover:cursor-pointer hover:text-blue-700">Already have an account? Log in</span>
				</div>
      </div>
    </div>
  );
};

export default Signup;
