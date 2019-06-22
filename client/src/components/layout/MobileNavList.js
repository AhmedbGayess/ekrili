import React from "react";
import classNames from "classnames";
import { IoIosLogIn } from "react-icons/io";
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
      openMobileSidebar,
      userDropdownOpen,
      closeUserDropdown,
      openUserDropdown,
      logout,
      mobileSubCategoriesOpen,
      mobileCategoriesOpen,
      mobileOpen,
      userImage
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
            <img
              src={userImage}
              alt="avatar"
              className="avatar"
              onClick={openUserDropdown}
            />
            <UserDropdown
              open={userDropdownOpen}
              close={closeUserDropdown}
              logout={logout}
            />
          </li>
        )}

        <li className="navbar-list-mobile__item">
          <div
            className={classNames("menu-button", {
              "menu-button-invisible":
                mobileSubCategoriesOpen || mobileCategoriesOpen || mobileOpen
            })}
            onClick={openMobileSidebar}
          >
            <div className="hamburger" />
            <div className="hamburger" />
            <div className="hamburger" />
          </div>
        </li>
      </ul>
    );
  }
}

MobileNavList.propTypes = {
  toggleLoginModal: PropTypes.func.isRequired,
  toggleSignupModal: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  openMobileSidebar: PropTypes.func.isRequired
};

export default MobileNavList;
