import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";

class MobileSidebar extends React.Component {
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.close();
    }
  };

  login = () => {
    const { toggleLoginModal, close } = this.props;
    close();
    toggleLoginModal();
  };

  signup = () => {
    const { toggleSignupModal, close } = this.props;
    close();
    toggleSignupModal();
  };

  render() {
    const { open, openMobileCategories, close, isAuthenticated } = this.props;
    return (
      <nav
        ref={this.setWrapperRef}
        className={classNames("mobile-sidebar", {
          "mobile-sidebar__open": open
        })}
      >
        <ul>
          <li>
            <Link
              to="/browse-ads/1"
              className="mobile-sidebar__link"
              onClick={close}
            >
              Toutes les catégories
            </Link>
          </li>
          <li>
            <p
              className="mobile-sidebar__link mobile-sidebar__link-category"
              onClick={openMobileCategories}
            >
              <span>Les Catégories</span>
              <span className="mobile-sidebar__link mobile-sidebar__link-category-plus">
                +
              </span>
            </p>
          </li>
          <li>
            <Link to="/how-it-works" className="mobile-sidebar__link">
              Comment ça marche?
            </Link>
          </li>
          <li>
            <Link to="/about-us" className="mobile-sidebar__link">
              Qui sommes nous?
            </Link>
          </li>
          <li>
            <Link to="/contact" className="mobile-sidebar__link">
              Nous contacter
            </Link>
          </li>
          {!isAuthenticated && (
            <li>
              <button
                className="btn-primary mobile-sidebar__button"
                onClick={this.login}
              >
                Se connecter
              </button>
            </li>
          )}
          {!isAuthenticated && (
            <li>
              <button
                className="btn-primary mobile-sidebar__button"
                onClick={this.signup}
              >
                S'inscrire
              </button>
            </li>
          )}
          {isAuthenticated && (
            <li>
              <Link
                to="/create-ad"
                className="btn-primary mobile-sidebar__button"
                onClick={close}
              >
                Ajouter une annonce
              </Link>
            </li>
          )}
        </ul>
      </nav>
    );
  }
}

MobileSidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  openMobileCategories: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(MobileSidebar);
