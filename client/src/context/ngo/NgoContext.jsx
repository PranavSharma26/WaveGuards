import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { backendURL } from "../../utils/getBackendURL.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const NgoContext = createContext();

export const NgoProvider = ({ children }) => {
  const navigate = useNavigate()
  const [ngo, setNgo] = useState(null);
  const [ngoLoading, setNgoLoading] = useState(true);
  const [ngoEvents, setNgoEvents] = useState([])
  const [ngoUpcomingEvents, setNgoUpcomingEvents] = useState([])
  const [ngoOngoingEvents, setNgoOngoingEvents] = useState([])
  const [ngoPastEvents, setNgoPastEvents] = useState([])

  const loginNgo = (ngoData) => {
    setNgo(ngoData);
  };

  const updateNgoName = async (newName) => {
    try {
      const res = await axios.patch(`${backendURL}/api/update/name`,{id: ngo.id, newName: newName, role: "ngo"},{withCredentials: true})
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error || "Error Updating Bio")
    }
  }

  const updateNgoBio = async (newBio) => {
    try {
      const res = await axios.patch(`${backendURL}/api/update/bio`,{id: ngo.id, newBio: newBio, role: "ngo"},{withCredentials: true})
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error || "Error Updating Bio")
    }
  }

  const updateNgoPhone = async (newPhone) => {
    try {
      const res = await axios.patch(`${backendURL}/api/update/phoneNumber`,{id: ngo.id, newPhoneNumber: newPhone, role: "ngo"},{withCredentials: true})
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error || "Error Updating Phone")
    }
  }

  const updateNgoAddress = async (newAddress) => {
    try {
      const res = await axios.patch(`${backendURL}/api/update/address`,{id: ngo.id, address: newAddress.address, city: newAddress.city, state: newAddress.state, country: newAddress.country, role: "ngo"},{withCredentials: true})
      toast.success("Address Updated Successfully")
    } catch (error) {
      toast.error(error || "Error Updating Location")
    }
  }

  const logoutNgo = async () => {
    try {
      const res = await axios.post(
        `${backendURL}/api/logout`,
        {},
        { withCredentials: true }
      );
      setNgo(null);
      toast.success("Logged Out");
      navigate('/')
    } catch (error) {
      toast.error("Error in Log out");
    }
  };

  const fetchNgoEvents = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/ngo/${ngo?.id}/my-events`,{},{withCredentials: true})
      setNgoEvents(res.data.events)
      setNgoUpcomingEvents(res.data.upcomingEvents)
      setNgoOngoingEvents(res.data.ongoingEvents)
      setNgoPastEvents(res.data.pastEvents)
    } catch (error) {
      setNgoEvents([])
      setNgoUpcomingEvents([])
      setNgoOngoingEvents([])
      setNgoPastEvents([])
    }
  }

  useEffect(() => {
    const fetchNgo = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/me`, {
          withCredentials: true,
        });
        const ngoData = { ...res.data.data, role: res.data.role };
        setNgo(ngoData);
      } catch (error) {
        console.log("Please Log In");
        setNgo(null);
      } finally {
        setNgoLoading(false);
      }
    };
    fetchNgo();
  }, []);

  return (
    <NgoContext.Provider value={{ ngo, setNgo, ngoLoading, loginNgo, updateNgoBio, updateNgoPhone, updateNgoName, updateNgoAddress, ngoEvents, ngoUpcomingEvents, ngoOngoingEvents, ngoPastEvents, fetchNgoEvents, logoutNgo }}>
      {children}
    </NgoContext.Provider>
  );
};

export const ngoAuth = () => useContext(NgoContext);
