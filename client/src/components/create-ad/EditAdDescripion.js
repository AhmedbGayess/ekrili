import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FormTextAreaField from "../common/FormTextAreaField";
import FormInputSelect from "../common/FormInputSelect";

class EditAdDescription extends React.Component {
  state = {
    subCategories: []
  };

  componentDidMount() {
    const { category, subCategories } = this.props;
    if (category) {
      const stateSubCategories = subCategories.filter(
        (subCategory) => subCategory.category === category
      );
      this.setState({ subCategories: [...stateSubCategories] });
    }
  }

  componentDidUpdate(prevProps) {
    const { category, subCategories } = this.props;
    if (category !== prevProps.category) {
      const stateSubCategories = subCategories.filter(
        (subCategory) => subCategory.category === category
      );
      this.setState({ subCategories: [...stateSubCategories] });
    }
  }

  render() {
    const { categories } = this.props.categories;

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
        {this.state.subCategories.length > 0 && (
          <FormInputSelect
            name="subCategory"
            label="Sous-catégories"
            error={subCategoryError}
            touched={touchedSubCategory}
            choices={this.state.subCategories}
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

EditAdDescription.propTypes = {
  categories: PropTypes.object.isRequired,
  subCategories: PropTypes.array.isRequired,
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
  subCategories: state.subCategories.subCategories
});

export default connect(mapStateToProps)(EditAdDescription);
