import React from "react";
import { connect } from "react-redux";
import { withFormik, Form } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { createAd, editAd } from "../../store/actions/ads";
import EditAdProgress from "./EditAdProgress";
import EditAdTips from "./EditAdTips";
import EditAdTitle from "./EditAdTitle";
import EditAdDescription from "./EditAdDescripion";
import EditAdLocation from "./EditAdLocation";
import EditAdPrice from "./EditAdPrice";

class Ad extends React.Component {
  state = {
    step: 1,
    imageOne: this.props.imageOne ? this.props.imageOne : "",
    imageTwo: this.props.imageTwo ? this.props.imageTwo : "",
    imageThree: this.props.imageThree ? this.props.imageThree : "",
    weekPrice: "",
    monthPrice: ""
  };

  nextStep = () => {
    if (this.state.step < 4) {
      this.setState((prevState) => ({ step: prevState.step + 1 }));
    }
    this.scroll();
  };

  previousStep = () => {
    if (this.state.step > 1) {
      this.setState((prevState) => ({ step: prevState.step - 1 }));
    }
    this.scroll();
  };

  scroll = () => {
    window.scrollTo(0, 0);
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
    if (this.props.id) {
      this.props.editAd(
        {
          ...this.props.values,
          images
        },
        this.props.id
      );
    } else {
      this.props.createAd({
        ...this.props.values,
        images
      });
    }
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
        <EditAdTitle
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
        <EditAdDescription
          descriptionError={errors.description}
          touchedDescription={touched.description}
          category={values.category}
          categoryError={errors.category}
          touchedCategory={touched.category}
          subCategoryError={errors.subCategory}
          touchedSubCategory={touched.subCategory}
        />
      );
    } else if (step === 3) {
      content = (
        <EditAdLocation
          governorate={values.governorate}
          governorateError={errors.governorate}
          touchedGovernorate={touched.governorate}
          delegationError={errors.delegation}
          touchedDelegation={touched.delegation}
        />
      );
    } else if (step === 4) {
      content = (
        <EditAdPrice
          price={values.price}
          error={errors.price}
          touched={touched.price}
        />
      );
    }
    return (
      <div className="container">
        <EditAdProgress step={step} />
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
            <EditAdTips step={step} />
          </div>
        </div>
      </div>
    );
  }
}

Ad.propTypes = {
  createAd: PropTypes.func.isRequired,
  editAd: PropTypes.func.isRequired,
  ads: PropTypes.object
};

const EditAd = withFormik({
  enableReinitialize: true,
  mapPropsToValues({
    title,
    description,
    price,
    delegation,
    governorate,
    category,
    subCategory
  }) {
    return {
      title: title ? title : "",
      description: description ? description : "",
      price: price ? price : "",
      governorate: governorate ? governorate : "",
      delegation: delegation ? delegation : "",
      category: category ? category : "",
      subCategory: subCategory ? subCategory : ""
    };
  },
  validationSchema: Yup.object({
    title: Yup.string()
      .min(10, "Soyez plus déscriptif!")
      .max(30, "Le titre est trop long!")
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
})(Ad);
export default connect(
  null,
  { createAd, editAd }
)(EditAd);
