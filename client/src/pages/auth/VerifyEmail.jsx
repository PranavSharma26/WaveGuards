import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {backendURL} from '../../utils/getBackendURL.js'
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const handleResendOTP = () => {

  }

  const onSubmit = async (data) => {
		try {
      const user = JSON.parse(localStorage.getItem("user"))
      const enteredOTP = data.otp
      const finalData = {
        email:user.data.email, 
        otp:enteredOTP, 
        role:user.data.role
      }
			const res = await axios.post(`${backendURL}/api/verify-otp`,finalData)
			if(!res.data.success) toast.error(res.data.message)
      localStorage.clear("user")
			toast.success(res.data.message)
			navigate('/login')
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
          Verify Email
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-6 "
          autoComplete="off"
        >
          <div className="flex flex-col">
            <label className="text-sm mb-1 pl-1 text-gray-700">
              Enter OTP
            </label>
            <input
              {...register("otp", {
                required: "OTP is Required",
                minLength: {
                  value: 6,
                  message: "Enter correct OTP",
                },
                maxLength: {
                  value: 6,
                  message: "Enter correct OTP",
                },
              })}
              type="text"
              className="bg-white border border-gray-300 rounded-md p-2 px-3 focus:ring-2 focus:ring-teal-300 outline-none text-sm transition"
            />
            {errors.otp && (
              <p className="pl-1 text-red-500 text-sm mt-1">
                {errors.otp.message}
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
            {isSubmitting ? "Verifying..." : "Submit"}
          </button>
        </form>
        <div className="text-blue-500 text-sm text-center mt-5" onClick={handleResendOTP}>
					<span className="hover:underline hover:cursor-pointer hover:text-blue-700">Didn't received the email? Resend OTP</span>
				</div>
      </div>
    </div>
  );
};

export default VerifyEmail;
