import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import classNames from "classnames";
import Proptypes from "prop-types";
import SignupModal from "../auth/SignupModal";
import LoginModal from "../auth/LoginModal";
import { FaUser } from "react-icons/fa";
import UserDropdown from "./UserDropdown";
import { logout } from "../../store/actions/auth";

class Navbar extends React.Component {
  state = {
    singupModalOpen: false,
    loginModalOpen: false,
    userDropdownOpen: false
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

  closeUserDropdown = () => {
    this.setState({
      userDropdownOpen: false
    });
  };

  openUserDropdown = () => {
    this.setState({
      userDropdownOpen: true
    });
  };

  logout = () => {
    this.props.logout();
    this.closeUserDropdown();
  };

  render() {
    const homePath = this.props.history.location.pathname === "/";
    const { singupModalOpen, loginModalOpen, userDropdownOpen } = this.state;
    const loggedIn = Object.keys(this.props.user).length > 0;
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
            <NavLink className="btn-primary" to="/">
              Créer un annonce
            </NavLink>
          </li>
          {loggedIn && (
            <li className="navbar-list-item">
              <span
                className="navbar-list-item__user"
                onClick={this.openUserDropdown}
              >
                <FaUser className="navbar-user" />
              </span>
              <UserDropdown
                open={userDropdownOpen}
                close={this.closeUserDropdown}
                logout={this.logout}
              />
            </li>
          )}
          {!loggedIn && (
            <li className="navbar-list-item">
              <button className="btn-secondary" onClick={this.toggleLoginModal}>
                Connexion
              </button>
            </li>
          )}
          {!loggedIn && (
            <li className="navbar-list-item">
              <button
                className="btn-secondary"
                onClick={this.toggleSignupModal}
              >
                Inscription
              </button>
            </li>
          )}
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

Navbar.propTypes = {
  user: Proptypes.shape({}).isRequired,
  logout: Proptypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
