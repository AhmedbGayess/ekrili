import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CategoriesListItem = ({
  category,
  setSubCategories,
  closeSubCategories
}) => (
  <li>
    <Link
      className="mobile-sidebar__list-item"
      to={`/browse-ads/1?category=${category._id}`}
      onMouseOver={() => setSubCategories(category._id)}
      onMouseLeave={closeSubCategories}
    >
      {category.name}
    </Link>
    <span className="mobile-sidebar__list-item-plus">+</span>
  </li>
);

CategoriesListItem.propTypes = {
  category: PropTypes.object.isRequired,
  setSubCategories: PropTypes.func.isRequired
};

export default CategoriesListItem;
