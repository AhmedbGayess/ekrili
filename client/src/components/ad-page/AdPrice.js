import React from "react";
import PropTypes from "prop-types";

const AdPrice = ({ ad }) => (
  <div className="ad-price">
    <h3>Prix de location</h3>
    <div className="ad-price__prices">
      <p>
        <span className="ad-price__prices__cost">{ad.price} TND</span>{" "}
        <span className="ad-price__prices__duration">par jour</span>
      </p>
      <p>
        <span className="ad-price__prices__cost">{ad.weekPrice} TND</span>{" "}
        <span className="ad-price__prices__duration">par semaine</span>
      </p>
      <p>
        <span className="ad-price__prices__cost">{ad.monthPrice} TND </span>{" "}
        <span className="ad-price__prices__duration">par mois</span>
      </p>
    </div>
  </div>
);

AdPrice.propTypes = {
  ad: PropTypes.object.isRequired
};

export default AdPrice;
