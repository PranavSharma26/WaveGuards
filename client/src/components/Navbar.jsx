import React from "react";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../context/user/UserContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = userAuth();
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleLogoutClick = async () => {
      await logoutUser()
  };
  return (
    <div className="p-4 bg-sky-500 text-white">
      <div className="flex justify-between">
        <div className="flex gap-2 font-bold text-2xl tracking-wide font-stretch-105% hover:cursor-pointer">
          <p>WaveGuard</p>
          <img src="wave-2.png" alt="wave" className="w-7" />
        </div>
        {user ? (
          <button
            className="bg-red-400 border-2 border-white shadow-xl px-4 font-medium rounded-sm text-black hover:cursor-pointer"
            onClick={handleLogoutClick}
          >
            Logout
          </button>
        ) : (
          <button
            className="bg-yellow-400 border-2 border-white shadow-xl px-4 font-medium rounded-sm text-black hover:cursor-pointer"
            onClick={handleLoginClick}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};
