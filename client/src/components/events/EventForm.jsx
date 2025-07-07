import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ngoAuth } from "../../context/ngo/NgoContext";
import { Country, State, City } from "country-state-city";
import { backendURL } from "../../utils/getBackendURL";
import toast from "react-hot-toast";

const EventForm = ({ onClose }) => {
  const { ngo } = ngoAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [allCountry, setAllCountry] = useState([]);
  const [allState, setAllState] = useState([]);
  const [allCity, setAllCity] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("image", imageFile);
    formData.append("start_time", data.start_time);
    if (data.end_time) {
      formData.append("end_time", data.end_time);
    } else {
      formData.append("end_time", null);
    }
    formData.append("location", data.location);
    formData.append("country", selectedCountry?.name || "");
    formData.append("state", selectedState?.name || "");
    formData.append("city", selectedCity?.name || "");
    formData.append("locationLink", data.locationLink);
    formData.append("ngo_id", ngo.id);
    
    try {
      const res = await axios.post(`${backendURL}/api/event/post`,formData,{withCredentials: true})
      toast.success(res.data.message)
      onClose();
    }
    catch (error) {
      toast.error("Error Posting Event")
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageFile(e.target.files[0]);
    } else {
      setImagePreview(null);
      setImageFile(null);
    }
  };

  useEffect(() => {
    setAllCountry(Country.getAllCountries());
  }, []);
  useEffect(() => {
    if (selectedCountry && selectedCountry.isoCode) {
      setAllState(State.getStatesOfCountry(selectedCountry.isoCode));
    } else {
      setAllState([]);
    }
  }, [selectedCountry]);
  useEffect(() => {
    if (selectedCountry?.isoCode && selectedState?.isoCode) {
      setAllCity(
        City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode)
      );
    } else {
      setAllCity([]);
    }
  }, [selectedState]);

  return (
    <div className="p-8 px-1 bg-gradient-to-br from-white via-teal-50 to-white dark:from-gray-800 dark:to-gray-800 dark:via-gray-900 dark:text-white rounded-lg shadow-xl w-full max-w-lg mx-auto relative">
      <p className="text-3xl sm:text-4xl font-extrabold text-center text-teal-700 dark:text-teal-400 mb-6">
        Post Event
      </p>
      <button
        className="absolute right-5 top-5 text-xl hover:text-red-400 hover:cursor-pointer"
        onClick={onClose}
      >
        {" "}
        &times;{" "}
      </button>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 max-h-[80vh] overflow-y-auto px-5 "
      >
        <div>
          <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">
            Event Title
          </label>
          <input
            type="text"
            {...register("title", { required: "Event title is required" })}
            className={`w-full p-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition ${
              errors.title ? "border-red-400" : "border-gray-200"
            }`}
            placeholder="Enter event title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className={`w-full p-2 border-2 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-teal-400 transition ${
              errors.description ? "border-red-400" : "border-gray-200"
            }`}
            rows={4}
            placeholder="Write about the event..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">
            Choose Banner
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              onChange={handleImageChange}
              className="w-full p-2 border-2
							border-gray-200 rounded-lg file:mr-3 file:py-1 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-100 file:text-teal-700 hover:file:bg-teal-100"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Image Preview"
                className="w-16 h-16 object-cover rounded-lg border"
              />
            )}
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">
            Start Date & Time
          </label>
          <input
            type="datetime-local"
            {...register("start_time", {
              required: "Start Date & Time is required",
            })}
            className={`w-full p-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition ${
              errors.start_time ? "border-red-400" : "border-gray-200"
            }`}
          />
          {errors.start_time && (
            <p className="text-red-500 text-sm mt-1">
              {errors.start_time.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">
            End Date & Time (Expected)
          </label>
          <input
            type="datetime-local"
            placeholder=""
            {...register("end_time")}
            className="w-full p-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition border-gray-200"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">
            Location
          </label>
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            className={`w-full p-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition ${
              errors.location ? "border-red-400" : "border-gray-200"
            }`}
            placeholder="e.g. Auditorium, Online"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        <div className="flex gap-2 ">
          <div className="flex flex-col items-center w-full">
            <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">
              Country
            </label>
            <select
              className="w-full"
              defaultValue=""
              onChange={(e) => {
                const selected = allCountry.find(
                  (c) => c.isoCode === e.target.value
                );
                setSelectedCountry(selected);
                setSelectedState(null);
                setSelectedCity(null);
              }}
            >
              <option value="" disabled>
                Select Country
              </option>
              {allCountry.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col items-center w-full">
            <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">
              State
            </label>
            <select
              className="w-full"
              onChange={(e) => {
                const selected = allState.find(
                  (s) => s.isoCode === e.target.value
                );
                setSelectedState(selected);
                setSelectedCity(null);
              }}
            >
              {allState.map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col items-center w-full">
            <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">
              City
            </label>
            <select
              className="w-full"
              onChange={(e) => {
                const selected = allCity.find((c) => c.name === e.target.value);
                setSelectedCity(selected);
              }}
            >
              {allCity.map((city) => (
                <option
                  key={`${city.name}-${city.latitude}-${city.longitude}`}
                  value={city.isoCode}
                >
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">
            Location Link
          </label>
          <input
            type="text"
            {...register("locationLink", {
              required: "Location Link is required",
            })}
            className={`w-full p-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition ${
              errors.locationLink ? "border-red-400" : "border-gray-200"
            }`}
            placeholder="Paste the location link from Google Maps"
          />
          {errors.locationLink && (
            <p className="text-red-500 text-sm mt-1">
              {errors.locationLink.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold shadow-md hover:from-teal-600 hover:to-cyan-600 hover:cursor-pointer transition disabled:opacity-50"
          >
            {isSubmitting ? "Posting..." : "Post Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
