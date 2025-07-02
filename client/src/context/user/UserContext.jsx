import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { backendURL } from "../../utils/getBackendURL.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const loginUser = (userData) => {
    setUser(userData);
  };

  const updateUserName = async (newName) => {
    try {
      const res = await axios.patch(
        `${backendURL}/api/update/name`,
        { id: user.id, newName: newName, role: "user" },
        { withCredentials: true }
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error || "Error Updating Bio");
    }
  };

  const updateUserBio = async (newBio) => {
    try {
      const res = await axios.patch(
        `${backendURL}/api/update/bio`,
        { id: user.id, newBio: newBio, role: "user" },
        { withCredentials: true }
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error || "Error Updating Bio");
    }
  };

  const updateUserPhone = async (newPhone) => {
    try {
      const res = await axios.patch(
        `${backendURL}/api/update/phoneNumber`,
        { id: user.id, newPhoneNumber: newPhone, role: "user" },
        { withCredentials: true }
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error || "Error Updating Phone");
    }
  };

  const updateUserAddress = async (newAddress) => {
    try {
      const res = await axios.patch(
        `${backendURL}/api/update/address`,
        {
          id: user.id,
          address: newAddress.address,
          city: newAddress.city,
          state: newAddress.state,
          country: newAddress.country,
          role: "user",
        },
        { withCredentials: true }
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error || "Error Updating Location");
    }
  };

  const joinEvent = async (event_id) => {
    try {
      const res = await axios.post(
        `${backendURL}/api/event/join`,
        {
          user_id: user?.id,
          event_id: event_id,
        },
        { withCredentials: true }
      );
      toast.success(res.data.message)
    } catch (error) {
      toast.error("Error Joining Event");
    }
  };

  const logoutUser = async () => {
    try {
      const res = await axios.post(
        `${backendURL}/api/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      toast.success("Logged Out");
      navigate("/");
    } catch (error) {
      toast.error("Error in Log out");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/me`, {
          withCredentials: true,
        });
        const userData = { ...res.data.data, role: res.data.role };
        setUser(userData);
      } catch (error) {
        console.log("Please Log In");
        setUser(null);
      } finally {
        setUserLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userLoading,
        loginUser,
        updateUserBio,
        updateUserPhone,
        updateUserName,
        updateUserAddress,
        joinEvent,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const userAuth = () => useContext(UserContext);
