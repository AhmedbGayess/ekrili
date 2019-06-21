import React from "react";
import PropTypes from "prop-types";

const AdDescription = ({ ad }) => (
  <div className="ad-description">
    <h1>{ad.title}</h1>
    <p>{ad.description}</p>
  </div>
);

AdDescription.propTypes = {
  ad: PropTypes.object.isRequired
};

export default AdDescription;
