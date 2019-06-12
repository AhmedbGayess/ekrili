import React from "react";
import { withFormik, Form } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../store/actions/auth";
import FormInputField from "../common/FormInputField";
import { history } from "../../router/AppRouter";
const adminRoute = window.location.pathname.includes("admin") ? true : false;

const Login = ({ errors, touched, loginError }) => (
  <Form className="auth-form">
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
    <p className="auth-form__error">{loginError}</p>
  </Form>
);

Login.propTypes = {
  login: PropTypes.func.isRequired,
  loginError: PropTypes.string.isRequired,
  closeModal: PropTypes.func
};

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
  async handleSubmit(values, { props }) {
    const success = await props.login(values);
    if (success && adminRoute) {
      history.push("/admin");
    } else if (!adminRoute && success) {
      props.closeModal();
    }
  }
})(Login);

const mapStateProps = (state) => ({
  loginError: state.auth.loginError
});

export default connect(
  mapStateProps,
  { login }
)(LoginForm);
