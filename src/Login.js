import React, { useState, useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import history from "./helpers/history";

import PrivateRoute from "./components/PrivateRoute";
import LoginForm from "./components/LoginForm";
import App from "./App";
import DocumentPDF from "./components/invoice/pdf-page/DocumentPDF";

const Content = {
  backgroundColor: "#151414"
};

const Login = () => {
  const [isUsernameDefined, setIsUsernameDefined] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);

  const submitUser = (response) => {
    setUser(response.user);
    setToken(response.token);
    setIsUsernameDefined(!isUsernameDefined);
    history.push("/app");
  };

  return (
    <div style={Content}>
      <Router history={history}>
        <Switch>
          <PrivateRoute component={App} path="/app" user={user} token={token} />
          <Route component={DocumentPDF} path="/topdf/:id" />
          <Route path="/">
            <LoginForm submitUser={submitUser} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Login;
