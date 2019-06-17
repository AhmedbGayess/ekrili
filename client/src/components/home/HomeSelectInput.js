import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const HomeSelectInput = ({
  value,
  options,
  onChange,
  placeholder,
  noOptions
}) => (
  <Select
    value={value}
    onChange={onChange}
    options={options}
    className="react-select-container"
    classNamePrefix="react-select"
    placeholder={placeholder}
    noOptionsMessage={() => noOptions}
  />
);

HomeSelectInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  placeholder: PropTypes.string.isRequired,
  noOptions: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default HomeSelectInput;
