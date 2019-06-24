import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { setUserImage, deleteUserImage } from "../../store/actions/auth";
import UserImage from "./UserImage";
import DeleteImageModal from "./DeleteImageModal";
import EditUserForm from "./EditUserForm";

class UserInfo extends React.Component {
  state = {
    loading: false,
    deleteModalOpen: false,
    edit: false
  };

  toggleDeleteModal = () => {
    this.setState((prevProps) => ({
      deleteModalOpen: !prevProps.deleteModalOpen
    }));
  };

  toggleEdit = () => {
    this.setState((prevState) => ({ edit: !prevState.edit }));
  };

  onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    this.setState({
      loading: true
    });
    try {
      formData.append("image", acceptedFiles[0]);
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      const { data } = await axios.post("/upload", formData, config);
      this.setState({
        loading: false
      });
      this.props.setUserImage(data.image);
    } catch (e) {
      this.setState({
        loading: false
      });
      alert("Upload Error");
    }
  };

  onDeleteImage = async () => {
    await axios.delete(`/upload/${this.props.user.image}`);
    await this.props.deleteUserImage();
    this.toggleDeleteModal();
  };

  render() {
    const { name, email, phone, image, bio } = this.props.user;
    const { loading, deleteModalOpen, edit } = this.state;
    return (
      <div className="user-info">
        <button
          to="/edit-user"
          className="btn-secondary user-info__edit"
          onClick={this.toggleEdit}
        >
          Modifier vos infos
          <MdEdit className="user-info__edit__icon" />
        </button>
        <div className="user-info__profile-image">
          {image && (
            <div
              className="user-info__image"
              style={{ backgroundImage: `url("/images/${image}")` }}
              onClick={this.toggleDeleteModal}
            >
              <FaTrash className="user-info__image__delete" />
            </div>
          )}
          {!image && <UserImage onDrop={this.onDrop} loading={loading} />}
          <DeleteImageModal
            modalOpen={deleteModalOpen}
            toggleModal={this.toggleDeleteModal}
            deleteImage={this.onDeleteImage}
          />
        </div>
        {!edit && (
          <div className="user-info__user">
            <div className="user-info__user__text">
              <h1>{name}</h1>
              <p>
                <span>Adresse Email</span>: {email}
              </p>
              <p>
                <span>Numéro de téléphone</span>: +216 {phone}
              </p>
              {bio && (
                <p className="user-info__user__text__bio">
                  <span>Bio</span>: <span>{bio}</span>
                </p>
              )}

              {!bio && (
                <p>
                  <span>Bio</span>:{" "}
                  <span
                    className="user-info__user__text__add-bio"
                    onClick={this.toggleEdit}
                  >
                    Ajouter une bio (optionnel)
                  </span>
                </p>
              )}
            </div>
          </div>
        )}
        {edit && (
          <EditUserForm user={this.props.user} toggleEdit={this.toggleEdit} />
        )}
      </div>
    );
  }
}

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
  setUserImage: PropTypes.func.isRequired,
  deleteUserImage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { setUserImage, deleteUserImage }
)(UserInfo);
