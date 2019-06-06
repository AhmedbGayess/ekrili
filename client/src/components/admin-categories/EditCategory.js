import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
import CategoryForm from "./CategoryForm";
import {
  addCategory,
  getCategory,
  editCategory,
  clearCategory
} from "../../store/actions/categories";
import Loader from "../common/Loader";

class EditCategory extends React.Component {
  state = {
    image: "",
    loading: false
  };

  componentDidMount() {
    const categoryId = this.props.match.params.id;
    if (categoryId) {
      Promise.resolve(this.props.getCategory(categoryId)).then(() => {
        this.setState({
          image: this.props.categories.category.image
        });
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params !== prevProps.match.params) {
      window.location.reload();
    }
  }

  componentWillUnmount() {
    this.props.clearCategory();
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
    const categoryId = this.props.match.params.id;
    let content;
    if (categoryId) {
      const { loading, category } = this.props.categories;

      if (loading || Object.keys(category).length === 0) {
        content = <Loader />;
      } else {
        content = (
          <CategoryForm
            image={this.state.image}
            onDrop={this.onDrop}
            onSubmit={this.props.editCategory}
            label="Nom de la catégorie"
            deleteImage={this.deleteImage}
            loading={this.state.loading}
            categoryName={category.name}
            id={categoryId}
          />
        );
      }
    } else {
      content = (
        <CategoryForm
          image={this.state.image}
          onDrop={this.onDrop}
          onSubmit={this.props.addCategory}
          label="Nom de la catégorie"
          deleteImage={this.deleteImage}
          loading={this.state.loading}
        />
      );
    }
    return (
      <div className="container">
        <h1 className="my-2 text-center">
          {categoryId ? "MODIFIER CATÉGORIE" : "AJOUTER UNE CATÉGORIE"}
        </h1>
        {content}
      </div>
    );
  }
}

EditCategory.propTypes = {
  addCategory: PropTypes.func.isRequired,
  getCategory: PropTypes.func.isRequired,
  editCategory: PropTypes.func.isRequired,
  clearCategory: PropTypes.func.isRequired,
  categories: PropTypes.shape({}).isRequired
};

const mapStateToProps = (state) => ({
  categories: state.categories
});

export default connect(
  mapStateToProps,
  { addCategory, getCategory, editCategory, clearCategory }
)(EditCategory);
