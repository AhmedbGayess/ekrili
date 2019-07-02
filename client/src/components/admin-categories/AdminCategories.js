import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getCategories } from "../../store/actions/categories";
import CategoryCard from "../categories/CategoryCard";
import Loader from "../common/Loader";

class AdminCategories extends React.Component {
  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    const { categories, loading } = this.props.categories;
    let content;
    if (loading) {
      content = <Loader />;
    } else {
      content = categories.map((category) => (
        <Link to={`/admin/edit-category/${category._id}`} key={category._id}>
          <CategoryCard category={category} />
        </Link>
      ));
    }
    return (
      <div className="container">
        <h1 className="my-2 text-center">LES CATÉGORIES</h1>
        <div className="admin-categories my-4">{content}</div>
      </div>
    );
  }
}

AdminCategories.propTypes = {
  categories: PropTypes.object.isRequired
};

const mapStatToProps = (state) => ({
  categories: state.categories
});

export default connect(
  mapStatToProps,
  { getCategories }
)(AdminCategories);
