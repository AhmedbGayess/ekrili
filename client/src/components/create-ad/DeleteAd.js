import React from "react";
import PropTypes from "prop-types";

const DeleteAd = ({ toggleDeleteModal }) => (
  <div className="container">
    <div className="delete-ad ">
      <p className="delete-ad__message">Supprimer cette annonce</p>
      <button
        className="btn-secondary delete-ad__btn"
        onClick={toggleDeleteModal}
      >
        Supprimer
      </button>
    </div>
  </div>
);

DeleteAd.propTypes = {
  toggleDeleteModal: PropTypes.func.isRequired
};

export default DeleteAd;
