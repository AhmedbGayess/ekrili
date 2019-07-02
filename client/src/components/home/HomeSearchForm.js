import React from "react";
import { IoIosSearch } from "react-icons/io";
import PropTypes from "prop-types";
import HomeSelectInput from "./HomeSelectInput.js";

const HomeSearchForm = ({
  title,
  onChange,
  onGovernorateChange,
  onDelegationChange,
  governorates,
  delegations,
  governorate,
  delegation,
  onSubmit
}) => (
  <form className="home-search-form" onSubmit={onSubmit}>
    <div className="home-search-container">
      <input
        name="title"
        value={title}
        className="home-search-input"
        onChange={onChange}
        placeholder="Que cherchez-vous?"
        autoComplete="off"
      />
      <IoIosSearch className="home-search-container-icon" />
    </div>
    <HomeSelectInput
      name="governorate"
      label="Gouvernorat"
      choices={governorates}
      value={governorate}
      onChange={onGovernorateChange}
    />
    <HomeSelectInput
      name="delegation"
      label="Délégation"
      choices={delegations}
      value={delegation}
      onChange={onDelegationChange}
    />
    <button className="btn-primary home-search-button">Chercher</button>
  </form>
);

HomeSearchForm.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onGovernorateChange: PropTypes.func.isRequired,
  onDelegationChange: PropTypes.func.isRequired,
  governorates: PropTypes.array.isRequired,
  delegations: PropTypes.array.isRequired
};

export default HomeSearchForm;
