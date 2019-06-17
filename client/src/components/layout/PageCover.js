import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const PageCover = ({ open, mobileOpen }) => (
  <div
    className={classNames("page-cover", {
      "page-cover-open": open || mobileOpen
    })}
  />
);

PageCover.propTypes = {
  open: PropTypes.bool.isRequired,
  mobileOpen: PropTypes.bool.isRequired
};

export default PageCover;
