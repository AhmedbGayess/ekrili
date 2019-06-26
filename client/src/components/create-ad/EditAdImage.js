import React from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import PropTypes from "prop-types";
import Dropzone from "../common/Dropzone";

class EditAdImage extends React.Component {
  state = {
    loading: false
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
      if (this.props.id) {
        await axios.post(`/ads/image/${this.props.id}`, { image: data.image });
      }
      this.props.addImage(data.image, this.props.stateImage);
    } catch (e) {
      this.setState({
        loading: false
      });
      alert("Upload Error");
    }
  };

  deleteImage = async () => {
    try {
      const { id, image } = this.props;
      if (id) {
        await axios.delete(`/ads/image/${id}?image=${image}`);
      }
      await axios.delete(`/upload/${this.props.image}`);
      this.setState({ image: "" });
      this.props.removeImage(this.props.stateImage);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { loading } = this.state;
    return (
      <div>
        {!this.props.image && (
          <Dropzone onDrop={this.onDrop} loading={loading} />
        )}
        {this.props.image && (
          <div className="image-preview">
            <div className="image-preview-close">
              <FaTrash
                className="image-preview-close-icon"
                onClick={this.deleteImage}
              />
              <p>Supprimer</p>
            </div>
            <img src={`/images/${this.props.image}`} alt="" />
          </div>
        )}
      </div>
    );
  }
}

EditAdImage.propTypes = {
  addImage: PropTypes.func.isRequired,
  removeImage: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  stateImage: PropTypes.string.isRequired
};

export default EditAdImage;
