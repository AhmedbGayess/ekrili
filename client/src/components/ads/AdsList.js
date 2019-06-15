import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AdCard from "./AdCard";

const AdsList = ({ ads }) => {
  const adsList = ads.map((ad) => (
    <Link key={ad._id} to={`/ad/${ad._id}`}>
      <AdCard
        title={ad.title}
        price={ad.price}
        governorate={ad.governorate}
        delegation={ad.delegation}
        image={ad.images[0]}
      />
    </Link>
  ));
  return <div className="ads-list">{adsList}</div>;
};

AdsList.propTypes = {
  ads: PropTypes.array.isRequired
};

export default AdsList;
