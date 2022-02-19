import React, { useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./helpers/history";
import PrivateRoute from "./navigation/PrivateRoute";
import Dashboard from "./views/dashboard/Dashboard";

import ForgotPasswordForm from "./views/landing/ForgotPasswordForm"
import ResetPasswordForm from "./views/landing/ResetPasswordForm"
import DocumentPDF from "./views/pdf-page/DocumentPDF";
import { UserProvider } from "./services/userContext";
import { ThemeProvider } from "styled-components"
import baseTheme from "./styles/theme";
import Landing from "./views/landing/Landing";
const App = () => {
  const [user, setUser] = useState();

  return (
    <div>
      <ThemeProvider theme={baseTheme}>

        <UserProvider>
      <Router history={history}>
        <Switch>
          <PrivateRoute component={Dashboard} path="/app" user={user} />
          <PrivateRoute component={DocumentPDF} path="/topdf/:id" user={user} />
          <Route path="/forgotpassword" component={ForgotPasswordForm}/>
          <Route path="/passwordreset/:resetToken" component={ResetPasswordForm}/>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </Router>
          </UserProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
