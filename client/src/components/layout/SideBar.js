import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import { getCategories } from "../../store/actions/categories";
import { getSubCategories } from "../../store/actions/subCategories";
import CategoriesListItem from "./CategoriesListItem";
import SubCategoriesCard from "./SubCategoriesCard";

class SideBar extends React.Component {
  state = {
    subCategories: [],
    subCategoriesOpen: false
  };

  componentDidMount() {
    this.props.getCategories();
    this.props.getSubCategories();
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  openSubCategories = () => {
    this.setState({ subCategoriesOpen: true });
  };

  closeSubCategories = () => {
    this.setState({ subCategoriesOpen: false });
  };

  setSubCategories = (category) => {
    const subCategories = this.props.subCategories.filter(
      (subCategory) => subCategory.category === category
    );
    this.setState({ subCategories });
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
    const { open, categories } = this.props;
    const { subCategories, subCategoriesOpen } = this.state;
    const categoriesList = categories.map((category) => (
      <CategoriesListItem
        key={category._id}
        category={category}
        setSubCategories={this.setSubCategories}
        closeSubCategories={this.closeSubCategories}
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
        />
      </nav>
    );
  }
}

SideBar.propTypes = {
  open: PropTypes.bool.isRequired,
  getCategories: PropTypes.func.isRequired,
  getSubCategories: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  subCategories: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
  subCategories: state.subCategories.subCategories
});

export default connect(
  mapStateToProps,
  { getCategories, getSubCategories }
)(SideBar);
