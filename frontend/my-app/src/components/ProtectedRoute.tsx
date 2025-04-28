import { Navigate, Outlet } from 'react-router-dom';
import { useauth } from '../context/auth/authcontext';

const ProtectedRoute = () => {
  const Auth = useauth();

  if (!Auth?.token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute; 