import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

interface RoleBasedRouteProps {
  allowedRoles: string[];
  redirectTo?: string;
}

export default function RoleBasedRoute({ 
  allowedRoles, 
  redirectTo = "/login" 
}: RoleBasedRouteProps) {
  const { isLoggedIn, user } = useAuthStore();
  
  const hasRequiredRole = isLoggedIn && 
    user && 
    allowedRoles.includes(user.role.name);
    
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  if (!hasRequiredRole) {
    if (user?.role.name === 'Pelanggan') {
      return <Navigate to="/menulogin" replace />;
    } else if (user?.role.name === 'Kasir') {
      return <Navigate to="/kasir/pesanan" replace />;
    } else if (user?.role.name === 'Owner') {
      return <Navigate to="/owner/dashboard" replace />;
    } else {
      return <Navigate to={redirectTo} replace />;
    }
  }
  
  return <Outlet />;
}