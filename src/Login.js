import React, { useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./helpers/history";
import constants from "./constants/index";

import PrivateRoute from "./components/PrivateRoute";
import LoginForm from "./components/LoginForm";
import App from "./App";
import DocumentPDF from "./components/invoice/pdf-page/DocumentPDF";
import { UserProvider } from "./services/userContext";
const Login = () => {
  const [user, setUser] = useState();

  // const submitUser = (response) => {
  //   localStorage.setItem(constants.ACCESS_TOKEN, response.token);
  //   setUser(response.user);
  //   history.push({ pathname: "/app", state: response.user });
  // };

  return (
    <div>
        <UserProvider>
      <Router history={history}>
        <Switch>
          <PrivateRoute component={App} path="/app" user={user} />
          <PrivateRoute component={DocumentPDF} path="/topdf/:id" user={user} />
          <Route path="/">
            <LoginForm />
          </Route>
        </Switch>
      </Router>
          </UserProvider>
    </div>
  );
};

export default Login;
