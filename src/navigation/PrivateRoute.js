import React from "react";
import { Route, Redirect } from "react-router-dom";
import constants from "../constants/index";

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const token = localStorage.getItem(constants.ACCESS_TOKEN);
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} token={token} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
