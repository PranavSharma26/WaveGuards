import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../context/user/UserContext";
import { ngoAuth } from "../context/ngo/NgoContext";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';

export const Navbar = () => {
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const dropdownRef = useRef(null)
  const navigate = useNavigate();
  const { user, logoutUser } = userAuth();
  const { ngo, logoutNgo } = ngoAuth();
  const isUser = !!user
  const handleLoginClick = () => {
    navigate("/login");
  };
  const toggleDropdown = () => {
    setShowDropdownMenu((prev) => !prev)
  }
  const handleAccountClick = () => {
    setShowDropdownMenu(false)
    navigate(`/account/${isUser ? "user":"ngo"}`)
  };
  const handleEventsClick = () => {
    setShowDropdownMenu(false)
    navigate(`/events`)
  };
  const handleSettingsClick = () => {
    setShowDropdownMenu(false)
    navigate(`/settings/${isUser ? "user":"ngo"}`)
  };
  const handleLogoutClick = async () => {
    setShowDropdownMenu(false)
    isUser ? await logoutUser() : await logoutNgo()
    navigate('/')
    window.location.reload()
  };

  useEffect(()=>{
    const handleClickOutside=(event)=>{
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
        setShowDropdownMenu(false)
      }
    }
    document.addEventListener("mousedown",handleClickOutside)
    return ()=>document.removeEventListener("mousedown",handleClickOutside)
  },[])

  return (
    <div className="p-4 bg-sky-500 text-white">
      <div className="flex justify-between">
        <div className="flex gap-2 font-bold text-2xl tracking-wide font-stretch-105% hover:cursor-pointer" onClick={()=>navigate('/')}>
          <p>WaveGuard</p>
          <img src="/wave-2.png" alt="wave" className="w-7" />
        </div>
        <div className="flex justify-center items-center relative" ref={dropdownRef}>
          {(user || ngo) ? (
            <button className="w-8 hover:cursor-pointer hover:scale-110 transition-transform" onClick={toggleDropdown} >
              <img src="/user-2.png" alt="" />
            </button>
          ) : (
            <button
              className="bg-yellow-400 border-2 border-white shadow-xl px-4 font-medium rounded-sm text-black hover:cursor-pointer"
              onClick={handleLoginClick}
            >
              Login
            </button>
          )}
          {showDropdownMenu && (
            <div className="text-black absolute top-10 right-0 border-1 rounded-lg bg-white shadow-xl px-1 border-gray-300">
              <ul className="text-gray-700 text-start">
                <li className="my-1 hover:bg-gray-100 pr-3 pl-2 py-2 rounded-lg  hover:cursor-pointer flex items-center gap-3" onClick={handleAccountClick}>
                 <AccountCircleOutlinedIcon/>
                 <p>Account</p>
                </li>
                <li className="my-1 hover:bg-gray-100 pr-3 pl-2 py-2 rounded-lg  hover:cursor-pointer flex items-center gap-3" onClick={handleEventsClick}>
                 <EventIcon/>
                 <p>Events</p>
                </li>
                <li className="my-1 hover:bg-gray-100 pr-3 pl-2 py-2 rounded-lg  hover:cursor-pointer flex items-center gap-3" onClick={handleSettingsClick}>
                 <SettingsIcon/>
                 <p>Settings</p>
                </li>
                <li className="my-1 hover:bg-gray-100 pr-3 pl-2 py-2 rounded-lg  hover:cursor-pointer flex items-center gap-3" onClick={handleLogoutClick}>
                 <LogoutIcon/>
                 <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};