import React from "react";
import { withFormik, Form } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { login } from "../../store/actions/auth";
import FormInputField from "../common/FormInputField";
const adminRoute = window.location.pathname.includes("admin") ? true : false;

const Login = ({ errors, touched }) => (
  <Form className="login-form">
    <FormInputField
      name="email"
      type="email"
      label="Email"
      error={errors.email}
      touched={touched.email}
    />
    <FormInputField
      name="password"
      type="password"
      label="Mot de passe"
      error={errors.password}
      touched={touched.password}
    />
    <button type="submit" className="btn-primary">
      Connexion
    </button>
  </Form>
);

const LoginForm = withFormik({
  mapPropsToValues() {
    return {
      email: "",
      password: ""
    };
  },
  validationSchema: Yup.object({
    email: Yup.string()
      .email("Adresse email invalide")
      .required("Vous devez entrer votre adresse email"),
    password: Yup.string()
      .min(7, "Le mot de passe doit être supérieur à 7 caractères")
      .required("Vous devez entrer votre mot de passe")
  }),
  handleSubmit(values, { setSubmitting, props }) {
    props.login(values, adminRoute);
    setSubmitting(false);
  }
})(Login);

export default connect(
  null,
  { login }
)(LoginForm);
