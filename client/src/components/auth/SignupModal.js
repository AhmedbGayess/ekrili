import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";
import PropTypes from "prop-types";
import { registerUser } from "../../store/actions/auth";
import SignupForm from "./SignupForm";

class SignupModal extends React.Component {
  render() {
    const {
      modalOpen,
      toggleModal,
      switchModal,
      registerUser,
      signupError
    } = this.props;
    return (
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
            <h1 className="modal-content__title">Créer un compte...</h1>
            <p className="modal-content__description">
              Créer un compte pour commencer à louer ce que vous voulez. Ceci ne
              prendra qu'une minute.
            </p>
          </div>
          <div className="modal-content__form-container">
            <SignupForm
              registerUser={registerUser}
              toggleModal={toggleModal}
              error={signupError}
            />
          </div>
          <div className="modal-change">
            <p>Vous avez déjà un compte?</p>
            <span className="btn-secondary" onClick={switchModal}>
              Connectez-vous
            </span>
          </div>
        </div>
      </Modal>
    );
  }
}

SignupModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  switchModal: PropTypes.func.isRequired,
  signupError: PropTypes.string.isRequired,
  registerUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  signupError: state.auth.signupError
});

export default connect(
  mapStateToProps,
  { registerUser }
)(SignupModal);
