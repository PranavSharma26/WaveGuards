import { Navigate } from 'react-router-dom';
import { userAuth } from './UserContext.jsx'

const UserProtectedRoutes = ({ children }) => {
  const { user, userLoading } = userAuth();
  if(userLoading) return null
  if(user.role!=="user") return <Navigate to="/login"/>
  return children
};
export default UserProtectedRoutes;