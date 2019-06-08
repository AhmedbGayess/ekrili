import React from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import SignupModal from "../auth/SignupModal";
import LoginModal from "../auth/LoginModal";

class Navbar extends React.Component {
  state = {
    singupModalOpen: false,
    loginModalOpen: false
  };

  toggleSignupModal = () => {
    this.setState((prevState) => ({
      singupModalOpen: !prevState.singupModalOpen
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
      singupModalOpen: true
    });
  };

  switchToLogin = () => {
    this.setState({
      loginModalOpen: true,
      singupModalOpen: false
    });
  };

  render() {
    const homePath = this.props.history.location.pathname === "/";
    const { singupModalOpen, loginModalOpen } = this.state;
    return (
      <nav
        className={classNames("navbar", {
          "navbar-home": homePath,
          "navbar-page": !homePath
        })}
      >
        <div className="navbar-logo-container">
          <NavLink to="/">Placeholder</NavLink>
        </div>
        <ul className="navbar-list">
          <li className="navbar-list-item">
            <button className="btn-secondary" onClick={this.toggleLoginModal}>
              Connexion
            </button>
          </li>
          <li className="navbar-list-item">
            <button className="btn-secondary" onClick={this.toggleSignupModal}>
              Inscription
            </button>
          </li>
        </ul>
        <SignupModal
          modalOpen={singupModalOpen}
          toggleModal={this.toggleSignupModal}
          switchModal={this.switchToLogin}
        />
        <LoginModal
          modalOpen={loginModalOpen}
          toggleModal={this.toggleLoginModal}
          switchModal={this.switchToSignup}
        />
      </nav>
    );
  }
}

export default Navbar;
