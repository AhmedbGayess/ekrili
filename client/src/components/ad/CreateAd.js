import React from "react";
import { connect } from "react-redux";
import { withFormik, Form } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { createAd } from "../../store/actions/ads";
import CreateAdProgress from "./CreateAdProgress";
import CreateAdImage from "./CreateAdImage";
import FormInputField from "../common/FormInputField";

class NewAd extends React.Component {
  state = {
    step: 1,
    images: []
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

  addImage = (image) => {
    this.setState((prevState) => ({
      images: [...prevState.images, image]
    }));
  };

  removeImage = (deletedImage) => {
    console.log(deletedImage);
    this.setState((prevState) => ({
      images: prevState.images.filter((image) => image !== deletedImage)
    }));
  };

  render() {
    const { step } = this.state;
    return (
      <div className="container">
        <CreateAdProgress step={step} />
        <Form>
          {step === 1 && (
            <div className="create-ad">
              <div>
                <FormInputField name="title" label="Titre de l'annonce" />
                <div className="create-ad-images">
                  <CreateAdImage
                    addImage={this.addImage}
                    removeImage={this.removeImage}
                  />
                  <CreateAdImage
                    addImage={this.addImage}
                    removeImage={this.removeImage}
                  />
                  <CreateAdImage
                    addImage={this.addImage}
                    removeImage={this.removeImage}
                  />
                </div>
              </div>
              <div>hello</div>
            </div>
          )}
        </Form>
        <button onClick={this.nextStep}>next</button>
        <button onClick={this.previousStep}>prev</button>
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
      subCategory: ""
    };
  },
  validationSchema: Yup.object({
    name: Yup.string()
      .min(10, "Soyez plus déscriptifs!")
      .required("Ce champ est obligatoire")
  }),
  handleSubmit(values, { props }) {}
})(NewAd);

export default connect(
  null,
  { createAd }
)(CreateAd);
