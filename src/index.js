import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import DocumentPDF from "./components/invoice/pdf-page/DocumentPDF";
import App from "./App";
import "typeface-roboto";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/topdf/:id" component={DocumentPDF} />

        <Route path="/">
          <App />
        </Route>
      </Switch>
    </BrowserRouter>
  </StrictMode>,
  rootElement
);
