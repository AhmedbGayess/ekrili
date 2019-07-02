import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getSubCategories } from "../../store/actions/subCategories";
import CategoryCard from "../categories/CategoryCard";

const AdminSubCategories = ({ subCategories }) => {
  const content = subCategories.map((subCategory) => (
    <Link
      to={`/admin/edit-subcategory/${subCategory._id}`}
      key={subCategory._id}
    >
      <CategoryCard category={subCategory} />
    </Link>
  ));

  return (
    <div className="container">
      <h1 className="my-2 text-center">LES SOUS-CATÉGORIES</h1>
      <div className="admin-categories my-4">{content}</div>
    </div>
  );
};

AdminSubCategories.propTypes = {
  subCategories: PropTypes.array.isRequired
};

const mapStatToProps = (state) => ({
  subCategories: state.subCategories.subCategories
});

export default connect(
  mapStatToProps,
  { getSubCategories }
)(AdminSubCategories);
