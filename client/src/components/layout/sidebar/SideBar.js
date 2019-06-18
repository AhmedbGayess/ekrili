import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import CategoriesListItem from "./CategoriesListItem";
import SubCategoriesCard from "./SubCategoriesCard";

class SideBar extends React.Component {
  state = {
    subCategoriesOpen: false
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  openSubCategories = () => {
    this.setState({ subCategoriesOpen: true });
  };

  closeSubCategories = () => {
    this.setState({ subCategoriesOpen: false });
  };

  setSubCategories = (category) => {
    this.props.setSubCategories(category);
    this.openSubCategories();
  };

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
    const { open, categories, close, subCategories } = this.props;
    const { subCategoriesOpen } = this.state;
    const categoriesList = categories.map((category) => (
      <CategoriesListItem
        key={category._id}
        category={category}
        setSubCategories={this.setSubCategories}
        closeSubCategories={this.closeSubCategories}
        close={close}
      />
    ));
    return (
      <nav
        ref={this.setWrapperRef}
        className={classNames("sidebar", {
          sidebar__open: open
        })}
      >
        <ul className="sidebar__list">{categoriesList}</ul>
        <SubCategoriesCard
          subCategoriesOpen={subCategoriesOpen}
          subCategories={subCategories}
          openSubCategories={this.openSubCategories}
          closeSubCategories={this.closeSubCategories}
          close={close}
        />
      </nav>
    );
  }
}

SideBar.propTypes = {
  open: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired,
  subCategories: PropTypes.array.isRequired
};

export default SideBar;
