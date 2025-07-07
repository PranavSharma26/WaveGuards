import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {userAuth} from "../../context/user/UserContext.jsx"
import {ngoAuth} from "../../context/ngo/NgoContext.jsx"
import { backendURL } from "../../utils/getBackendURL.js";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import toast from "react-hot-toast";

const ChangePasswordAfterLogin = () => {
	const {user, userLoading} = userAuth()
	const {ngo, ngoLoading} = ngoAuth()

	
	const profile = user || ngo
	const role = profile?.role
	const navigate = useNavigate()
	const [showOldPassword, setShowOldPassword] = useState(false)
	const [showNewPassword, setShowNewPassword] = useState(false)
	const mode = 2
	const {register, handleSubmit, formState:{isSubmitting, errors}} = useForm()
	
	const toggleShowPassword = (k) => {
		k==="new" ? setShowNewPassword((prev)=>!prev) : setShowOldPassword((prev)=>!prev)
		
	}
	
  const onSubmit = async (data) => {
		try {
			if(data.oldPassword===data.newPassword){
				toast.error("Old Password and New Password should be different")
				return;
			}
			const res = await axios.patch(`${backendURL}/api/password/change`,{
				id: profile.id,
				oldPassword: data.oldPassword,
				newPassword: data.newPassword,
				role: role,
				mode: 2
			},{withCredentials: true})
			if(!res.data.success) toast.error(res.data.message)
				toast.success("Password Updated")
				navigate(`/settings/${role}`)
		} catch (error) {
			toast.error("Error Changing Password")
		}
  };

	if (userLoading || ngoLoading) {
		return (
			<div className="h-screen flex items-center justify-center">
				<p className="text-gray-600 text-lg">Loading...</p>
			</div>
		);
	}
	
  return (
		<div className="bg-gradient-to-br from-sky-100 via-sky-200 to-sky-100 dark:from-gray-800 dark:to-gray-800 dark:via-gray-950 h-screen w-screen flex flex-col items-center justify-center px-4">
      <div className="absolute top-6 left-6 cursor-pointer">
        <HomeIcon
          className="text-sky-800 dark:text-sky-500 text-3xl hover:scale-110 transition"
          onClick={() => navigate(`/settings/${role}`)}
        />
      </div>

      <div className="relative bg-white dark:bg-gray-800 dark:text-white p-8 md:p-10 border border-white rounded-2xl shadow-xl w-full max-w-md hover:ring-2 ring-white transition duration-300 ease-in-out">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">
          Change Password
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-6 "
          autoComplete="off"
        >
          {mode === 2 && (
            <div className="flex flex-col relative">
              <label className="text-sm mb-1 pl-1 text-gray-700 dark:text-gray-300">
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
                className="bg-white border dark:bg-gray-700 border-gray-300 dark:text-gray-300 rounded-md p-2 px-3 focus:ring-2 focus:ring-teal-300 outline-none text-sm transition pr-10"
              />
              <div
                className="absolute top-7.5 right-3 cursor-pointer text-gray-500 dark:text-gray-200 dark:hover:text-gray-400 hover:text-gray-800 transition"
                onClick={() => toggleShowPassword("old")}
              >
                {showOldPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </div>
							{errors.oldPassword && (
								<p className="pl-1 text-red-500 text-sm mt-1">
									{errors.oldPassword.message}
								</p>
							)}
            </div>
          )}
          <div className="flex flex-col relative">
            <label className="text-sm mb-1 pl-1 text-gray-700 dark:text-gray-300">
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
              className="bg-white border dark:bg-gray-700 border-gray-300 rounded-md p-2 px-3 focus:ring-2 focus:ring-teal-300 outline-none text-sm transition pr-10"
            />
            <div
              className="absolute top-7.5 right-3 cursor-pointer text-gray-500 dark:text-gray-200 dark:hover:text-gray-400 hover:text-gray-800 transition"
              onClick={() => toggleShowPassword("new")}
            >
              {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </div>
						{errors.newPassword && (
								<p className="pl-1 text-red-500 text-sm mt-1">
									{errors.newPassword.message}
								</p>
							)}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-4 py-2 rounded-lg text-white font-semibold transition ${
              isSubmitting
                ? "bg-sky-300 cursor-not-allowed"
                : "bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700"
            }`}
          >
            {isSubmitting ? "Sending Email..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordAfterLogin;
