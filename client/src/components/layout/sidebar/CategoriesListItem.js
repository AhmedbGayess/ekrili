import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class CategoriesListItem extends React.Component {
  setSubCategories = () => {
    const { category, setSubCategories } = this.props;
    setSubCategories(category._id);
  };

  onLinkClick = () => {
    const { close, closeSubCategories } = this.props;
    close();
    closeSubCategories();
  };

  render() {
    const { category, closeSubCategories } = this.props;

    return (
      <li>
        <Link
          className="sidebar__list-item"
          to={`/browse-ads/1?category=${category._id}`}
          onMouseOver={this.setSubCategories}
          onMouseLeave={closeSubCategories}
          onClick={this.onLinkClick}
        >
          {category.name}
        </Link>
      </li>
    );
  }
}

CategoriesListItem.propTypes = {
  category: PropTypes.object.isRequired,
  setSubCategories: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  closeSubCategories: PropTypes.func.isRequired
};

export default CategoriesListItem;
