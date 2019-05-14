import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import "./index.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Votacao from "./componentes/Votacao.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={App} />
      <Route path="/votacao" component={Votacao} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
