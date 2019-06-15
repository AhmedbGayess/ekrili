import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "../components/home/Home";
import AdminLogin from "../components/auth/AdminLogin";
import PrivateRoute from "./PrivateRoute";
import AdminRouter from "./AdminRouter";
import Navbar from "../components/layout/Navbar";
import CreateAd from "../components/create-ad/CreateAd";
import AdsPage from "../components/ads/AdsPage";
import MobileSideBar from "../components/layout/MobileSideBar";

export const history = createBrowserHistory();

class AppRouter extends React.Component {
  state = {
    signupModalOpen: false,
    loginModalOpen: false,
    mobileNavOpen: false
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

  openMobileNav = () => {
    this.setState({ mobileNavOpen: true });
  };

  closeMobileNav = () => {
    this.setState({ mobileNavOpen: false });
  };

  render() {
    const { loginModalOpen, signupModalOpen, mobileNavOpen } = this.state;
    return (
      <Router history={history}>
        <Route
          path={["/", "/create-ad", "/browse-ads/:page"]}
          render={() => (
            <Navbar
              loginModalOpen={loginModalOpen}
              signupModalOpen={signupModalOpen}
              toggleLoginModal={this.toggleLoginModal}
              toggleSignupModal={this.toggleSignupModal}
              switchToSignup={this.switchToSignup}
              switchToLogin={this.switchToLogin}
              location={history.location.pathname}
              toggleMobileNav={this.openMobileNav}
              mobileNavOpen={mobileNavOpen}
            />
          )}
          exact
        />
        <MobileSideBar open={mobileNavOpen} close={this.closeMobileNav} />
        <Switch>
          <Route
            path="/"
            render={() => <Home toggleSignupModal={this.toggleSignupModal} />}
            exact
          />
          <PrivateRoute path="/create-ad" component={CreateAd} exact />
          <Route path="/browse-ads/:page" component={AdsPage} exact />
          <Route path="/admin-login" component={AdminLogin} exact />
          <Route path="/admin" component={AdminRouter} />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
