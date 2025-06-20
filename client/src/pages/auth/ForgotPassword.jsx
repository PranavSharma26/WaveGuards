import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendURL } from "../../utils/getBackendURL.js";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const [isResending, setIsResending] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [role, setRole] = useState("user");
  const [isUser, setIsUser] = useState(true);

  const toggleRole = (newRole) => {
    setRole(newRole);
    setShowOtpField(false);
    resetField("email");
  };

  const handleResendOTP = async () => {};

  const onSubmit = async (data) => {
    try {
      if (!showOtpField) {
        const finalData = {
          email: data.email,
          role: role,
        };
        const res = await axios.patch(
          `${backendURL}/api/password/forgot`,
          finalData
        );
        setShowOtpField(true);
        toast.success(res.data.message);
      } else {
        const finalData = {
          email: data.email,
          otp: data.otp,
          role: role,
        };
        const res = await axios.post(
          `${backendURL}/api/password/verify-otp`,
          finalData
        );
        toast.success(res.data.message);
        const expiryTime = new Date() + 10 * 60 * 1000;
        isUser
          ? localStorage.setItem(
              "user",
              JSON.stringify({
                data: {
                  id: res.data.id,
                  mode: 1,
                  role: "user",
                },
                expiresAt: expiryTime,
              })
            )
          : localStorage.setItem(
              "ngo",
              JSON.stringify({
                data: {
                  id: res.data.id,
                  mode: 1,
                  role: "ngo",
                },
                expiresAt: expiryTime,
              })
            );
        navigate("/change-password");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal Server Error");
    }
  };

  useEffect(() => {
    setIsUser(role === "user" ? true : false);
  }, [role]);

  return (
    <div className="bg-gradient-to-br from-sky-100 via-sky-200 to-sky-100 h-screen w-screen flex flex-col items-center justify-center px-4">
      <div className="absolute top-6 left-6 cursor-pointer">
        <HomeIcon
          className="text-sky-800 text-3xl hover:scale-110 transition"
          onClick={() => navigate("/")}
        />
      </div>

      <div className="relative bg-white p-8 md:p-10 border border-white rounded-2xl shadow-xl w-full max-w-md hover:ring-2 ring-white transition duration-300 ease-in-out">
        <div className="absolute p-1 w-28 text-center bg-white rounded-t-xl -top-8 right-4">
          {isUser ? "User" : "NGO"}
        </div>
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Forgot Password
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
              name="user"
              id="user"
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
          {showOtpField && (
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
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-4 py-2 rounded-lg text-white font-semibold transition ${
              isSubmitting
                ? "bg-sky-300 cursor-not-allowed"
                : "bg-sky-500 hover:bg-sky-600"
            }`}
          >
            {isSubmitting ? "Sending Email..." : "Submit"}
          </button>
        </form>
        <div className="text-blue-500 text-sm text-center mt-5">
          <button
            onClick={handleResendOTP}
            disabled={isResending}
            className={`hover:underline hover:cursor-pointer hover:text-blue-700 `}
          >
            Didn't received the OTP? Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
