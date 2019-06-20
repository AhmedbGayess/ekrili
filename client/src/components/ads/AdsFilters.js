import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";
import { history } from "../../router/AppRouter";
import setDelegation from "../../utils/setDelegation.js";
import FilterInput from "./FilterInput";
import { governorates } from "../../utils/locations.js";

class AdsFilters extends React.Component {
  state = {
    title: "",
    governorate: "",
    delegations: [],
    delegation: "",
    category: "",
    subCategory: "",
    subCategories: [],
    mobileFiltersOpen: false
  };

  async componentDidMount() {
    this.setStateFromQuery();
  }

  componentWillUnmount() {}

  setStateFromQuery = () => {
    const { queryString, subCategories } = this.props;
    const query = {};
    const pairs = (queryString[0] === "?"
      ? queryString.substr(1)
      : queryString
    ).split("&");
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i].split("=");
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
    }

    const { title, governorate, delegation, category, subCategory } = query;

    if (title) {
      this.setState({ title });
    }

    if (governorate) {
      const delegations = setDelegation(governorate);
      this.setState({ governorate, delegations: [...delegations] });
    }

    if (delegation) {
      this.setState({ delegation });
    }

    if (category) {
      const stateSubCategories = subCategories.filter(
        (subCategory) => subCategory.category === category
      );
      this.setState({ category, subCategories: [...stateSubCategories] });
    }

    if (subCategory) {
      const category = subCategories.find((sub) => sub._id === subCategory)
        .category;
      const stateSubCategories = subCategories.filter(
        (subCategory) => subCategory.category === category
      );
      this.setState({
        category,
        subCategories: [...stateSubCategories],
        subCategory
      });
    }
  };

  toggleMobileFilters = () => {
    this.setState((prevState) => ({
      mobileFiltersOpen: !prevState.mobileFiltersOpen
    }));
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.search();
    });
  };

  onBlurInput = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  onCategoryChange = (e) => {
    const category = e.target.value;
    const subCategories = this.props.subCategories.filter(
      (subCategory) => subCategory.category === category
    );
    this.setState(
      { category, subCategories: [...subCategories], subCategory: "" },
      () => {
        this.search();
      }
    );
  };

  onGovernorateChange = (e) => {
    const governorate = e.target.value;
    const delegations = setDelegation(governorate);
    this.setState(
      { delegations: [...delegations], governorate, delegation: "" },
      () => {
        this.search();
      }
    );
  };

  search = () => {
    const {
      title,
      governorate,
      delegation,
      category,
      subCategory
    } = this.state;
    history.push(
      `/browse-ads/1?title=${title}&governorate=${governorate}&delegation=${delegation}&category=${category}&subCategory=${subCategory}`
    );
  };

  render() {
    const {
      title,
      governorate,
      delegation,
      delegations,
      category,
      subCategory,
      mobileFiltersOpen,
      subCategories
    } = this.state;
    const { categories } = this.props;
    return (
      <div className="ads-filters">
        <div
          className={classNames("ads-filters__mobile", {
            "ads-filters__mobile--open": mobileFiltersOpen
          })}
        >
          <span
            className="ads-filters__mobile__toggle"
            onClick={this.toggleMobileFilters}
          >
            Afficher les filtres{" "}
            {mobileFiltersOpen ? <span>-</span> : <span>+</span>}
          </span>
        </div>
        <div className="container">
          <h3>les filtres de recherche</h3>
          <div
            className={classNames("ads-filters__form", {
              "ads-filters__form--open": mobileFiltersOpen
            })}
          >
            <input
              name="title"
              placeholder="Chercher..."
              value={title}
              onChange={this.onChange}
              onKeyPress={this.onBlurInput}
              className="ads-filters__form__input"
            />
            <FilterInput
              name="category"
              label="Catégories"
              choices={categories}
              onChange={this.onCategoryChange}
              value={category}
            />
            <FilterInput
              name="subCategory"
              label="Sous-catégories"
              choices={subCategories}
              onChange={this.onChange}
              value={subCategory}
            />
            <FilterInput
              name="governorate"
              label="Gouvernorat"
              choices={governorates}
              value={governorate}
              onChange={this.onGovernorateChange}
            />
            <FilterInput
              name="delegation"
              label="Délégation"
              choices={delegations}
              value={delegation}
              onChange={this.onChange}
            />
            <FilterInput
              name="delegation"
              label="Délégation"
              choices={delegations}
              value={delegation}
              onChange={this.onChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
  subCategories: state.subCategories.subCategories
});

export default connect(mapStateToProps)(AdsFilters);
