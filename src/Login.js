import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./helpers/history";
import constants from "./constants/index";

import PrivateRoute from "./components/PrivateRoute";
import LoginForm from "./components/LoginForm";
import App from "./App";
import DocumentPDF from "./components/invoice/pdf-page/DocumentPDF";

const Login = () => {
  const submitUser = (response) => {
    localStorage.setItem(constants.ACCESS_TOKEN, response.token);
    history.push("/app");
  };

  return (
    <div>
      <Router history={history}>
        <Switch>
          <PrivateRoute component={App} path="/app" />
          <PrivateRoute component={DocumentPDF} path="/topdf/:id" />
          <Route path="/">
            <LoginForm submitUser={submitUser} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Login;
