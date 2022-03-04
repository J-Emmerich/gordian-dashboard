import React from "react";
import { Navigate } from "react-router-dom";
import constants from "../constants/index";

const PrivateRoute = ({ children } ) => {
  const token = localStorage.getItem(constants.ACCESS_TOKEN);
  return (
   token ? children : <Navigate to="/" />
  );
};

export default PrivateRoute;
