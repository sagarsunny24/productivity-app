import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Dialog,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Bounce, toast } from "react-toastify";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
// import useAuth from "../hooks/useAuth";
// import { type Credential } from "../types";
// import { Link as RouterLink, useNavigate} from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("AuthContext not found");
  }
  const {register,login:onLogin} = auth
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
  const [resStatus, setResStatus] = useState<boolean | number>(false);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    // navigate('/');
    if (isRegister) {
      const response = await register({ username, password });
      console.log(response);
      setResStatus(response);
      // console.log(isSuccess);
      if (response === true) {
        toast.success("Registration successful", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setPassword("");
        setUserName("");
        setPasswordMatch(true);
        setIsRegister(!isRegister);
        setResStatus(false);
      } else if (response === 500) {
        toast.error("Connection failed!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } else {
      const logResponse = await onLogin({ username, password });
      console.log(logResponse);
      setResStatus(logResponse);
      if (logResponse === true) {
        toast.success("Login successful", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        navigate("/dashboard");
      } else if (logResponse === 500) {
        toast.error("Connection failed!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  }
  return (
    <Dialog open={true}>
      <Paper sx={{ padding: 5, maxWidth: "450px", maxHeight: "500px" }}>
        <Avatar
          sx={{
            mx: "auto",
            bgcolor: "primary.main",
            textAlign: "center",
            mb: 1,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          {isRegister ? "Register User" : "Sign In"}
        </Typography>
        <Box component={"form"} onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            slotProps={{ inputLabel: { shrink: true } }}
            placeholder={"Enter your email"}
            fullWidth
            error={resStatus == 409 || resStatus == 404}
            helperText={
              resStatus === 409
                ? "Email already exists! Sign In instead"
                : resStatus === 404
                  ? "User does not exist"
                  : ""
            }
            label="Email"
            type="email"
            required
            autoFocus
            sx={{ mb: 2 }}
            value={username}
            onChange={(e) => {
              setResStatus(false);
              setUserName(e.target.value);
            }}
          />
          <TextField
            slotProps={{ inputLabel: { shrink: true } }}
            label="Password"
            placeholder={isRegister ? "Create password" : "Enter password"}
            fullWidth
            required
            error={resStatus == 401}
            helperText={resStatus === 401 ? "Wrong Password" : ""}
            sx={{ mb: 2 }}
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {isRegister ? (
            <TextField
              slotProps={{ inputLabel: { shrink: true } }}
              label="Confirm password"
              placeholder="Enter password again"
              fullWidth
              required
              sx={{ mb: 2 }}
              type="password"
              error={!passwordMatch}
              helperText={!passwordMatch ? "Passwords do not match" : ""}
              onChange={(e) => {
                setPasswordMatch(e.target.value == password);
              }}
            />
          ) : null}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
            {isRegister ? "Register" : "Sign In"}
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 2,
            mt: 1,
          }}
        >
          <Typography>Don't have an account?</Typography>

          <Button variant="outlined" onClick={() => setIsRegister(!isRegister)}>
            {!isRegister ? "Sign Up" : "Sign in"}
          </Button>
        </Box>
      </Paper>
    </Dialog>
  );
}
