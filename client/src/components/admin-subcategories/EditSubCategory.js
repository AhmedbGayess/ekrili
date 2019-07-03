import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
import {
  addSubCategory,
  editSubCategory,
  deleteSubCategory
} from "../../store/actions/subCategories";
import { getCategories } from "../../store/actions/categories";
import SubCategoryForm from "./SubCategoryForm";
import Loader from "../common/Loader";
import DeleteModal from "../common/DeleteModal";

class EditCategory extends React.Component {
  state = {
    loading: false,
    deleteModalOpen: false,
    subCategory: null,
    image: ""
  };

  componentDidMount() {
    const subCategoryId = this.props.match.params.id;
    if (subCategoryId) {
      const subCategory = this.props.subCategories.find(
        (sub) => sub._id === subCategoryId
      );
      this.setState({ subCategory, image: subCategory.image });
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

  deleteSubCategory = () => {
    this.props.deleteSubCategory(this.props.match.params.id);
  };

  render() {
    const { categories } = this.props;
    const subCategoryId = this.props.match.params.id;
    const { subCategory, loading, deleteModalOpen, image } = this.state;
    let content;
    if (subCategoryId) {
      if (this.state.subCategory === null) {
        content = <Loader />;
      } else {
        content = (
          <SubCategoryForm
            image={image}
            onDrop={this.onDrop}
            onSubmit={this.props.editSubCategory}
            label="Nom de la sous-catégorie"
            deleteImage={this.deleteImage}
            loading={loading}
            categories={categories}
            subCategoryName={subCategory.name}
            category={subCategory.category}
            id={subCategory._id}
          />
        );
      }
    } else {
      content = (
        <SubCategoryForm
          image={image}
          onDrop={this.onDrop}
          onSubmit={this.props.addSubCategory}
          label="Nom de la sous-catégorie"
          deleteImage={this.deleteImage}
          loading={loading}
          categories={categories}
        />
      );
    }
    return (
      <div className="container">
        <h1 className="my-2 text-center">AJOUTER UNE SOUS-CATÉGORIE</h1>
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
          deleteItem={this.deleteSubCategory}
          item="cette sous-catégorie"
        />
      </div>
    );
  }
}

EditCategory.propTypes = {
  addSubCategory: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  editSubCategory: PropTypes.func.isRequired,
  deleteSubCategory: PropTypes.func.isRequired,
  subCategories: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  subCategories: state.subCategories.subCategories,
  categories: state.categories.categories
});

export default connect(
  mapStateToProps,
  {
    addSubCategory,
    getCategories,
    editSubCategory,
    deleteSubCategory
  }
)(EditCategory);
