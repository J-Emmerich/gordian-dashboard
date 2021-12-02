import React, { useState, createContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import constants from "../constants/index";
import history from "../helpers/history";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    if (localStorage.getItem(constants.LOGGED_USER)) {
      setUser(JSON.parse(localStorage.getItem(constants.LOGGED_USER)));
    }
  }, []);
  const login = (response) => {
    localStorage.setItem(constants.ACCESS_TOKEN, response.token);
    localStorage.setItem(constants.LOGGED_USER, JSON.stringify(response.user));

    setUser(response.user);
    history.push({ pathname: "/app" });
  };

  const logout = () => {
    localStorage.removeItem(constants.ACCESS_TOKEN);
    localStorage.removeItem(constants.LOGGED_USER);
    setUser({});
    history.push({ pathname: "/" });
  };
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
