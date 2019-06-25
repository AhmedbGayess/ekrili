import React from "react";
import PropTypes from "prop-types";
import FormInputField from "../common/FormInputField";

const EditAdPrice = ({ price, error, touched }) => (
  <div>
    <FormInputField
      type="number"
      name="price"
      label="Prix par jour"
      error={error}
      touched={touched}
    />
    <div className="input-container">
      <label className="input-label">Prix par semaine</label>
      <input
        className="form-input"
        disabled
        value={
          price === "" || !price.toString().match(/^\d{1,}(\.\d{0,3})?$/)
            ? ""
            : Math.floor(price * 7)
        }
      />
    </div>
    <div className="input-container">
      <label className="input-label">Prix par mois</label>
      <input
        className="form-input"
        disabled
        value={
          price === "" || !price.toString().match(/^\d{1,}(\.\d{0,3})?$/)
            ? ""
            : Math.floor(price * 30)
        }
      />
    </div>
  </div>
);

EditAdPrice.propTypes = {
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  error: PropTypes.string,
  touched: PropTypes.bool
};

export default EditAdPrice;
