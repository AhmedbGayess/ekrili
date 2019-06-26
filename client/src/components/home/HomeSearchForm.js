import React from "react";
import { Link } from "react-router-dom";
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
  query
}) => (
  <form className="home-search-form">
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
      noOptions="Séléctionnez d'abord un gouvernorat"
    />
    <HomeSelectInput
      onChange={onDelegationChange}
      options={delegations}
      value={delegation}
      placeholder="Délégation"
      noOptions="Séléctionnez d'abord un gouvernorat"
    />
    <Link
      className="btn-primary home-search-button"
      to={`/browse-ads/1?${query}`}
    >
      Chercher
    </Link>
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
