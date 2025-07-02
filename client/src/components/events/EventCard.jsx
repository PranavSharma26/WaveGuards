import React, { useState } from "react";
import { userAuth } from "../../context/user/UserContext";
import { ngoAuth } from "../../context/ngo/NgoContext";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import { getDate, getTime } from "../../utils/function.js";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { eventAuth } from "../../context/event/EventContext.jsx";
import { backendURL } from "../../utils/getBackendURL.js";
import toast from "react-hot-toast";

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const { user, userLoading, joinEvent, unregisterEvent } = userAuth();
  const { ngo, ngoLoading } = ngoAuth();
  const profile = user || ngo;

  if (userLoading || ngoLoading) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4" />
        <div className="h-4 bg-gray-200 rounded w-full mb-2" />
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-4" />
        <div className="h-4 bg-gray-100 rounded w-1/2" />
      </div>
    );
  }

  if (!profile) return null;
  const role = profile.role;
  const {likeEvent, unlikeEvent} = eventAuth()
  const [like, setLike] = useState(event.isLiked);
  const [likeCount, setLikeCount] = useState(event.like)
  // TODO : time gap of 10 sec. before sending request to server
  const handleLikeEvent = async () => {
    setLike(true)
    setLikeCount(likeCount+1)
    await likeEvent(profile.id, event.id)
  }
  const handleUnlikeEvent = async () => {
    setLike(false)
    setLikeCount(likeCount-1)
    await unlikeEvent(profile.id, event.id)
  }
  const handleJoinEvent = async () => {
    try {
      if(confirm("Do you want to join the event?")){
       await joinEvent(event.id) 
       window.location.reload()
      }
    } catch (error) {
      toast.error("Error Joining Event")
    }
  }
  const handleUnregisterEvent = async () => {
    try {
      if(confirm("Do you want to unregister from the event?")){
       await unregisterEvent(event.id) 
       window.location.reload()
      }
    } catch (error) {
      toast.error("Error Unregistering Event")
    }
  }

  return (
    <div className="w-full sm:min-w-[300px] sm:max-w-md mx-auto bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 space-y-4 border border-gray-100 min-h-[300px]">
  <div className="-mt-6 -mx-6">
    <img
      src={
        event.image
          ? `${backendURL}/api/event/image/${event.id}`
          : "https://www.texasdisposal.com/wp-content/uploads/2024/10/ocean-pollution-23.jpg"
      }
      alt={event.title}
      className="w-full h-48 object-cover rounded-t-2xl"
    />
  </div>
      <div className="relative">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h2>
        <p className="text-gray-600 mt-1 line-clamp-3 min-h-[75px]">
          {event.description}
        </p>
        {role === "user" ? (
          <div className="absolute top-0 right-0 text-[12px] text-center">
            {like ? (
              <FavoriteIcon className=" text-red-500 hover:cursor-pointer" onClick={handleUnlikeEvent}/>
            ) : (
              <FavoriteBorderIcon className=" text-red-500 hover:cursor-pointer" onClick={handleLikeEvent}/>
            )}
            <p className="text-gray-500">{likeCount}</p>
          </div>
        ) : (
          <div className="absolute top-0 right-0 text-[12px] text-center">
            <FavoriteBorderIcon className=" text-red-500" />
            <p className="text-gray-500">{likeCount}</p>
          </div>
        )}
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <LocationOnOutlinedIcon fontSize="small" className="text-blue-400" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarTodayOutlinedIcon
            fontSize="small"
            className="text-green-600"
          />
          <span>{getDate(event.start_time)}</span>
        </div>
        <div className="flex items-center gap-2">
          <AccessTimeOutlinedIcon
            fontSize="small"
            className="text-yellow-600"
          />
          <span>{getTime(event.start_time)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2 text-blue-500 font-medium text-sm">
          <PeopleAltOutlinedIcon fontSize="small" />
          <span>{event.volunteers<=1 ? `${event.volunteers} volunteer joined`: `${event.volunteers} volunteers joined`}</span>
        </div>
        {event.status !== "upcoming" && (
          <div className="flex items-center gap-1 text-yellow-500 font-medium text-sm">
            <StarIcon fontSize="small" />
            <span>{event.rating || '-'}</span>
          </div>
        )}
      </div>
      <div className="text-sm text-gray-500 flex gap-2">
        <p>Organized By:</p>
        <span className="hover:cursor-pointer hover:underline hover:text-gray-700">
          Beach Trust Ltd.
        </span>
      </div>
      {role === "user" && event.status === "upcoming" && (
        <>
        { event.isJoined ? (
          <button
          onClick={handleUnregisterEvent}
          className="w-full mt-4 bg-gradient-to-r from-green-600 via-green-400 to-green-300 text-white py-2 rounded-lg font-semibold  transition-all duration-200 
          hover:from-red-600 hover:to-red-400 hover:via-red-400
          hover:cursor-pointer"
          >
            Unregister
          </button>
        ):(
          <button
          onClick={handleJoinEvent}
          className="w-full mt-4 bg-gradient-to-r from-sky-700 via-sky-500 to-sky-400 text-white py-2 rounded-lg font-semibold hover:from-sky-800 hover:via-sky-600 hover:to-sky-500 transition-all duration-200"
          >
            Join Now
          </button>
        )}
        </>
      )}
    </div>
  );
};

export default EventCard;
