import { Link } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { userAuth } from "./context/user/UserContext";
import { ngoAuth } from "./context/ngo/NgoContext";
import EventsPage from "./pages/common/EventsPage";

function Home() {
  const { user, userLoading } = userAuth();
  const { ngo, ngoLoading } = ngoAuth();
  if (userLoading || ngoLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      {user || ngo ? (
        <EventsPage />
      ) : (
        <div className="min-h-screen bg-blue-50 flex flex-col items-center pt-20 px-6 py-12 text-gray-800">
          <div className="max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">
              🌊 Waveguards
            </h1>
            <p className="text-lg md:text-xl mb-4">
              <strong>Waveguards</strong> is a smart, volunteer-centric platform
              that brings together individuals and environmental NGOs to clean
              and protect our beaches.
            </p>
            <p className="text-md md:text-lg mb-2">
              Discover clean-up events, register with a single click, track your
              participation, and join the movement to restore coastal beauty.
            </p>
            <p className="text-md md:text-lg mb-8">
              Whether you're volunteering or organizing,{" "}
              <strong>Waveguards</strong> makes it easy to connect, clean, and
              care.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/events"
                className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
              >
                🌍 Browse Events
              </Link>
              <Link
                to="/signup"
                className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
              >
                🙋‍♀️ Join a Clean-up
              </Link>
              <Link
                to="/signup"
                className="px-6 py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
              >
                🗓️ Organize a Drive
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
