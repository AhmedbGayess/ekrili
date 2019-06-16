import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const PageCover = ({ open }) => (
  <div
    className={classNames("page-cover", {
      "page-cover-open": open
    })}
  />
);

PageCover.propTypes = {
  open: PropTypes.bool.isRequired
};

export default PageCover;
