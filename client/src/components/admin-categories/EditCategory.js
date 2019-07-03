import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
import CategoryForm from "./CategoryForm";
import {
  addCategory,
  editCategory,
  deleteCategory
} from "../../store/actions/categories";
import Loader from "../common/Loader";
import DeleteModal from "../common/DeleteModal";

class EditCategory extends React.Component {
  state = {
    loading: false,
    deleteModalOpen: false,
    category: null,
    image: ""
  };

  componentDidMount() {
    const categoryId = this.props.match.params.id;
    if (categoryId) {
      const category = this.props.categories.find(
        (cat) => cat._id === categoryId
      );
      this.setState({ category, image: category.image });
    }
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
      .delete(`/upload/${this.state.image}`)
      .then(() => this.setState({ image: "" }))
      .catch((err) => console.log(err));
  };

  toggleDeleteModal = () => {
    this.setState((prevProps) => ({
      deleteModalOpen: !prevProps.deleteModalOpen
    }));
  };

  deleteCategory = () => {
    this.props.deleteCategory(this.props.match.params.id);
  };

  render() {
    const categoryId = this.props.match.params.id;
    const { loading, deleteModalOpen, category, image } = this.state;
    let content;
    if (categoryId) {
      if (this.state.category === null) {
        content = <Loader />;
      } else {
        content = (
          <CategoryForm
            image={image}
            onDrop={this.onDrop}
            onSubmit={this.props.editCategory}
            label="Nom de la catégorie"
            deleteImage={this.deleteImage}
            loading={loading}
            categoryName={category.name}
            id={categoryId}
          />
        );
      }
    } else {
      content = (
        <CategoryForm
          image={image}
          onDrop={this.onDrop}
          onSubmit={this.props.addCategory}
          label="Nom de la catégorie"
          deleteImage={this.deleteImage}
          loading={loading}
        />
      );
    }
    return (
      <div className="container">
        <h1 className="my-2 text-center">
          {categoryId ? "MODIFIER CATÉGORIE" : "AJOUTER UNE CATÉGORIE"}
        </h1>
        {content}
        {this.props.match.params.id && (
          <button
            className="btn-secondary ad-delete"
            onClick={this.toggleDeleteModal}
          >
            Supprimer
          </button>
        )}
        <DeleteModal
          modalOpen={deleteModalOpen}
          toggleModal={this.toggleDeleteModal}
          deleteItem={this.deleteCategory}
          item="cette catégorie"
        />
      </div>
    );
  }
}

EditCategory.propTypes = {
  addCategory: PropTypes.func.isRequired,
  editCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  categories: state.categories.categories
});

export default connect(
  mapStateToProps,
  { addCategory, editCategory, deleteCategory }
)(EditCategory);
