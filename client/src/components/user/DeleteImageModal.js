import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

const DeleteImageModal = ({ modalOpen, toggleModal, deleteImage }) => (
  <Modal
    isOpen={modalOpen}
    onRequestClose={toggleModal}
    appElement={document.getElementById("root")}
    closeTimeoutMS={200}
    className="delete-modal"
  >
    <p>Êtes-vous sûr de supprimer votre photo?</p>
    <div className="delete-modal__buttons">
      <button onClick={deleteImage} className="btn-secondary">
        Supprimer
      </button>
      <button onClick={toggleModal} className="btn-secondary">
        Annuler
      </button>
    </div>
  </Modal>
);

DeleteImageModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired
};

export default DeleteImageModal;
