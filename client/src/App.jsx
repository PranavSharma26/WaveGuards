import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import PageNotFound from "./pages/PageNotFound"
import Signup from "./pages/auth/Signup"
import Login from "./pages/auth/Login"
import { Toaster } from "react-hot-toast"
import VerifyEmail from "./pages/auth/VerifyEmail"

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false}/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/verify-email" element={<VerifyEmail/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </>
  )
}

export default App
