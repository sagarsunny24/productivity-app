import { Outlet } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router";
import { useContext } from "react";

export default function ProtectedLayout() {
  const auth = useContext(AuthContext)
  console.log("AccessToken is ",auth);
  if (auth?.accessToken) {
    return (
        <Outlet />
    );
  } else return <Navigate to="/login" replace />;
}
