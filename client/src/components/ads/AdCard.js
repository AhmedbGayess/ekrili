import React from "react";
import PropTypes from "prop-types";
import noImage from "../../images/no-image.jpg";

const AdCard = ({ title, price, governorate, delegation, image }) => (
  <div className="ad-card">
    <img
      src={`/images/${image}`}
      alt={title}
      className="ad-card__image"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = noImage;
      }}
    />
    <div className="ad-card__text">
      <p className="ad-card__title">{title}</p>
      <p className="ad-card__price">{price} TND / JOUR</p>
      <p className="ad-card__location">
        {delegation}, {governorate}
      </p>
    </div>
  </div>
);

AdCard.propTypes = {
  title: PropTypes.string.isRequired,
  governorate: PropTypes.string.isRequired,
  delegation: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};

export default AdCard;
