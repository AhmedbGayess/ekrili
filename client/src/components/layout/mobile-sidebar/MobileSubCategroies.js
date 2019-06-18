import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";

class MobileSubCategories extends React.Component {
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

  back = () => {
    this.props.close();
    this.props.openMobileCategories();
  };

  render() {
    const { open, subCategories, close } = this.props;
    const subCategoriesList = subCategories.map((subCategory) => (
      <li key={subCategory._id}>
        <span className="mobile-sidebar__link mobile-sidebar__link-category">
          <Link
            to={`/browse-ads/1?subCategory=${subCategory._id}`}
            onClick={close}
          >
            {subCategory.name}
          </Link>
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
        <p className="mobile-sidebar__back" onClick={this.back}>
          <span className="mobile-sidebar__back-icon">&larr; </span>{" "}
          <span>Retour</span>
        </p>
        <ul>{subCategoriesList}</ul>
      </nav>
    );
  }
}

MobileSubCategories.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  openMobileCategories: PropTypes.func.isRequired,
  subCategories: PropTypes.array.isRequired
};

export default MobileSubCategories;
