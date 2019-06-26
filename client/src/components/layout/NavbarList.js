import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import HelpDropdown from "./HelpDropdown";
import UserDropdown from "./UserDropdown";
import questionMark from "../../images/question-mark.png";

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
  openSidebar,
  userImage
}) => (
  <ul className="navbar-list">
    <li className="navbar-list-item">
      <button className="btn-secondary" onClick={openSidebar}>
        Les Annonces
      </button>
    </li>
    {loggedIn && (
      <li className="navbar-list-item">
        <NavLink className="btn-primary" to="/create-ad">
          Ajouter une annonce
        </NavLink>
      </li>
    )}
    {loggedIn && (
      <li className="navbar-list-item">
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
      <img
        src={questionMark}
        alt="point d'interrogation"
        className="avatar"
        onClick={openHelpDropdown}
      />
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
