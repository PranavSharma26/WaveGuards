import { Navbar } from "./components/Navbar";
import { userAuth } from "./context/user/UserContext";

function Home() {
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
    </>
  );
}

export default Home;
