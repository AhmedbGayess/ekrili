import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

const NotFoundPage = ({
  loginModalOpen,
  signupModalOpen,
  toggleLoginModal,
  toggleSignupModal,
  switchToSignup,
  switchToLogin,
  location,
  openSidebar,
  sidebarOpen,
  openMobileSidebar,
  mobileOpen,
  mobileCategoriesOpen,
  mobileSubCategoriesOpen
}) => (
  <div>
    <Navbar
      loginModalOpen={loginModalOpen}
      signupModalOpen={signupModalOpen}
      toggleLoginModal={toggleLoginModal}
      toggleSignupModal={toggleSignupModal}
      switchToSignup={switchToSignup}
      switchToLogin={switchToLogin}
      location={location}
      openSidebar={openSidebar}
      sidebarOpen={sidebarOpen}
      openMobileSidebar={openMobileSidebar}
      mobileOpen={mobileOpen}
      mobileCategoriesOpen={mobileCategoriesOpen}
      mobileSubCategoriesOpen={mobileSubCategoriesOpen}
    />
    <div className="not-found">
      <div className="container">
        <h1 className="not-found__title">Oups! 404</h1>
        <h3 className="not-found__text">
          Désolés, mais cette page n'existe pas
        </h3>
        <Link to="/" className="btn-primary">
          Retourner à la page d'accueil
        </Link>
      </div>
    </div>
    <Footer
      toggleLoginModal={toggleLoginModal}
      toggleSignupModal={toggleSignupModal}
    />
  </div>
);

export default NotFoundPage;
