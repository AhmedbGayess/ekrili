import React from "react";
import { connect } from "react-redux";
import { withFormik, Form } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { createAd } from "../../store/actions/ads";
import CreateAdProgress from "./CreateAdProgress";

class NewAd extends React.Component {
  state = {
    step: 1
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

  render() {
    const { step } = this.state;
    return (
      <div className="container">
        <CreateAdProgress step={step} />
        <Form />
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
  validationSchema: Yup.object({}),
  handleSubmit(values, { props }) {}
})(NewAd);

export default connect(
  null,
  { createAd }
)(CreateAd);
