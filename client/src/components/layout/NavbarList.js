import React from "react";
import { NavLink } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import PropTypes from "prop-types";
import HelpDropdown from "./HelpDropdown";
import UserDropdown from "./UserDropdown";

const NavbarList = ({
  loggedIn,
  openUserDropdown,
  openHelpDropdown,
  closeUserDropdown,
  closeHelpDropdown,
  logout,
  toggleLoginModal,
  toggleSignupModal,
  helpDropdownOpen,
  userDropdownOpen,
  openSidebar
}) => (
  <ul className="navbar-list">
    <li className="navbar-list-item">
      <button className="btn-secondary" onClick={openSidebar}>
        Les Catégories
      </button>
    </li>
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
          className="navbar-list-item__drop-button"
          onClick={openUserDropdown}
        >
          <FaRegUser className="navbar-icon" />
        </span>
        <UserDropdown
          open={userDropdownOpen}
          close={closeUserDropdown}
          logout={logout}
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
      <span
        className="navbar-list-item__drop-button"
        onClick={openHelpDropdown}
      >
        <span className="navbar-icon">?</span>
      </span>
      <HelpDropdown open={helpDropdownOpen} close={closeHelpDropdown} />
    </li>
  </ul>
);

NavbarList.propTypes = {
  openUserDropdown: PropTypes.func.isRequired,
  closeUserDropdown: PropTypes.func.isRequired,
  openHelpDropdown: PropTypes.func.isRequired,
  closeHelpDropdown: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  helpDropdownOpen: PropTypes.bool.isRequired,
  userDropdownOpen: PropTypes.bool.isRequired
};

export default NavbarList;
