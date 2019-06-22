import React from "react";
import PropTypes from "prop-types";

const AdPrice = ({ ad }) => (
  <div className="ad-price">
    {/* <div className="ad-price__card"> */}
    <h3>Prix de location</h3>
    <p>{ad.price} TND par jour</p>
    <p>{ad.weekPrice} TND par semaine</p>
    <p>{ad.monthPrice} TND par mois</p>
    {/* <h3>Contacter</h3>
      <p>Propriétaire: {ad.name}</p>
      <p>
        Téléphone:{" "}
        <a href={`tel:+216${ad.phone}`} className="ad-price__card__phone">
          +216 {ad.phone}
        </a>
      </p>
      <h3>Emplacement</h3>
      <p>
        {ad.delegation}, {ad.governorate}
      </p> */}
    {/* </div> */}
  </div>
);

AdPrice.propTypes = {
  ad: PropTypes.object.isRequired
};

export default AdPrice;
