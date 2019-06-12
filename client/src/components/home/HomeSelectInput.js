import React from "react";
import Select from "react-select";

const HomeSelectInput = ({ value, options, onChange, placeholder }) => (
  <Select
    value={value}
    onChange={onChange}
    options={options}
    className="react-select-container"
    classNamePrefix="react-select"
    placeholder={placeholder}
  />
);

export default HomeSelectInput;
