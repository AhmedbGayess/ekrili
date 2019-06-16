import React from "react";
import { FaRegUser } from "react-icons/fa";
import PropTypes from "prop-types";

const MobileNavList = ({ toggleMobileNav }) => (
  <ul className="navbar-list-mobile">
    <li className="navbar-list-mobile__item">
      <span className="navbar-list-mobile__item-container">
        <FaRegUser className="navbar-list-mobile__item-icon" />
      </span>
    </li>
    <li className="navbar-list-mobile__item">
      <div className="menu-button" onClick={toggleMobileNav}>
        <div className="hamburger" />
        <div className="hamburger" />
        <div className="hamburger" />
      </div>
    </li>
  </ul>
);

MobileNavList.propTypes = {
  toggleMobileNav: PropTypes.func.isRequired
};

export default MobileNavList;
