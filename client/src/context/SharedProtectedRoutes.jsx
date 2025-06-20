import { Navigate } from 'react-router-dom';
import { ngoAuth } from './ngo/NgoContext';
import { userAuth } from './user/UserContext';

const SharedProtectedRoutes = ({ children }) => {
  const { user, userLoading } = userAuth();
  const { ngo, ngoLoading } = ngoAuth();
  if(userLoading || ngoLoading) return null
  if(!user && !ngo) return <Navigate to="/login"/>
  return children
};
export default SharedProtectedRoutes;
