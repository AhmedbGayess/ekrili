import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const AdPath = ({ category, subCategory, categories, subCategories }) => {
  const categoryName = categories.find((cat) => cat._id === category).name;
  const subCategoryName = subCategories.find((sub) => sub._id === subCategory)
    .name;
  return (
    <div className="ad-path">
      <Link className="ad-path__link" to="/browse-ads/1">
        Annonces
      </Link>{" "}
      >{" "}
      <Link className="ad-path__link" to={`/browse-ads/1?category=${category}`}>
        {categoryName}
      </Link>{" "}
      >{" "}
      <Link
        className="ad-path__link"
        to={`/browse-ads/1?subCategory=${subCategory}`}
      >
        {subCategoryName}
      </Link>
    </div>
  );
};

AdPath.propTypes = {
  category: PropTypes.string.isRequired,
  subCategory: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  subCategories: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
  subCategories: state.subCategories.subCategories
});

export default connect(mapStateToProps)(AdPath);
