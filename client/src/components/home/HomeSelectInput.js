import React from "react";
import PropTypes from "prop-types";

const HomeSelectInput = ({ name, label, choices, onChange, value }) => {
  const options = choices.map((option) => (
    <option key={option._id} value={option._id}>
      {option.name}
    </option>
  ));
  return (
    <select
      id={name}
      name={name}
      className="home-search-input home-search-input__select"
      onChange={onChange}
      value={value}
    >
      <option value="" hidden>
        {label}
      </option>
      <option value="" />
      {options}
    </select>
  );
};

HomeSelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  choices: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default HomeSelectInput;
