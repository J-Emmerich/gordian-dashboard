import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./navigation/PrivateRoute";
import Layout from "./views/dashboard/Layout";

import ForgotPasswordForm from "./views/landing/components/ForgotPasswordForm"
import ResetPasswordForm from "./views/landing/components/ResetPasswordForm"
import DocumentPDF from "./views/pdf-page/DocumentPDF";
import { UserProvider } from "./services/userContext";
import { ThemeProvider } from "styled-components"
import baseTheme from "./styles/theme";
import Landing from "./views/landing/Landing";
import RegisterForm from "./views/landing/components/RegisterForm";
import LoginForm from "./views/landing/components/LoginForm";


const App = () => {
  

  return (
    <>
      <ThemeProvider theme={baseTheme}>

        <UserProvider>
     

        <Routes>
          
          <Route element={<PrivateRoute>
            <Layout />
            </PrivateRoute>
            } path="/app/*"  />
          <Route element={<PrivateRoute>
            <DocumentPDF />
            </PrivateRoute>} path="/topdf/:id" />
          <Route path="/forgotpassword" element={<ForgotPasswordForm />}/>
          <Route path="/passwordreset/:resetToken" element={<ResetPasswordForm />}/>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/"  element={<Landing />} />
          </Routes>

          </UserProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
