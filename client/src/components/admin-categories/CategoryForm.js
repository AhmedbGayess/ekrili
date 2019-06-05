import React from "react";
import { withFormik, Form } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import FormInputField from "../common/FormInputField";
import ImageZone from "../common/Dropzone";
import CategoryImagePreview from "./CategoryImagePreview";

const CategoryInputs = ({
  errors,
  touched,
  onDrop,
  label,
  image,
  deleteImage,
  loading
}) => (
  <Form>
    <FormInputField
      name="name"
      type="text"
      label={label}
      error={errors.name}
      touched={touched.name}
    />
    {image ? (
      <CategoryImagePreview image={image} deleteImage={deleteImage} />
    ) : (
      <div className="my-3">
        <ImageZone onDrop={onDrop} loading={loading} />
        <small>Choisir une image est nécessaire pour continuer</small>
      </div>
    )}
    <button
      type="submit"
      className="btn-primary"
      disabled={errors.name || !image}
    >
      Ajouter
    </button>
  </Form>
);

CategoryInputs.propTypes = {
  onDrop: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};

const CategoryForm = withFormik({
  mapPropsToValues() {
    return {
      name: ""
    };
  },
  validationSchema: Yup.object({
    name: Yup.string().required("Ce champ est obligatoire")
  }),
  handleSubmit(values, { props }) {
    props.onSubmit({
      name: values.name,
      image: props.image
    });
  }
})(CategoryInputs);

export default CategoryForm;
