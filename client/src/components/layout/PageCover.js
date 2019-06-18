import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { IoIosClose } from "react-icons/io";

const PageCover = ({ open, mobileOpen, categoriesOpen, subCategoriesOpen }) => (
  <div
    className={classNames("page-cover", {
      "page-cover-open":
        open || mobileOpen || categoriesOpen || subCategoriesOpen
    })}
  >
    {(mobileOpen || categoriesOpen || subCategoriesOpen) && (
      <span className="page-cover__close">
        <IoIosClose />
      </span>
    )}
  </div>
);

PageCover.propTypes = {
  open: PropTypes.bool.isRequired,
  mobileOpen: PropTypes.bool.isRequired
};

export default PageCover;
