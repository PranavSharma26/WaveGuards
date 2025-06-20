import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendURL } from "../../utils/getBackendURL.js";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const user =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(localStorage.getItem("ngo"));

  const mode = user.data.mode;

  const toggleShowPassword = (type) => {
    if (type === "old") setShowOldPassword((prev) => !prev);
    else setShowNewPassword((prev) => !prev);
  };
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
			const finalData={
				id: user.data.id,
				oldPassword: data.oldPassword,
				newPassword: data.newPassword,
				role: user.data.role,
				mode: mode
			}
			console.log({finalData: finalData})
			const res = await axios.patch(`${backendURL}/api/password/change`,finalData)
			toast.success(res.data.message)
			navigate('/login')
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal Server Error");
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

      <div className="relative bg-white p-8 md:p-10 border border-white rounded-2xl shadow-xl w-full max-w-md hover:ring-2 ring-white transition duration-300 ease-in-out">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Change Password
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-6 "
          autoComplete="off"
        >
          {mode===2 && (
          <div className="flex flex-col relative">
            <label className="text-sm mb-1 pl-1 text-gray-700">
              Enter Old Password
            </label>
            <input
              {...register("oldPassword", {
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
              type={showOldPassword ? "text" : "password"}
              className="bg-white border border-gray-300 rounded-md p-2 px-3 focus:ring-2 focus:ring-teal-300 outline-none text-sm transition pr-10"
            />
            <div
              className="absolute top-7.5 right-3 cursor-pointer text-gray-500 hover:text-gray-800 transition"
              onClick={() => toggleShowPassword("old")}
            >
              {showOldPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </div>
          </div>
          )}
          <div className="flex flex-col relative">
            <label className="text-sm mb-1 pl-1 text-gray-700">
              Enter New Password
            </label>
            <input
              {...register("newPassword", {
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
              type={showNewPassword ? "text" : "password"}
              className="bg-white border border-gray-300 rounded-md p-2 px-3 focus:ring-2 focus:ring-teal-300 outline-none text-sm transition pr-10"
            />
            <div
              className="absolute top-7.5 right-3 cursor-pointer text-gray-500 hover:text-gray-800 transition"
              onClick={() => toggleShowPassword("new")}
            >
              {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </div>
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
            {isSubmitting ? "Sending Email..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
