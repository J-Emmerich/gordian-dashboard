import { StrictMode } from "react";
import ReactDOM from "react-dom";
import Login from "./Login";
import "typeface-roboto";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
      <Login />
  </StrictMode>,
  rootElement
);
