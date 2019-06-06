import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
import { addSubCategory } from "../../store/actions/subCategories";
import { getCategories } from "../../store/actions/categories";
import SubCategoryForm from "./SubCategoryForm";

class EditCategory extends React.Component {
  state = {
    image: "",
    loading: false
  };

  componentDidMount() {
    this.props.getCategories();
  }

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
    const { categories } = this.props.categories;
    return (
      <div className="container">
        <h1 className="my-2 text-center">AJOUTER UNE SOUS-CATÉGORIE</h1>
        <SubCategoryForm
          image={this.state.image}
          onDrop={this.onDrop}
          onSubmit={this.props.addSubCategory}
          label="Nom de la sous-catégorie"
          deleteImage={this.deleteImage}
          loading={this.state.loading}
          categories={categories}
        />
      </div>
    );
  }
}

EditCategory.propTypes = {
  addSubCategory: PropTypes.func,
  getCategories: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  categories: state.categories
});

export default connect(
  mapStateToProps,
  { addSubCategory, getCategories }
)(EditCategory);
