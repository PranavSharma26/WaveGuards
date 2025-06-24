import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { userAuth } from "../context/user/UserContext";
import { ngoAuth } from "../context/ngo/NgoContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import { Country, State, City } from "country-state-city";

const Account = () => {
  const navigate = useNavigate();
  const {
    user,
    userLoading,
    updateUserBio,
    updateUserPhone,
    updateUserName,
    updateUserAddress,
    logoutUser,
  } = userAuth();
  const {
    ngo,
    ngoLoading,
    updateNgoBio,
    updateNgoPhone,
    updateNgoName,
    updateNgoAddress,
    logoutNgo,
  } = ngoAuth();
  if (userLoading || ngoLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  let profile = user || ngo;
  if (!profile) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">No profile found.</p>
      </div>
    );
  }
  const role = profile.role;
  const [bio, setBio] = useState(profile.bio);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [phone, setPhone] = useState(profile.phoneNumber);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [name, setName] = useState(profile.name);
  const [isEditingName, setIsEditingName] = useState(false);
  const [allCity, setAllCity] = useState([]);
  const [allState, setAllState] = useState([]);
  const [allCountry, setAllCountry] = useState([]);

  const [city, setCity] = useState(profile.city);
  const [state, setState] = useState(profile.state);
  const [country, setCountry] = useState(profile.country);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const handleEditName = async () => {
    if (!isEditingName) {
      setIsEditingName(true);
    } else {
      if (name !== profile.name) {
        if (role === "user") {
          await updateUserName(name);
        } else {
          await updateNgoName(name);
        }
      }
      setIsEditingName(false);
    }
  };
  
  const handleEditBio = async () => {
    if (!isEditingBio) {
      setIsEditingBio(true);
    } else {
      if (bio !== profile.bio) {
        if (role === "user") {
          await updateUserBio(bio);
        } else {
          await updateNgoBio(bio);
        }
      }
      setIsEditingBio(false);
    }
  };
  const handleEditPhone = async () => {
    if (!isEditingPhone) {
      setIsEditingPhone(true);
    } else {
      const trimmedPhone = phone.trim();

      if (trimmedPhone === "") {
        toast.error("Phone number cannot be empty.");
        return;
      }
      const phoneRegex = /^[0-9]{9,11}$/;
      if (!phoneRegex.test(trimmedPhone)) {
        toast.error("Invalid phone number format.");
        return;
      }
      if (trimmedPhone !== profile.phoneNumber.trim()) {
        if (role === "user") {
          await updateUserPhone(trimmedPhone);
        } else {
          await updateNgoPhone(trimmedPhone);
        }
      }
      setIsEditingPhone(false);
    }
  };

  const handleEditAddress = async () => {
    if (!isEditingAddress) {
      setIsEditingAddress(true);
    } else {
      if (city !== profile.city) {
        const newAddress = {
          address: "Address",
          city: city.name,
          state: state.name,
          country: country.name,
        };
        console.log(newAddress)
        if (role === "user") {
          await updateUserAddress(newAddress);
        } else {
          await updateNgoAddress(newAddress);
        }
        window.location.reload()
      }
      setIsEditingAddress(false);
    }
  };

  const handleLogout = async () => {
    role === "user" ? await logoutUser() : await logoutNgo();
    navigate("/");
  };

  useEffect(() => {
    setAllCountry(Country.getAllCountries());
  }, []);
  useEffect(() => {
    if (country && country.isoCode) {
      setAllState(State.getStatesOfCountry(country.isoCode));
    } else {
      setAllState([]);
    }
  }, [country]);
  useEffect(() => {
    if (country?.isoCode && state?.isoCode) {
      setAllCity(City.getCitiesOfState(country.isoCode, state.isoCode));
    } else {
      setAllCity([]);
    }
  }, [country,state]);

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">My Account</h1>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="flex flex-col items-center md:items-start">
              <img
                src={profile?.profilePicture || "/user-2.png"}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
              />
              <div className="flex gap-3 mt-4 items-center justify-center">
                {isEditingName ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name"
                    className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all w-44"
                  />
                ) : (
                  <h2 className="text-xl font-semibold  text-center md:text-left">
                    {name || "User Name"}
                  </h2>
                )}
                {isEditingName ? (
                  <DoneOutlineOutlinedIcon
                    className="hover:cursor-pointer hover:scale-105 hover:text-teal-600"
                    onClick={handleEditName}
                  />
                ) : (
                  <EditOutlinedIcon
                    className="hover:cursor-pointer hover:scale-105 hover:text-sky-700"
                    onClick={handleEditName}
                  />
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-center md:text-left">
                {profile?.email || "user@example.com"}
              </p>
              <div className="flex gap-3 justify-center">
                {isEditingPhone ? (
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone no."
                    className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all w-32"
                  />
                ) : (
                  <p className="text-gray-600 dark:text-gray-300 text-center md:text-left">
                    Phone: {phone || "N/A"}
                  </p>
                )}
                {isEditingPhone ? (
                  <DoneOutlineOutlinedIcon
                    className="hover:cursor-pointer hover:scale-105 hover:text-teal-600"
                    onClick={handleEditPhone}
                  />
                ) : (
                  <EditOutlinedIcon
                    className="hover:cursor-pointer hover:scale-105 hover:text-sky-700"
                    onClick={handleEditPhone}
                  />
                )}
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 dark:text-gray-300">
              <div className="flex gap-2">
                <span className="font-semibold">Country:</span>{" "}
                {isEditingAddress ? (
                  <div>
                    <select
                      name="country"
                      className="w-40"
                      onChange={(e) => {
                        const selected = allCountry.find(
                          (c) => c.name === e.target.value
                        );
                        setCountry(selected);
                        setState(null);
                        setCity(null);
                      }}
                    >
                      {allCountry.map((c) => (
                        <option key={c.isoCode || c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <>{profile?.country || "N/A"}</>
                )}
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">State:</span>{" "}
                {isEditingAddress ? (
                  <div>
                    <select
                      name="state"
                      className="w-40"
                      onChange={(e) => {
                        const selected = allState.find(
                          (s) => s.name === e.target.value
                        );
                        setState(selected);
                        setCity(null);
                      }}
                    >
                      {allState.map((s) => (
                        <option key={s.isoCode || s.name} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <>{profile?.state || "N/A"}</>
                )}
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">City:</span>{" "}
                {isEditingAddress ? (
                  <div>
                    <select
                      name="city"
                      className="w-40"
                      onChange={(e) => {
                        const selected = allCity.find(
                          (c) => c.name === e.target.value
                        );
                        setCity(selected);
                      }}
                    >
                      {allCity.map((c) => (
                        <option key={c.isoCode || c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <>{profile?.city|| "N/A"}</>
                )}
                {isEditingAddress ? (
                  <DoneOutlineOutlinedIcon
                    className="hover:cursor-pointer hover:scale-105 hover:text-teal-600"
                    onClick={handleEditAddress}
                  />
                ) : (
                  <EditOutlinedIcon
                    className="hover:cursor-pointer hover:scale-105 hover:text-sky-700"
                    onClick={handleEditAddress}
                  />
                )}
              </div>

              <div>
                <span className="font-semibold">Points:</span>{" "}
                {profile?.points || 0}
              </div>
              <div>
                <span className="font-semibold">Waste Collected:</span>{" "}
                {profile?.totalWasteCollected || 0} kg
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex gap-4 items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 ">
                Bio
              </h3>
              {isEditingBio ? (
                <DoneOutlineOutlinedIcon
                  className="hover:cursor-pointer hover:scale-105 hover:text-teal-600"
                  onClick={handleEditBio}
                />
              ) : (
                <EditOutlinedIcon
                  className="hover:cursor-pointer hover:scale-105 hover:text-sky-700"
                  onClick={handleEditBio}
                />
              )}
            </div>
            {isEditingBio ? (
              <textarea
                name="bio"
                id="bio"
                value={bio || ""}
                className="bg-gray-50 w-88 p-2 min-h-16 ring-teal-400 focus:ring-2 outline-none"
                onChange={(e) => setBio(e.target.value)}
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                {bio || "No bio added yet."}
              </p>
            )}
          </div>

          <div className="mt-6 flex gap-4 justify-center sm:justify-end">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
