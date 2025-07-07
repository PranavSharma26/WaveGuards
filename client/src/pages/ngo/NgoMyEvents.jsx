import React, { useEffect } from 'react'
import { Navbar } from '../../components/Navbar'
import { ngoAuth } from '../../context/ngo/NgoContext'
import EventCard from '../../components/events/EventCard'
const NgoMyEvents = () => {
  const {ngoEvents, fetchNgoEvents} = ngoAuth() 
  
  useEffect(()=>{
    fetchNgoEvents()
  },[])
  
  return (
    <>
      <Navbar/>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">My Events</h2>
        {ngoEvents === null ? (
          <p className="text-red-500">Failed to load events.</p>
        ) : ngoEvents.length === 0 ? (
          <p className='dark:text-white'>No events joined yet.</p>
        ) : (
          <ul className="space-y-4">
            {ngoEvents.map((event, index) => (
              <EventCard event={event}/>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default NgoMyEvents