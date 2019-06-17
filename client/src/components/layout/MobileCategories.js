import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";

class MobileCategories extends React.Component {
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.close();
    }
  };

  render() {
    const { open, categories } = this.props;
    const categoriesList = categories.map((category) => (
      <li key={category._id}>
        <span className="mobile-sidebar__link mobile-sidebar__link-category">
          <Link to={`/browse-ads/1?category=${category._id}`}>
            {category.name}
          </Link>
          <span>+</span>
        </span>
      </li>
    ));
    return (
      <nav
        ref={this.setWrapperRef}
        className={classNames("mobile-sidebar", {
          "mobile-sidebar__open": open
        })}
      >
        <ul>{categoriesList}</ul>
      </nav>
    );
  }
}

export default MobileCategories;
