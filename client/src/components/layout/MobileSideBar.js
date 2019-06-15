import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

const MobileSideBar = ({ open }) => (
  <nav
    className={classNames("mobile-sidebar", {
      "mobile-sidebar__open": open
    })}
  >
    <Link to="/">Hi</Link>
    <Link to="/">Hi</Link>
    <Link to="/">Hi</Link>
    <Link to="/">Hi</Link>
  </nav>
);

export default MobileSideBar;
