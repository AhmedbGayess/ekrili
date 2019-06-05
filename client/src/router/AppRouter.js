import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "../components/home/Home";
import AdminLogin from "../components/auth/AdminLogin";
import AdminRouter from "./AdminRouter";

export const history = createBrowserHistory();

class AppRouter extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/admin-login" component={AdminLogin} exact />
          <Route path="/admin" component={AdminRouter} />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
