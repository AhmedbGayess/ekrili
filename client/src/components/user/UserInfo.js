import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";
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
        {image && (
          <div
            className="user-info__image"
            style={{ backgroundImage: `url("/images/${image}")` }}
          >
            <FaTrash
              className="user-info__image__delete"
              onClick={this.toggleDeleteModal}
            />
          </div>
        )}
        {!image && <UserImage onDrop={this.onDrop} loading={loading} />}
        <DeleteImageModal
          modalOpen={deleteModalOpen}
          toggleModal={this.toggleDeleteModal}
          deleteImage={this.onDeleteImage}
        />
        <p>Nom: {name}</p>
        <p>Adresse Email: {email}</p>
        <p>Numéro de téléphone: {phone}</p>
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
