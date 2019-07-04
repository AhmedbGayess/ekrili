import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CategoryCard from "../categories/CategoryCard";

const HomeCategories = ({ categories }) => {
  const categoriesCards = categories.map((category) => (
    <Link
      key={category._id}
      to={`/browse-ads/1?category=${category._id}`}
      className="home-categories__list__item"
    >
      <CategoryCard category={category} />
    </Link>
  ));
  return (
    <div className="home-categories">
      <div className="container">
        <h1 className="home-categories__title">De quoi avez vous besoin?</h1>
        <div className="home-categories__list">{categoriesCards}</div>
      </div>
    </div>
  );
};

HomeCategories.propTypes = {
  categories: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  categories: state.categories.categories
});

export default connect(mapStateToProps)(HomeCategories);
