import React, { useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { ngoAuth } from "../../context/ngo/NgoContext";
import EventCard from "../../components/events/EventCard";
const NgoMyEvents = () => {
  const {
    ngoEvents,
    ngoUpcomingEvents,
    ngoOngoingEvents,
    ngoPastEvents,
    fetchNgoEvents,
  } = ngoAuth();

  useEffect(() => {
    fetchNgoEvents();
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
          {ngoOngoingEvents === null ? (
            <p className="text-red-500">Failed to load events.</p>
          ) : ngoOngoingEvents.length === 0 ? (
            <p className="dark:text-white">No events joined yet.</p>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {ngoOngoingEvents.map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
            </div>
          )}
          <div className="border-b-2 dark:text-white"></div>
          <div className="text-xl font-light tracking-wider dark:text-white">
            Upcoming Events
          </div>
          {ngoUpcomingEvents === null ? (
            <p className="text-red-500">Failed to load events.</p>
          ) : ngoUpcomingEvents.length === 0 ? (
            <p className="dark:text-white">No events joined yet.</p>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {ngoUpcomingEvents.map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
            </div>
          )}
          <div className="border-b-2 dark:text-white"></div>
          <div className="text-xl font-light tracking-wider dark:text-white">Past Events</div>
          {ngoPastEvents === null ? (
            <p className="text-red-500">Failed to load events.</p>
          ) : ngoPastEvents.length === 0 ? (
            <p className="dark:text-white">No events joined yet.</p>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {ngoPastEvents.map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NgoMyEvents;
