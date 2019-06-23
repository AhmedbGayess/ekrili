import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { setUserImage, deleteUserImage } from "../../store/actions/auth";
import UserImage from "./UserImage";
import DeleteImageModal from "./DeleteImageModal";

class UserInfo extends React.Component {
  state = {
    loading: false,
    deleteModalOpen: false
  };

  toggleDeleteModal = () => {
    this.setState((prevProps) => ({
      deleteModalOpen: !prevProps.deleteModalOpen
    }));
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
    const { name, email, phone, image } = this.props.user;
    const { loading, deleteModalOpen } = this.state;
    return (
      <div className="user-info">
        <Link to="/edit-user" className="user-info__edit">
          <MdEdit className="user-info__edit__icon" />
        </Link>
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
          <h3 className="my-2">Photo de profil</h3>
        </div>
        <div className="user-info__user">
          <h3 className="user-info__user__title">Vos informations</h3>
          <div className="user-info__user__text">
            <p>Nom: {name}</p>
            <p>Adresse Email: {email}</p>
            <p>Numéro de téléphone: {phone}</p>
          </div>
        </div>
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
