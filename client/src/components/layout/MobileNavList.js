import React from "react";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import classNames from "classnames";
import PropTypes from "prop-types";
import MobileUserDropdown from "./MobileUserDropdown";
import UserDropdown from "./UserDropdown";

class MobileNavList extends React.Component {
  state = {
    authDropdownOpen: false
  };

  closeAuthDropdown = () => {
    this.setState({
      authDropdownOpen: false
    });
  };

  openAuthDropdown = () => {
    this.setState({
      authDropdownOpen: true
    });
  };

  render() {
    const {
      loggedIn,
      toggleLoginModal,
      toggleSignupModal,
      toggleMobileNav,
      userDropdownOpen,
      closeUserDropdown,
      openUserDropdown,
      logout,
      mobileNavOpen
    } = this.props;
    return (
      <ul className="navbar-list-mobile">
        {!loggedIn && (
          <li
            className="navbar-list-mobile__item"
            onClick={this.openAuthDropdown}
          >
            <IoIosLogIn className="navbar-list-mobile__item-login" />
            <MobileUserDropdown
              open={this.state.authDropdownOpen}
              close={this.closeAuthDropdown}
              toggleLoginModal={toggleLoginModal}
              toggleSignupModal={toggleSignupModal}
            />
          </li>
        )}
        {loggedIn && (
          <li className="navbar-list-mobile__item">
            <span
              className="navbar-list-mobile__item-container"
              onClick={openUserDropdown}
            >
              <FaRegUser className="navbar-list-mobile__item-icon" />
            </span>
            <UserDropdown
              open={userDropdownOpen}
              close={closeUserDropdown}
              logout={logout}
            />
          </li>
        )}
        <li className="navbar-list-mobile__item">
          <div className="menu-button" onClick={toggleMobileNav}>
            <div
              className={classNames("hamburger", {
                "hamburger-1": mobileNavOpen
              })}
            />
            <div
              className={classNames("hamburger", {
                "hamburger-2": mobileNavOpen
              })}
            />
            <div
              className={classNames("hamburger", {
                "hamburger-3": mobileNavOpen
              })}
            />
          </div>
        </li>
      </ul>
    );
  }
}

MobileNavList.propTypes = {
  toggleMobileNav: PropTypes.func.isRequired,
  toggleLoginModal: PropTypes.func.isRequired,
  toggleSignupModal: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  mobileNavOpen: PropTypes.bool.isRequired
};

export default MobileNavList;