import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
import CategoryForm from "./CategoryForm";
import { addCategory } from "../../store/actions/categories";

class EditCategory extends React.Component {
  state = {
    image: "",
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
        image: data.image,
        loading: false
      });
      console.log(data.image);
    } catch (e) {
      this.setState({
        loading: false
      });
      alert("Upload Error");
    }
  };

  deleteImage = () => {
    axios
      .delete(`/upload/${this.state.thumbnail}`)
      .then(() => this.setState({ image: "" }))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="container">
        <h1 className="my-2 text-center">AJOUTER UNE CATÉGORIE</h1>
        <CategoryForm
          image={this.state.image}
          onDrop={this.onDrop}
          onSubmit={this.props.addCategory}
          label="Nom de la catégorie"
          deleteImage={this.deleteImage}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

EditCategory.propTypes = {
  addCategory: PropTypes.func
};

export default connect(
  null,
  { addCategory }
)(EditCategory);
