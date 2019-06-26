import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
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
      openMobileSidebar,
      userDropdownOpen,
      closeUserDropdown,
      openUserDropdown,
      logout,
      mobileSubCategoriesOpen,
      mobileCategoriesOpen,
      mobileOpen
    } = this.props;
    return (
      <ul className="navbar-list-mobile">
        {loggedIn && (
          <li className="navbar-list-mobile__item">
            <button onClick={openUserDropdown} className="btn-secondary">
              Profil
            </button>
            <UserDropdown
              open={userDropdownOpen}
              close={closeUserDropdown}
              logout={logout}
            />
          </li>
        )}

        <li
          className={classNames("navbar-list-mobile__item", {
            "navbar-list-mobile__item-invisible":
              mobileSubCategoriesOpen || mobileCategoriesOpen || mobileOpen
          })}
        >
          <button className="btn-secondary" onClick={openMobileSidebar}>
            Menu
          </button>
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
