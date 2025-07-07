import React, { useEffect } from 'react'
import {Navbar} from "../../components/Navbar"
import { userAuth } from '../../context/user/UserContext'
import EventCard from "../../components/events/EventCard"
const UserMyEvents = () => {

  const {userEvents, fetchUserEvents} = userAuth()

  useEffect(()=>{
    fetchUserEvents()
  },[])


  return (
    <>
      <Navbar/>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">My Events</h2>
        {userEvents === null ? (
          <p className="text-red-500">Failed to load events.</p>
        ) : userEvents.length === 0 ? (
          <p className='dark:text-white'>No events joined yet.</p>
        ) : (
          <ul className="space-y-4">
            {userEvents.map((event, index) => (
              <EventCard event={event}/>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default UserMyEvents