import type { Credential } from "../types/index";
import { useState, useEffect, useRef } from "react";
import { AuthContext } from "./AuthContext";
import { AxiosError } from "axios";
import { api } from "../axios/api";
import { setUpInterceptors } from "../axios/interceptors";
interface ComponentProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: ComponentProps) {
  // const AuthContext = createContext<AuthState |null>(null)
  const [accessToken, setAccessToken] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(true);
  const [searchQuery,setSearchQuery] = useState<string>("")
  const accessTokenRef = useRef<string>("");
  function setAccessTokenSafe(token: string) {
    accessTokenRef.current = token;
    console.log("inside useRef", token);
    setAccessToken(token);
  }

  // this is also not working
  async function login({
    username,
    password,
  }: Credential): Promise<number | true> {
    try {
      const res = await api.post(
        "/auth",
        {
          user: username,
          pwd: password,
        },
        { withCredentials: true },
      );

      setAccessTokenSafe(res.data.accessToken);
      return true;
    } catch (error) {
      const err = error as AxiosError;
      return err?.response?.status ?? 500;
    }
  }
  async function logout() {
    setAccessTokenSafe("");
    localStorage.removeItem("rtoken");
  }

  async function register({
    username,
    password,
  }: Credential): Promise<number | true> {
    try {
      await api.post("/register", { user: username, pwd: password });
      return true;
    } catch (error) {
      const err = error as AxiosError;
      return err?.response?.status ?? 500;
    }
  }

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await api.get("/refresh", { withCredentials: true });
        setAccessTokenSafe(res.data.accessToken);
      } catch {
        setAccessTokenSafe("");
      } finally {
        setLoading(false);
      }
    };
    restoreSession();
    setUpInterceptors(() => accessTokenRef.current, setAccessTokenSafe);
  }, []);
  return (
    <AuthContext.Provider
      value={{ accessToken, isLoading, login, logout, register,setSearchQuery,searchQuery }}
    >
      {children}
    </AuthContext.Provider>
  );
}
