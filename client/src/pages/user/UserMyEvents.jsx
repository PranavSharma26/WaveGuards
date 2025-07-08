import React, { useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { userAuth } from "../../context/user/UserContext";
import EventCard from "../../components/events/EventCard";
const UserMyEvents = () => {
  const {
    userEvents,
    userUpcomingEvents,
    userOngoingEvents,
    userPastEvents,
    fetchUserEvents,
  } = userAuth();

  useEffect(() => {
    fetchUserEvents();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-2 sm:p-8 md:p-10">
        <h2 className="text-2xl font-bold mb-4 dark:text-white text-center">
          My Events
        </h2>
        <div className="flex flex-col gap-4">
          <div className="p-2 px-4 border-2 w-fit flex items-center relative rounded-3xl dark:text-white dark:bg-gray-800">
            <p className="absolute left-3 -top-7 font-extrabold text-red-500 text-6xl">
              .
            </p>
            <p className="ml-4 font-bold">Live</p>
          </div>
          {userOngoingEvents === null ? (
            <p className="text-red-500">Failed to load events.</p>
          ) : userOngoingEvents.length === 0 ? (
            <p className="dark:text-white">No events joined yet.</p>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {userOngoingEvents.map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
            </div>
          )}
          <div className="border-b-2 dark:text-white"></div>
          <div className="text-xl font-light tracking-wider dark:text-white">
            Upcoming Events
          </div>
          {userUpcomingEvents === null ? (
            <p className="text-red-500">Failed to load events.</p>
          ) : userUpcomingEvents.length === 0 ? (
            <p className="dark:text-white">No events joined yet.</p>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {userUpcomingEvents.map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
            </div>
          )}
          <div className="border-b-2 dark:text-white"></div>
          <div className="text-xl font-light tracking-wider dark:text-white">Past Events</div>
          {userPastEvents === null ? (
            <p className="text-red-500">Failed to load events.</p>
          ) : userPastEvents.length === 0 ? (
            <p className="dark:text-white">No events joined yet.</p>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {userPastEvents.map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserMyEvents;
