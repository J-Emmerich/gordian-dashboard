import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import "typeface-roboto";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
   <CssBaseline />
   <BrowserRouter>
      <App />
   </BrowserRouter>
   
  </StrictMode>,
  rootElement
);
