import React, { useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./helpers/history";
import PrivateRoute from "./navigation/PrivateRoute";
import Dashboard from "./views/dashboard/Dashboard";
import LoginForm from "./views/landing/LoginForm"
import ForgotPasswordForm from "./views/landing/ForgotPasswordForm"
import ResetPasswordForm from "./views/landing/ResetPasswordForm"
import DocumentPDF from "./views/pdf-page/DocumentPDF";
import { UserProvider } from "./services/userContext";
const App = () => {
  const [user, setUser] = useState();

  return (
    <div>
        <UserProvider>
      <Router history={history}>
        <Switch>
          <PrivateRoute component={Dashboard} path="/app" user={user} />
          <PrivateRoute component={DocumentPDF} path="/topdf/:id" user={user} />
          <Route path="/forgotpassword" component={ForgotPasswordForm}/>
          <Route path="/passwordreset/:resetToken" component={ResetPasswordForm}/>
          <Route path="/">
            <LoginForm />
          </Route>
        </Switch>
      </Router>
          </UserProvider>
    </div>
  );
};

export default App;
