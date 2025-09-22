import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export default function PublicRoute() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return isLoggedIn ?  <Navigate to="/menulogin" replace />: <Outlet />;
}