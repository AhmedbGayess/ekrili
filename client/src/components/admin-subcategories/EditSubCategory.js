import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
import {
  addSubCategory,
  getSubCategory,
  editSubCategory,
  deleteSubCategory
} from "../../store/actions/subCategories";
import { getCategories } from "../../store/actions/categories";
import SubCategoryForm from "./SubCategoryForm";
import Loader from "../common/Loader";
import DeleteModal from "../common/DeleteModal";

class EditCategory extends React.Component {
  state = {
    image: "",
    loading: false,
    deleteModalOpen: false
  };

  componentDidMount() {
    this.props.getCategories();

    const subCategoryId = this.props.match.params.id;
    if (subCategoryId) {
      Promise.resolve(this.props.getSubCategory(subCategoryId)).then(() => {
        this.setState({
          image: this.props.subCategories.subCategory.image
        });
      });
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
    const { categories } = this.props.categories;
    const subCategoryId = this.props.match.params.id;
    let content;
    if (subCategoryId) {
      const { loading, subCategory } = this.props.subCategories;

      if (loading || Object.keys(subCategory).length === 0) {
        content = <Loader />;
      } else {
        content = (
          <SubCategoryForm
            image={this.state.image}
            onDrop={this.onDrop}
            onSubmit={this.props.editSubCategory}
            label="Nom de la sous-catégorie"
            deleteImage={this.deleteImage}
            loading={this.state.loading}
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
          image={this.state.image}
          onDrop={this.onDrop}
          onSubmit={this.props.addSubCategory}
          label="Nom de la sous-catégorie"
          deleteImage={this.deleteImage}
          loading={this.state.loading}
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
          modalOpen={this.state.deleteModalOpen}
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
  getSubCategory: PropTypes.func.isRequired,
  deleteSubCategory: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  subCategories: state.subCategories,
  categories: state.categories
});

export default connect(
  mapStateToProps,
  {
    addSubCategory,
    getCategories,
    editSubCategory,
    getSubCategory,
    deleteSubCategory
  }
)(EditCategory);
