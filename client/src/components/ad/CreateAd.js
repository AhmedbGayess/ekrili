import React from "react";
import { connect } from "react-redux";
import { withFormik, Form } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { createAd } from "../../store/actions/ads";
import CreateAdProgress from "./CreateAdProgress";
import CreatAdTips from "./CreatAdTips";
import CreateAdTitle from "./CreateAdTitle";
import CreateAdDescription from "./CreateAdDescripion";

class NewAd extends React.Component {
  state = {
    step: 2,
    imageOne: "",
    imageTwo: "",
    imageThree: ""
  };

  nextStep = () => {
    if (this.state.step < 4) {
      this.setState((prevState) => ({ step: prevState.step + 1 }));
    }
  };

  previousStep = () => {
    if (this.state.step > 1) {
      this.setState((prevState) => ({ step: prevState.step - 1 }));
    }
  };

  addImage = (image, stateImage) => {
    this.setState({ [stateImage]: image });
  };

  removeImage = (deletedImage) => {
    this.setState({ [deletedImage]: "" });
  };

  render() {
    const { step, imageOne, imageTwo, imageThree } = this.state;
    const { errors, touched } = this.props;

    let content;

    if (step === 1) {
      content = (
        <CreateAdTitle
          error={errors.title}
          touched={touched.title}
          imageOne={imageOne}
          imageTwo={imageTwo}
          imageThree={imageThree}
          addImage={this.addImage}
          removeImage={this.removeImage}
        />
      );
    } else if (step === 2) {
      content = (
        <CreateAdDescription
          descriptionError={errors.description}
          touchedDescription={touched.description}
          category={this.props.values.category}
          categoryError={errors.category}
          touchedCategory={touched.category}
          subCategoryError={errors.subCategory}
          touchedSubCategory={touched.subCategory}
        />
      );
    }
    return (
      <div className="container">
        <CreateAdProgress step={step} />
        <div className="create-ad">
          <div>
            <Form>{content}</Form>
            <div className="create-ad-buttons">
              <button
                onClick={this.previousStep}
                className="btn-primary"
                disabled={step === 1}
              >
                Précédent
              </button>
              <button onClick={this.nextStep} className="btn-primary">
                Suivant
              </button>
            </div>
          </div>
          <div>
            <CreatAdTips step={step} />
          </div>
        </div>
      </div>
    );
  }
}

NewAd.propTypes = {
  createAd: PropTypes.func.isRequired
};

const CreateAd = withFormik({
  mapPropsToValues() {
    return {
      title: "",
      description: "",
      price: "",
      governorate: "",
      delegation: "",
      category: "",
      subCategory: ""
    };
  },
  validationSchema: Yup.object({
    title: Yup.string()
      .min(10, "Soyez plus déscriptif!")
      .required("Veuillez ajouter un titre à votre annonce"),
    description: Yup.string()
      .min(50, "Soyez plus déscriptif!")
      .required("Veuillez ajouter une description à votre article"),
    category: Yup.string().required(
      "Veuillez choisir une catégorie pour votre article"
    ),
    subCategory: Yup.string().required(
      "Veuillez choisir une sous-catégorie pour votre article"
    )
  }),
  handleSubmit(values, { props }) {}
})(NewAd);

export default connect(
  null,
  { createAd }
)(CreateAd);
