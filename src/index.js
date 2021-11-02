import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import DocumentPDF from "./components/invoice/pdf-page/DocumentPDF";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/topdf" exact>
          <DocumentPDF />
        </Route>

        <Route path="/">
          <App />
        </Route>
      </Switch>
    </BrowserRouter>
  </StrictMode>,
  rootElement
);
