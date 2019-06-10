import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FormTextAreaField from "../common/FormTextAreaField";
import FormInputSelect from "../common/FormInputSelect";
import { getCategories } from "../../store/actions/categories";
import { getCategorySubCategories } from "../../store/actions/subCategories";

class CreateAdDescription extends React.Component {
  componentDidMount() {
    this.props.getCategories();
  }

  componentDidUpdate(prevProps) {
    const { category, getCategorySubCategories } = this.props;
    if (category !== prevProps.category) {
      getCategorySubCategories(category);
    }
  }

  render() {
    const { categories } = this.props.categories;
    const { subCategories } = this.props.subCategories;
    const {
      categoryError,
      touchedCategory,
      subCategoryError,
      touchedSubCategory,
      descriptionError,
      touchedDescription
    } = this.props;
    return (
      <div>
        <FormInputSelect
          name="category"
          label="Catégorie"
          error={categoryError}
          touched={touchedCategory}
          choices={categories}
        />
        {subCategories.length > 0 && (
          <FormInputSelect
            name="subCategory"
            label="Sous-catégories"
            error={subCategoryError}
            touched={touchedSubCategory}
            choices={subCategories}
          />
        )}
        <FormTextAreaField
          name="description"
          label="Description de l'article"
          error={descriptionError}
          touched={touchedDescription}
        />
      </div>
    );
  }
}

CreateAdDescription.propTypes = {
  categories: PropTypes.shape({}).isRequired,
  getCategories: PropTypes.func.isRequired,
  subCategories: PropTypes.shape({}).isRequired,
  getCategorySubCategories: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  categoryError: PropTypes.string,
  touchedCategory: PropTypes.bool,
  subCategoryError: PropTypes.string,
  touchedSubCategory: PropTypes.bool,
  descriptionError: PropTypes.string,
  touchedDescription: PropTypes.bool
};

const mapStateToProps = (state) => ({
  categories: state.categories,
  subCategories: state.subCategories
});

export default connect(
  mapStateToProps,
  { getCategories, getCategorySubCategories }
)(CreateAdDescription);
