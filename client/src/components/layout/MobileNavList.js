import React from "react";
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
      userImage
    } = this.props;
    return (
      <ul className="navbar-list-mobile">
        {loggedIn && (
          <li className="navbar-list-mobile__item">
            <img
              src={userImage}
              alt="avatar"
              className="avatar navbar-list-mobile__item__avatar"
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
          <button className="bt-menu" onClick={openMobileSidebar}>
            <span className="hamburguer">
              <span className="bar bar-1" />
              <span className="bar bar-2" />
              <span className="bar bar-3" />
            </span>
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
