import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import PageNotFound from "./pages/PageNotFound"
import Signup from "./pages/auth/Signup"
import Login from "./pages/auth/Login"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false}/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </>
  )
}

export default App
