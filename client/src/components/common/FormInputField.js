import React from "react";
import { Field } from "formik";
import PropTypes from "prop-types";

const FormInputField = ({ name, label, type, error, touched }) => (
  <div className="input-container">
    <label htmlFor={name} className="input-label">
      {label}
    </label>
    <Field
      id={name}
      type={type ? type : "text"}
      name={name}
      className="form-input"
    />
    {touched && error && <div className="input-error">{error}</div>}
  </div>
);

FormInputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool
};

export default FormInputField;
