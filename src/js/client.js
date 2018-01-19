import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Todos  from "./pages/Todos";
import Layout from "./pages/Layout";

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Todos}></IndexRoute>
      <Route path="*" component={Todos} />
    </Route>
  </Router>,
  document.getElementById('app'));
