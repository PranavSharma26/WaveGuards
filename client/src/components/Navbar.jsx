import React from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate()
	const handleLoginClick = () => {
		navigate('/login')
	}
  return (
    <div className="p-4 bg-sky-500 text-white">
      <div className="flex justify-between">
        <div className="flex gap-2 font-bold text-2xl tracking-wide font-stretch-105% hover:cursor-pointer">
          <p>WaveGuard</p>
          <img src="wave-2.png" alt="wave" className="w-7" />
        </div>
        <button className="bg-yellow-400 border-2 border-white shadow-xl px-4 font-medium rounded-sm text-black hover:cursor-pointer" onClick={handleLoginClick}>
          Login
        </button>
      </div>
    </div>
  );
};
