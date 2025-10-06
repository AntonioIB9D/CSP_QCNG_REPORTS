import { Navigate, Outlet } from "react-router-dom";
import { useBoundStore } from "../Store/BoundStore/BoundStore";

export default function PrivateRoute() {
  //  validar si hacer la verificación del rol del usuario en la BD
  const userData = useBoundStore((state) => state.userData);

  if (!userData) return <Navigate to="/" />; // Si no hay usuario, redirige al login

  return <Outlet />;
}
