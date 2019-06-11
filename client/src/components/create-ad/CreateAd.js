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
import CreateAdLocation from "./CreateAdLocation";
import CreateAdPrice from "./CreateAdPrice";

class NewAd extends React.Component {
  state = {
    step: 1,
    imageOne: "",
    imageTwo: "",
    imageThree: "",
    weekPrice: "",
    monthPrice: ""
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

  onSubmit = (e) => {
    e.preventDefault();
    const { imageOne, imageTwo, imageThree } = this.state;

    const images = [imageOne, imageTwo, imageThree].filter(
      (image) => image !== ""
    );
    this.props.createAd({
      ...this.props.values,
      images
    });
  };

  render() {
    const { step, imageOne, imageTwo, imageThree } = this.state;
    const { errors, touched, values } = this.props;

    let disabledNext = false;

    const imagesLength = [imageOne, imageTwo, imageThree].filter(
      (image) => image !== ""
    ).length;

    if (
      step === 1 &&
      (errors.title || values.title === "" || imagesLength === 0)
    ) {
      disabledNext = true;
    }

    if (
      step === 2 &&
      (errors.category ||
        errors.subCategory ||
        errors.description ||
        values.category === "" ||
        values.subCategory === "" ||
        values.description === "")
    ) {
      disabledNext = true;
    }

    if (
      step === 3 &&
      (errors.governorate ||
        errors.delegation ||
        values.governorate === "" ||
        values.delegation === "")
    ) {
      disabledNext = true;
    }

    let disabledSubmit = false;

    if (errors.price || values.price === "") {
      disabledSubmit = true;
    }

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
    } else if (step === 3) {
      content = (
        <CreateAdLocation
          governorate={this.props.values.governorate}
          governorateError={errors.governorate}
          touchedGovernorate={touched.governorate}
          delegationError={errors.delegation}
          touchedDelegation={touched.delegation}
        />
      );
    } else if (step === 4) {
      content = (
        <CreateAdPrice
          price={this.props.values.price}
          error={errors.price}
          touched={touched.price}
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
              {step !== 4 && (
                <button
                  onClick={this.nextStep}
                  className="btn-primary"
                  disabled={disabledNext}
                >
                  Suivant
                </button>
              )}
              {step === 4 && (
                <button
                  type="submit"
                  disabled={disabledSubmit}
                  onClick={this.onSubmit}
                  className="btn-primary"
                >
                  Publier
                </button>
              )}
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
    ),
    governorate: Yup.string().required(
      "Veuillez choisir dans quel gouvernorat votre article est disponible"
    ),
    delegation: Yup.string().required(
      "Veuillez choisir dans quel délégation votre article est disponible"
    ),
    price: Yup.string()
      .matches(/^\d{1,}(\.\d{0,3})?$/, "Vérifiez votre prix")
      .required("Vous devez spécifier le prix de location par jour")
  })
})(NewAd);

export default connect(
  null,
  { createAd }
)(CreateAd);
