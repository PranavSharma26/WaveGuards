import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import EventCard from '../../components/events/EventCard';
import { eventAuth } from '../../context/event/EventContext';

const EventsPage = () => {
  const { upcomingEvents, ongoingEvents, pastEvents } = eventAuth();
  const [activeTab, setActiveTab] = useState('upcoming'); 
  
  const handlePostEvent = () => {
    
  };

  const getEventsToDisplay = () => {
    if (activeTab === 'upcoming') return upcomingEvents || [];
    if (activeTab === 'ongoing') return ongoingEvents || [];
    if (activeTab === 'past') return pastEvents || [];
    return [];
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Events</h1>
            <button
              className="bg-teal-500 text-white font-bold p-2 rounded-xl hover:bg-teal-600 transition-colors"
              onClick={handlePostEvent}
            >
              Post Event
            </button>
          </div>

          <div className="flex space-x-4 justify-center mb-8">
            {['upcoming', 'ongoing', 'past'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium capitalize transition-all
                  ${
                    activeTab === tab
                      ? 'bg-teal-400 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
              >
                {tab} Events
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getEventsToDisplay().length > 0 ? (
              getEventsToDisplay().map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">No events to display.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsPage;
