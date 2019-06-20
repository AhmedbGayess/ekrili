import React from "react";
import PropTypes from "prop-types";

const AdsSort = ({ onChange, value }) => (
  <div className="sort-container">
    <label htmlFor="sort-by" className="sort-label">
      Trier par
    </label>
    <select
      component="select"
      id="sort-by"
      name="sortBy"
      className="sort-input"
      onChange={onChange}
      value={value}
    >
      <option value="updatedAt:asc">Le plus récent</option>
      <option value="updatedAt:desc">Le plus ancien</option>
      <option value="price:asc">Prix croissant</option>
      <option value="price:desc">Prix décroissant</option>
    </select>
  </div>
);

AdsSort.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default AdsSort;
