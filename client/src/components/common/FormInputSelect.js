import React from "react";
import { Field } from "formik";
import PropTypes from "prop-types";

const FormInputSelect = ({ name, label, error, touched, choices }) => {
  const options = choices.map((option) => (
    <option key={option._id} value={option._id}>
      {option.name}
    </option>
  ));
  return (
    <div className="input-container">
      <label htmlFor={name} className="input-label">
        {label}
      </label>
      <Field component="select" id={name} name={name} className="form-input">
        <option />
        {options}
      </Field>
      {touched && error && <p className="input-error">{error}</p>}
    </div>
  );
};

FormInputSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
  choices: PropTypes.array.isRequired
};

export default FormInputSelect;
