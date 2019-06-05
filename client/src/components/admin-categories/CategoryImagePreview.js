import React from "react";
import { MdClose } from "react-icons/md";
import PropTypes from "prop-types";

const CategoryImagePreview = ({ image, deleteImage }) => (
  <div className="category-image-preview">
    <MdClose className="category-image-preview-close" onClick={deleteImage} />
    <img src={`/images/${image}`} />
  </div>
);

CategoryImagePreview.propTypes = {
  image: PropTypes.string.isRequired,
  deleteImage: PropTypes.func.isRequired
};

export default CategoryImagePreview;
