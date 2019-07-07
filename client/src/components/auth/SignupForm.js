import React from "react";
import { withFormik, Form } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import FormInputField from "../common/FormInputField";

const SignupFields = ({ errors, touched, error }) => (
  <Form className="auth-form">
    <FormInputField
      name="name"
      type="text"
      label="Prénom et nom"
      error={errors.name}
      touched={touched.name}
    />
    <FormInputField
      name="email"
      type="email"
      label="Adresse e-mail"
      error={errors.email}
      touched={touched.email}
    />
    <FormInputField
      name="phone"
      type="text"
      label="Numéro de téléphone"
      error={errors.phone}
      touched={touched.phone}
    />
    <FormInputField
      name="password"
      type="password"
      label="Mot de passe"
      error={errors.password}
      touched={touched.password}
    />
    <button type="submit" className="btn-primary">
      Inscription
    </button>
    <p className="auth-form__error">{error}</p>
  </Form>
);

SignupFields.propTypes = {
  registerUser: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};

const SignupForm = withFormik({
  mapPropsToValues() {
    return {
      name: "",
      email: "",
      phone: "",
      password: ""
    };
  },
  validationSchema: Yup.object({
    name: Yup.string()
      .min(3, "Le nom doit comporter au moins 3 caractères")
      .required("Ce champ est obligatoire"),
    email: Yup.string()
      .email("Veuillez entrer une adresse e-mail valide")
      .required("Ce champ est obligatoire"),
    phone: Yup.string()
      .matches(
        /^(\+?216)?[2459]\d{7}$/,
        "Veuillez entrer un numéro de téléphone valide"
      )
      .required("Ce champ est obligatoire"),
    password: Yup.string()
      .min(7, "Le mot de passe doit être composé de 7 caractères au minimum")
      .required("Ce champ est obligatoire")
  }),
  async handleSubmit(values, { props }) {
    const success = await props.registerUser(values);
    if (success) {
      props.toggleModal();
    }
  }
})(SignupFields);

export default SignupForm;
