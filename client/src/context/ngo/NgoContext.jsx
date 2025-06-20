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

  const loginNgo = (ngoData) => {
    setNgo(ngoData);
  };

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
    <NgoContext.Provider value={{ ngo, ngoLoading, loginNgo, logoutNgo }}>
      {children}
    </NgoContext.Provider>
  );
};

export const ngoAuth = () => useContext(NgoContext);
