import React from "react";
import PropTypes from "prop-types";

const AdDescription = ({ description }) => (
  <div className="ad-description">
    <h3>Description</h3>
    <p>{description}</p>
  </div>
);

AdDescription.propTypes = {
  description: PropTypes.object.isRequired
};

export default AdDescription;
