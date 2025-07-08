import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { ngoAuth } from "../../context/ngo/NgoContext";
import EditIcon from '@mui/icons-material/Edit';
import EventCard from "../../components/events/EventCard";
import EventEditForm from "../../components/events/EventEditForm"
const NgoMyEvents = () => {
  const [showEditForm, setShowEditForm] = useState(false)
  const [selectedEvent,setSelectedEvent] = useState(null)
  const {
    ngoUpcomingEvents,
    ngoOngoingEvents,
    ngoPastEvents,
    fetchNgoEvents,
  } = ngoAuth();

  const closeForm = () => {
    setShowEditForm(false)
  }

  const toggleEditFormVisibility = (event) => {
    setSelectedEvent(event)
    setShowEditForm((prev)=>!prev)
  }

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
                <div key={index} className="relative">
                  <EventCard event={event} />
                  <div className="absolute right-4 bottom-4 font-bold flex text-teal-600 hover:text-teal-700 
                  dark:text-teal-400 dark:hover:text-teal-600
                  hover:cursor-pointer hover:scale-105 transition-transform" onClick={()=>toggleEditFormVisibility(event)}>
                    <EditIcon/>
                    <p>Edit</p>
                  </div>
                </div>

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
      {showEditForm && (
        <div
        className="fixed inset-0 bg-gray-500/30 backdrop-blur-md flex justify-center items-center p-2 z-50"
        onClick={closeForm}
      >
        <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg">
          <EventEditForm event={selectedEvent} onClose={closeForm} />
        </div>
      </div>
      )}
    </>
  );
};

export default NgoMyEvents;
