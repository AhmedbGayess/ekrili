import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

const DeleteModal = ({ modalOpen, toggleModal, deleteItem, item }) => (
  <Modal
    isOpen={modalOpen}
    onRequestClose={toggleModal}
    appElement={document.getElementById("root")}
    closeTimeoutMS={200}
    className="delete-modal"
  >
    <p>Êtes-vous sûr de supprimer {item}?</p>
    <div className="delete-modal__buttons">
      <button onClick={deleteItem} className="btn-secondary">
        Supprimer
      </button>
      <button onClick={toggleModal} className="btn-secondary">
        Annuler
      </button>
    </div>
  </Modal>
);

DeleteModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired
};

export default DeleteModal;
