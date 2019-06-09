import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "../components/home/Home";
import AdminLogin from "../components/auth/AdminLogin";
import AdminRouter from "./AdminRouter";
import Navbar from "../components/layout/Navbar";
import CreateAd from "../components/ad/CreateAd";

export const history = createBrowserHistory();

class AppRouter extends React.Component {
  state = {
    signupModalOpen: false,
    loginModalOpen: false
  };

  toggleSignupModal = () => {
    this.setState((prevState) => ({
      signupModalOpen: !prevState.signupModalOpen
    }));
  };

  toggleLoginModal = () => {
    this.setState((prevState) => ({
      loginModalOpen: !prevState.loginModalOpen
    }));
  };

  switchToSignup = () => {
    this.setState({
      loginModalOpen: false,
      signupModalOpen: true
    });
  };

  switchToLogin = () => {
    this.setState({
      loginModalOpen: true,
      signupModalOpen: false
    });
  };

  render() {
    const { loginModalOpen, signupModalOpen } = this.state;
    return (
      <Router history={history}>
        <Route
          path={["/", "/create-ad"]}
          render={() => (
            <Navbar
              loginModalOpen={loginModalOpen}
              signupModalOpen={signupModalOpen}
              toggleLoginModal={this.toggleLoginModal}
              toggleSignupModal={this.toggleSignupModal}
              switchToSignup={this.switchToSignup}
              switchToLogin={this.switchToLogin}
            />
          )}
          exact
        />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/create-ad" component={CreateAd} exact />
          <Route path="/admin-login" component={AdminLogin} exact />
          <Route path="/admin" component={AdminRouter} />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
