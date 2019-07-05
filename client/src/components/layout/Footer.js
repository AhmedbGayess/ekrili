import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Footer = ({ isAuthenticated, toggleLoginModal, toggleSignupModal }) => (
  <footer className="footer">
    <div className="footer__sections">
      <div className="footer__section">
        <p className="footer__section__title">À propos</p>
        <ul className="footer__section__list">
          <li>
            <Link to="/" className="footer__section__list__link">
              Comment ça marche
            </Link>
          </li>
          <li>
            <Link to="/" className="footer__section__list__link">
              Conditions d'utilisation
            </Link>
          </li>
          <li>
            <Link to="/" className="footer__section__list__link">
              Qui sommes-nous?
            </Link>
          </li>
          <li>
            <Link to="/contact" className="footer__section__list__link">
              Nous contacter
            </Link>
          </li>
        </ul>
      </div>
      <div className="footer__section">
        <p className="footer__section__title">Accès rapide</p>
        <ul className="footer__section__list">
          <li>
            <Link to="/" className="footer__section__list__link">
              Accueil
            </Link>
          </li>
          <li>
            <Link
              to="/browse-ads/1?sortBy=updatedAt:desc"
              className="footer__section__list__link"
            >
              Toutes les catégories
            </Link>
          </li>
          {!isAuthenticated && (
            <li>
              <p
                className="footer__section__list__link"
                onClick={toggleLoginModal}
              >
                Se connecter
              </p>
            </li>
          )}
          {!isAuthenticated && (
            <li>
              <p
                className="footer__section__list__link"
                onClick={toggleSignupModal}
              >
                Inscription
              </p>
            </li>
          )}
        </ul>
      </div>
      <div className="footer__section">
        <p className="footer__section__title">Contact</p>
        <a
          className="footer__section__list__link"
          href="mailto:contact@ekriha.com"
        >
          contact@ekriha.com
        </a>
      </div>
    </div>
    <p className="footer__copyright">
      © Ekriha.com - Créé par{" "}
      <a
        href="https://www.ahmedbengayess.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Ahmed Ben Gayess
      </a>
    </p>
  </footer>
);

Footer.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  toggleLoginModal: PropTypes.func.isRequired,
  toggleSignupModal: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Footer);
