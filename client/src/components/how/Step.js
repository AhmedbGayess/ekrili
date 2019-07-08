import React from "react";
import PropTypes from "prop-types";

const Step = ({ number, text }) => (
  <div className="how__section__steps__step">
    <h3 className="how__section__steps__step__number">{number}.</h3>
    <p className="how__section__steps__step__text">{text}</p>
  </div>
);

Step.propTypes = {
  number: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired
};

export default Step;
