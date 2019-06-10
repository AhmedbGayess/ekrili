import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import classNames from "classnames";
import Proptypes from "prop-types";
import SignupModal from "../auth/SignupModal";
import LoginModal from "../auth/LoginModal";
import { FaRegUser } from "react-icons/fa";
import UserDropdown from "./UserDropdown";
import { logout } from "../../store/actions/auth";
import HelpDropdown from "./HelpDropdown";

class Navbar extends React.Component {
  state = {
    userDropdownOpen: false,
    helpDropdownOpen: false
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

  closeHelpDropdown = () => {
    this.setState({
      helpDropdownOpen: false
    });
  };

  openHelpDropdown = () => {
    this.setState({
      helpDropdownOpen: true
    });
  };

  logout = () => {
    this.props.logout();
    this.closeUserDropdown();
  };

  render() {
    const homePath = this.props.location === "/";
    const { userDropdownOpen, helpDropdownOpen } = this.state;

    const {
      loginModalOpen,
      signupModalOpen,
      toggleLoginModal,
      toggleSignupModal,
      switchToSignup,
      switchToLogin
    } = this.props;
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
          {loggedIn && (
            <li className="navbar-list-item">
              <NavLink className="btn-primary" to="/create-ad">
                Créer un annonce
              </NavLink>
            </li>
          )}
          {loggedIn && (
            <li className="navbar-list-item">
              <span
                className="navbar-list-item__user"
                onClick={this.openUserDropdown}
              >
                <FaRegUser className="navbar-user" />
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
              <button className="btn-secondary" onClick={toggleLoginModal}>
                Connexion
              </button>
            </li>
          )}
          {!loggedIn && (
            <li className="navbar-list-item">
              <button className="btn-secondary" onClick={toggleSignupModal}>
                Inscription
              </button>
            </li>
          )}
          <li className="navbar-list-item">
            <button
              className="navbar-list-item__question"
              onClick={this.openHelpDropdown}
            >
              ?
            </button>
            <HelpDropdown
              open={helpDropdownOpen}
              close={this.closeHelpDropdown}
            />
          </li>
        </ul>
        <SignupModal
          modalOpen={signupModalOpen}
          toggleModal={toggleSignupModal}
          switchModal={switchToLogin}
        />
        <LoginModal
          modalOpen={loginModalOpen}
          toggleModal={toggleLoginModal}
          switchModal={switchToSignup}
        />
      </nav>
    );
  }
}

Navbar.propTypes = {
  user: Proptypes.shape({}).isRequired,
  logout: Proptypes.func.isRequired,
  loginModalOpen: Proptypes.bool.isRequired,
  signupModalOpen: Proptypes.bool.isRequired,
  toggleLoginModal: Proptypes.func.isRequired,
  toggleSignupModal: Proptypes.func.isRequired,
  switchToSignup: Proptypes.func.isRequired,
  switchToLogin: Proptypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
