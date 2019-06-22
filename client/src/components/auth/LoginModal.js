import React from "react";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";

const LoginModal = ({ modalOpen, toggleModal, switchModal }) => (
  <Modal
    isOpen={modalOpen}
    onRequestClose={toggleModal}
    appElement={document.getElementById("root")}
    closeTimeoutMS={200}
    className="modal"
  >
    <div className="modal-content">
      <div className="modal-content__header">
        <MdClose className="modal-content__close" onClick={toggleModal} />
        <h1 className="modal-content__title">Se connecter...</h1>
        <p className="modal-content__description">
          Connectez vous à votre compte pour commencer à louer vos biens.
        </p>
      </div>
      <div className="modal-content__form-container">
        <LoginForm closeModal={toggleModal} />
      </div>
      <div className="modal-change">
        <p>Vous n'avez pas de compte?</p>
        <span className="btn-secondary" onClick={switchModal}>
          Inscrivez-vous
        </span>
      </div>
    </div>
  </Modal>
);

LoginModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  switchModal: PropTypes.func.isRequired
};

export default LoginModal;
