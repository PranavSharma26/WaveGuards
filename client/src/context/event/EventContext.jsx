import { useContext, createContext, useState, useEffect } from "react";
import { backendURL } from "../../utils/getBackendURL.js";
import toast from "react-hot-toast";
import axios from "axios";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/event/get`, {
        withCredentials: true,
      });
      setUpcomingEvents(res.data.data.upcomingEvents);
      setOngoingEvents(res.data.data.ongoingEvents);
      setPastEvents(res.data.data.pastEvents);
    } catch (error) {
      toast.error("Error fetching events");
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventContext.Provider
      value={{ upcomingEvents, ongoingEvents, pastEvents }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const eventAuth = () => useContext(EventContext);
