import React from "react";
import PropTypes from "prop-types";

const CategoryCard = ({ category }) => (
  <div className="category-card">
    <img
      src={`/images/${category.image}`}
      alt={category.name}
      className="category-card-image"
    />
    <span className="category-card-name">{category.name}</span>
  </div>
);

CategoryCard.propTypes = {
  category: PropTypes.shape({}).isRequired
};

export default CategoryCard;
