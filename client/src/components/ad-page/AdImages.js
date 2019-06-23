import React from "react";
import ImageGallery from "react-image-gallery";
import PropTypes from "prop-types";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const AdImages = ({ images, favorite, isAuthenticated, addToFavorites }) => {
  const slides = images.map((image) => ({
    original: `/images/${image}`,
    thumbnail: `/images/${image}`
  }));
  let icon;
  if (favorite) {
    icon = <FaHeart className="ad-images__heart" onClick={addToFavorites} />;
  } else if (!favorite) {
    icon = <FaRegHeart className="ad-images__heart" onClick={addToFavorites} />;
  }
  return (
    <div className="ad-images">
      {isAuthenticated && icon}
      <ImageGallery
        items={slides}
        showFullscreenButton={false}
        showBullets
        showPlayButton={false}
      />
    </div>
  );
};

AdImages.propTypes = {
  images: PropTypes.array.isRequired
};

export default AdImages;
