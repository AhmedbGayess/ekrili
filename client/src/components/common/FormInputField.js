import React from "react";
import { Field } from "formik";
import classnames from "classnames";
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
      className={classnames("form-input", {
        "form-input-error": error
      })}
    />
    {touched && error && <p className="input-error">{error}</p>}
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
