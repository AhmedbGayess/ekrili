import React from "react";
import PropTypes from "prop-types";

const AdPrice = ({ ad }) => (
  <div className="ad-price">
    <h3>Prix de location</h3>
    <p>{ad.price} TND par jour</p>
    <p>{ad.weekPrice} TND par semaine</p>
    <p>{ad.monthPrice} TND par mois</p>
  </div>
);

AdPrice.propTypes = {
  ad: PropTypes.object.isRequired
};

export default AdPrice;
