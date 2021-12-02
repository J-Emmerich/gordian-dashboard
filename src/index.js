import { StrictMode } from "react";
import ReactDOM from "react-dom";
import Login from "./Login";
import { UserProvider } from "./services/userContext";

import "typeface-roboto";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <UserProvider>
      <Login />
    </UserProvider>
  </StrictMode>,
  rootElement
);
