import React from "react";
import { Navbar } from "../components/Navbar";
import { userAuth } from "../context/user/UserContext";

const Settings = () => {
  const { user, userLoading } = userAuth();
  if (userLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }
  return (
    <>
      <Navbar />
      <div>Settings</div>
    </>
  );
};

export default Settings;
