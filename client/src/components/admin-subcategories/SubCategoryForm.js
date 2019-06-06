import React from "react";
import { withFormik, Form } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import FormInputField from "../common/FormInputField";
import ImageZone from "../common/Dropzone";
import CategoryImagePreview from "../admin-categories/CategoryImagePreview";
import FormInputSelect from "../common/FormInputSelect";

const SubCategoryInputs = ({
  errors,
  touched,
  onDrop,
  label,
  image,
  deleteImage,
  loading,
  categories
}) => (
  <Form>
    <FormInputField
      name="name"
      type="text"
      label={label}
      error={errors.name}
      touched={touched.name}
    />
    <FormInputSelect
      name="category"
      error={errors.category}
      label="Catégorie"
      touched={touched.category}
      choices={categories}
    />
    {image ? (
      <CategoryImagePreview image={image} deleteImage={deleteImage} />
    ) : (
      <div className="my-3">
        <ImageZone onDrop={onDrop} loading={loading} />
        <small>Choisir une image est nécessaire pour continuer</small>
      </div>
    )}
    <div className="text-center">
      <button
        type="submit"
        className="btn-primary"
        disabled={errors.name || errors.category || !image}
      >
        Ajouter
      </button>
    </div>
  </Form>
);

SubCategoryInputs.propTypes = {
  onDrop: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired
};

const SubCategoryForm = withFormik({
  mapPropsToValues() {
    return {
      name: "",
      category: ""
    };
  },
  validationSchema: Yup.object({
    name: Yup.string().required("Ce champ est obligatoire"),
    category: Yup.string().required("Veuillez choisir une option")
  }),
  handleSubmit(values, { props }) {
    props.onSubmit({
      name: values.name,
      category: values.category,
      image: props.image
    });
  }
})(SubCategoryInputs);

export default SubCategoryForm;
