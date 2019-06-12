import React from "react";
import { IoIosSearch } from "react-icons/io";
import PropTypes from "prop-types";
import HomeSelectInput from "./HomeSelectInput.js";

const HomeSearchForm = ({
  search,
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
        name="search"
        value={search}
        className="home-search-input"
        onChange={onChange}
        placeholder="Ordinateur, appareil photo, robe..."
      />
      <IoIosSearch className="home-search-container-icon" />
    </div>
    <HomeSelectInput
      onChange={onGovernorateChange}
      options={governorates}
      value={governorate}
      placeholder="Gouvernorat"
    />
    <HomeSelectInput
      onChange={onDelegationChange}
      options={delegations}
      value={delegation}
      placeholder="Délégation"
    />
    <HomeSelectInput
      onChange={onDelegationChange}
      options={delegations}
      value={delegation}
      placeholder="Délégation"
    />
    <button className="btn-primary">Chercher</button>
  </form>
);

HomeSearchForm.propTypes = {
  search: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onGovernorateChange: PropTypes.func.isRequired,
  onDelegationChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  governorates: PropTypes.array.isRequired,
  delegations: PropTypes.array.isRequired
};

export default HomeSearchForm;
