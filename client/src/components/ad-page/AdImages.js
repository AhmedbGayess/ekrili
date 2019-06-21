import React from "react";
import ImageGallery from "react-image-gallery";
import PropTypes from "prop-types";

const AdImages = ({ images }) => {
  const slides = images.map((image) => ({
    original: `/images/${image}`,
    thumbnail: `/images/${image}`
  }));
  return (
    <div className="ad-images">
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
