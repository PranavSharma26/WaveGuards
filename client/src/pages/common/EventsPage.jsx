import React from 'react';
import { Navbar } from '../../components/Navbar';
import EventCard from '../../components/events/EventCard';

const EventsPage = () => {
  const handlePostEvent = () => {

  }
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold text-gray-800">
            Upcoming Events
          </h1>
          <button className="bg-teal-400 text-white font-bold p-2 rounded-xl hover:bg-teal-500 transition-colors" onClick={handlePostEvent}>Post Event</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsPage;
