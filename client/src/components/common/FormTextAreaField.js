import React from "react";
import { Field } from "formik";
import PropTypes from "prop-types";

const FormTextAreaField = ({ name, label, error, touched }) => (
  <div className="input-container">
    <label htmlFor={name} className="input-label">
      {label}
    </label>
    <Field
      component="textarea"
      id={name}
      name={name}
      className="form-input form-input-textarea"
    />
    {touched && error && <p className="input-error">{error}</p>}
  </div>
);

FormTextAreaField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool
};

export default FormTextAreaField;
