import React from "react";
import { userAuth } from "../../context/user/UserContext";
import { ngoAuth } from "../../context/ngo/NgoContext";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from "react-router-dom";
import { getDate, getTime } from "../../utils/function.js";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const { user, userLoading } = userAuth();
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

  return (
    <div className="w-full sm:min-w-[300px] sm:max-w-md mx-auto bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 space-y-4 border border-gray-100 min-h-[300px]">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{event.title}</h2>
        <p className="text-gray-600 mt-1 line-clamp-3 min-h-[75px]">
          {event.description}
        </p>
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <LocationOnOutlinedIcon fontSize="small" className="text-blue-400" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarTodayOutlinedIcon fontSize="small" className="text-green-600" />
          <span>{getDate(event.start_time)}</span>
        </div>
        <div className="flex items-center gap-2">
          <AccessTimeOutlinedIcon fontSize="small" className="text-yellow-600" />
          <span>{getTime(event.start_time)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2 text-blue-500 font-medium text-sm">
          <PeopleAltOutlinedIcon fontSize="small" />
          <span>100 volunteers joined</span>
        </div>
        <div className="flex items-center gap-1 text-yellow-500 font-medium text-sm">
          <StarIcon fontSize="small" />
          <span>4.8</span>
        </div>
      </div>
      <div className="text-sm text-gray-500 flex gap-2">
        <p>Organized By:</p>
        <span className="hover:cursor-pointer hover:underline hover:text-gray-700">
          Beach Trust Ltd.
        </span>
      </div>
      {role === "user" && (
        <button
          onClick={() => navigate("/events/tech-meetup-2025")}
          className="w-full mt-4 bg-gradient-to-r from-sky-600 to-sky-500 text-white py-2 rounded-lg font-semibold hover:from-sky-700 hover:to-sky-600 transition-all duration-200"
        >
          Join Now
        </button>
      )}
    </div>
  );
};

export default EventCard;