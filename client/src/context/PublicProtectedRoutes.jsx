import { Navigate } from "react-router-dom"
import { userAuth } from "./user/UserContext"
import { ngoAuth } from "./ngo/NgoContext"

const PublicProtectedRoutes = ({children}) => {
  const {user, userLoading} = userAuth()
  const {ngo, ngoLoading} = ngoAuth()
  if(userLoading || ngoLoading) return <div>Loading...</div>
  if(user || ngo) return <Navigate to="/"/>
  return children
}

export default PublicProtectedRoutes