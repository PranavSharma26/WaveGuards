import { Navigate } from 'react-router-dom';
import { ngoAuth } from './NgoContext.jsx'

const NgoProtectedRoutes = ({ children }) => {
  const { ngo, ngoLoading } = ngoAuth();
  if(ngoLoading) return null
  if(ngo.role!=="ngo") return <Navigate to="/login"/>
  return children
};
export default NgoProtectedRoutes;
