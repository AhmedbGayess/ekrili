import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const MobileCategory = ({
  category,
  close,
  setSubCategories,
  openMobileSubCategories
}) => {
  const toggleSubCategories = () => {
    setSubCategories(category._id);
    openMobileSubCategories();
  };
  return (
    <li>
      <span className="mobile-sidebar__link mobile-sidebar__link-category">
        <Link to={`/browse-ads/1?category=${category._id}`} onClick={close}>
          {category.name}
        </Link>
        <span
          onClick={toggleSubCategories}
          className="mobile-sidebar__link mobile-sidebar__link-category-plus"
        >
          +
        </span>
      </span>
    </li>
  );
};

MobileCategory.propTypes = {
  category: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  setSubCategories: PropTypes.func.isRequired,
  openMobileSubCategories: PropTypes.func.isRequired
};

export default MobileCategory;
