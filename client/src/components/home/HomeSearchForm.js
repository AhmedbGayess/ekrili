import React from "react";
import { Link } from "react-router-dom";
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
  <form className="home-search-form">
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
    <Link className="btn-primary home-search-button" to="/">
      Chercher
    </Link>
  </form>
);

HomeSearchForm.propTypes = {
  search: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onGovernorateChange: PropTypes.func.isRequired,
  onDelegationChange: PropTypes.func.isRequired,
  governorates: PropTypes.array.isRequired,
  delegations: PropTypes.array.isRequired
};

export default HomeSearchForm;
