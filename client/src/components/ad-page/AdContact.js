import React from "react";
import PropTypes from "prop-types";

const AdContact = ({ ad }) => (
  <div className="ad-contact">
    <h3>Contacter</h3>
    <p>Propriétaire: {ad.name}</p>
    <p>
      Téléphone:{" "}
      <a href={`tel:+216${ad.phone}`} className="ad-contact__phone">
        +216 {ad.phone}
      </a>
    </p>
    <h3>Emplacement</h3>
    <p>
      {ad.delegation}, {ad.governorate}
    </p>
  </div>
);

AdContact.propTypes = {
  ad: PropTypes.object.isRequired
};

export default AdContact;
