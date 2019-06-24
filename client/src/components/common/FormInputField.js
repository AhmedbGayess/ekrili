import React from "react";
import { Field } from "formik";
import PropTypes from "prop-types";

const FormInputField = ({ name, label, type, error, touched, placeholder }) => (
  <div className="input-container">
    <label htmlFor={name} className="input-label">
      {label}
    </label>
    <Field
      id={name}
      type={type ? type : "text"}
      name={name}
      className="form-input"
      placeholder={placeholder}
    />
    {touched && error && <p className="input-error">{error}</p>}
  </div>
);

FormInputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
  placeholder: PropTypes.string
};

export default FormInputField;
