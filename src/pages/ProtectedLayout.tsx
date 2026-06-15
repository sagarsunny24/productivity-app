import { Outlet } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router";
import { useContext } from "react";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
export default function ProtectedLayout() {
  const auth = useContext(AuthContext)
  console.log("AccessToken is ",auth?.accessToken);
  if(auth?.isLoading){
    return(
       <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "60vh",
    }}>
          <CircularProgress color="inherit" aria-label="Loading…" />
        </Box>
    )
  }
  if (auth?.accessToken) {
    return (
        <Outlet />
    );
  } else return <Navigate to="/login"/>;
}
