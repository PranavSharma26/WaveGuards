import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import PageNotFound from "./pages/PageNotFound"
import Signup from "./pages/auth/Signup"
import Login from "./pages/auth/Login"
import { Toaster } from "react-hot-toast"
import VerifyEmail from "./pages/auth/VerifyEmail"
import Account from "./pages/Account"
import Settings from "./pages/Settings"
import ForgotPassword from "./pages/auth/ForgotPassword"
import ChangePassword from "./pages/auth/ChangePassword"
import UserProtectedRoutes from './context/user/UserProtectedRoutes'
import EventsPage from './pages/common/EventsPage'
import PublicProtectedRoutes from "./context/PublicProtectedRoutes"
import SharedProtectedRoutes from "./context/SharedProtectedRoutes"

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false}/>
      <Routes>
        <Route path="/" element={<Home/>} />
        
        // AUTH
        <Route path="/signup" element={<PublicProtectedRoutes><Signup/></PublicProtectedRoutes>} />
        <Route path="/verify-email" element={<PublicProtectedRoutes><VerifyEmail/></PublicProtectedRoutes>} />
        <Route path="/login" element={<PublicProtectedRoutes><Login/></PublicProtectedRoutes>} />
        <Route path="/forgot-password" element={<PublicProtectedRoutes><ForgotPassword/></PublicProtectedRoutes>}/>
        <Route path="/change-password" element={<ChangePassword/>}/>
        
        // COMMON
        <Route path="/account/:role" element={<SharedProtectedRoutes> <Account/> </SharedProtectedRoutes>} />
        <Route path="/settings/:role" element={<SharedProtectedRoutes> <Settings/> </SharedProtectedRoutes>} />
        <Route path="/events" element={<EventsPage/>} />

        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </>
  )
}

export default App
