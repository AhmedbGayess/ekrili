import React from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import PropTypes from "prop-types";
import Dropzone from "../common/Dropzone";

class CreateAdImage extends React.Component {
  state = {
    loading: false,
    image: ""
  };

  onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    this.setState({
      loading: true,
      image: ""
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
        loading: false,
        image: data.image
      });
      this.props.addImage(data.image);
    } catch (e) {
      this.setState({
        loading: false
      });
      alert("Upload Error");
    }
  };

  deleteImage = () => {
    axios
      .delete(`/upload/${this.state.image}`)
      .then(({ data }) => {
        this.setState({ image: "" });
        this.props.removeImage(data.image);
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { loading, image } = this.state;
    return (
      <div>
        {!image && <Dropzone onDrop={this.onDrop} loading={loading} />}
        {image && (
          <div className="image-preview">
            <div className="image-preview-close">
              <FaTrash
                className="image-preview-close-icon"
                onClick={this.deleteImage}
              />
              <p>Supprimer</p>
            </div>
            <img src={`/images/${image}`} alt="" />
          </div>
        )}
      </div>
    );
  }
}

CreateAdImage.propTypes = {
  addImage: PropTypes.func.isRequired,
  removeImage: PropTypes.func.isRequired
};

export default CreateAdImage;
