import React from "react";
import { connect } from "react-redux";
import { withFormik, Form } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { updateUserInfo } from "../../store/actions/auth";
import FormInputField from "../common/FormInputField";

const EditUser = ({ errors, touched, error }) => (
  <Form className="auth-form">
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
      placeholder="Laissez vide pour garder votre mot de passe actuel"
    />
    <button type="submit" className="btn-primary">
      Modifier
    </button>
    <p className="auth-form__error">{error}</p>
  </Form>
);

EditUser.propTypes = {
  user: PropTypes.object.isRequired
};

const EditUserForm = withFormik({
  mapPropsToValues({ user }) {
    return {
      email: user.email,
      phone: user.phone,
      password: ""
    };
  },
  validationSchema: Yup.object({
    email: Yup.string()
      .email("Veuillez entrer une adresse e-mail valide")
      .required("Ce champ est obligatoire"),
    phone: Yup.string()
      .matches(
        /^(\+?216)?[2459]\d{7}$/,
        "Veuillez entrer un numéro de téléphone valide"
      )
      .required("Ce champ est obligatoire"),
    password: Yup.string().min(
      7,
      "Le mot de passe doit être composé de 7 caractères au minimum"
    )
  }),
  async handleSubmit(values, { props }) {
    const success = await props.updateUserInfo(values);
    if (success) {
      props.toggleEdit();
    }
  }
})(EditUser);

const mapStateToProps = (state) => ({
  error: state.auth.signupError
});

export default connect(
  mapStateToProps,
  { updateUserInfo }
)(EditUserForm);
