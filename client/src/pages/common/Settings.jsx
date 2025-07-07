import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { userAuth } from "../../context/user/UserContext";
import { ngoAuth } from "../../context/ngo/NgoContext";
import { useNavigate } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import axios from "axios";
import { backendURL } from "../../utils/getBackendURL";
import toast from "react-hot-toast";

const Settings = () => {
  const { user, userLoading, logoutUser } = userAuth();
  const { ngo, ngoLoading, logoutNgo } = ngoAuth();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(()=>{
    const currMode = localStorage.getItem('mode')
    return currMode === "true" ? true : false
  })
  if (userLoading || ngoLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  const profile = user || ngo;
  const role = profile?.role;

  const toggleDarkMode = () => {
    setIsDark((prev)=>{
      localStorage.setItem('mode',JSON.stringify(!prev))
      return !prev
    })
  }

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmed) return;
    try {
      const res = await axios.delete(`${backendURL}/api/delete-user`,{withCredentials: true})
      toast.success("Account Deleted Successfully")
      navigate("/")
      window.location.reload()
    } catch (error) {
      console.log(error)
      toast.error("Error Deleting Account")
    }
  };

  const handleLogout = async () => {
    profile.role === "user" ? await logoutUser() : await logoutNgo();
    window.location.reload();
  };

  const handleChangePassword = () => {
    navigate("/change-password-after-login");
  };

  useEffect(()=>{
    if(isDark){
      document.documentElement.classList.add("dark")
    }
    else{
      document.documentElement.classList.remove("dark")
    }
  },[isDark])

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-12 p-6 bg-white dark:bg-gray-800 dark:text-white rounded-2xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Account Settings</h1>
          <p className="text-gray-500 mt-1">
            Manage your profile and preferences
          </p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4 ">
            <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-xl font-semibold text-white ">
              {profile?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-lg font-medium text-gray-800 dark:text-white">
                {profile?.name}
              </p>
              <p className="text-sm text-gray-400 capitalize">{role}</p>
            </div>
          </div>
          <div className="mr-5">
            {isDark ? (
              <DarkModeIcon onClick={toggleDarkMode}/>
            ) : (
              <LightModeIcon onClick={toggleDarkMode}/>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleChangePassword}
            className="w-full bg-teal-400 text-white font-medium py-2.5 rounded-lg hover:bg-teal-500 transition"
          >
            Change Password
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-gray-300 text-gray-800 font-medium py-2.5 rounded-lg hover:bg-gray-400 transition"
          >
            Log Out
          </button>

          <button
            onClick={handleDeleteAccount}
            className="w-full bg-red-500 text-white font-medium py-2.5 rounded-lg hover:bg-red-600 transition"
          >
            Delete My Account
          </button>
        </div>
      </div>
    </>
  );
};

export default Settings;
