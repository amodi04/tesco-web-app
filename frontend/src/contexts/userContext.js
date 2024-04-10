import { React, createContext, useState, useContext, useCallback, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { setAxiosAuthToken, toastOnError, isEmpty } from "../utils/utils";
import { useNavigate } from "react-router-dom";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");

  const nav = useNavigate();

  useEffect(() => {
    if (!isEmpty(localStorage.getItem("user"))) {
      setCurrentUser(JSON.parse(localStorage.getItem("user")), "");
    }
    if (!isEmpty(localStorage.getItem("token"))) {
      setTokenAndAuthenticated(localStorage.getItem("token"));
    }
  }, []);

  const unsetCurrentUser = useCallback(() => {
    setAxiosAuthToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken("");
    setIsAuthenticated(false);
  }, []);

  const setCurrentUser = useCallback(
    (user, redirectTo) => {
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      if (redirectTo !== "") {
        nav(redirectTo);
      }
    },
    [nav]
  );

  const setTokenAndAuthenticated = useCallback((token) => {
    setAxiosAuthToken(token);
    localStorage.setItem("token", token);
    setToken(token);
    setIsAuthenticated(true);
  }, []);

  const getCurrentUser = useCallback(
    async (redirectTo) => {
      try {
        const res = await axios.get("/api/v1/users/me/");
        const user = {
          username: res.data.username,
          email: res.data.email,
        };
        setCurrentUser(user, redirectTo);
      } catch (err) {
        unsetCurrentUser();
        toastOnError(err);
      }
    },
    [unsetCurrentUser, setCurrentUser]
  );

  const register = useCallback(
    async (userData) => {
      try {
        const res = await axios.post("/api/v1/users/", userData);
        if (res.status === 201) {
          return true;
        }
      } catch (err) {
        unsetCurrentUser();
        toastOnError(err);
        return err;
      }
    },
    [unsetCurrentUser]
  );

  const login = useCallback(
    async (userData, redirectTo) => {
      try {
        const res = await axios.post("/api/v1/token/login/", userData);
        const { auth_token } = res.data;
        setTokenAndAuthenticated(auth_token);
        await getCurrentUser(redirectTo);
      } catch (err) {
        unsetCurrentUser();
        toastOnError(err);
        return err;
      }
    },
    [getCurrentUser, unsetCurrentUser, setTokenAndAuthenticated]
  );

  const logout = useCallback(async () => {
    try {
      axios.post("/api/v1/token/logout/");
      unsetCurrentUser();
      nav("/");
      toast.success("Logout successful.");
    } catch (err) {
      unsetCurrentUser();
      toastOnError(err);
      return err;
    }
  }, [unsetCurrentUser, nav]);

  return (
    <UserContext.Provider
      value={{ register, login, logout, user, isAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
