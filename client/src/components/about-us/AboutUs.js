import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

const AboutUs = ({ isAuthenticated, toggleLoginModal }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="about">
      <Helmet>
        <title>Ekriha.com | Qui sommes nous?</title>
      </Helmet>
      <div className="container">
        <h1 className="about__title">Qui sommes nous?</h1>
        <p className="about__text">
          La vraie question est qui suis-je? Mon nom est Ahmed Ben Gayess et je
          suis un développeur web. J'ai créé ce petit site pour essayer de
          faciliter un peu le quotidien des Tunisien; Plus besoin de tout
          acheter, si vous avez besoin de quelque chose pour une courte durée ou
          si vous n'avez pas les moyens de l'acheter, vous pouvez la louer pour
          une fraction de son prix, l'utiliser et la retourner à son
          propriétaire. Ce site peux aussi aider n'importe qui à gagner un peu
          d'argent, sans effort, en offrant à louer des objets qu'il possède
          déja et qu'il utilise occasionnellement ou pas du tout.
          <br />
          <br />
          Ce site peux aussi être utile aux professionnels, et peut leur
          permettre d'atteindre plus de gens et les aider à booster leur
          business. Quelque soit que vous avez à louer, cette platforme est
          idéale pour vous.
          <br />
          <br />
          Cette idée existe partout dans le monde, et a été adoptée rapidement
          vu son utilité. Adoptez vous aussi ce concept et commencez à louer dès
          aujourd'hui sur Ekriha.com!
        </p>
        {!isAuthenticated && (
          <button
            className="btn-primary about__button"
            onClick={toggleLoginModal}
          >
            Publier une annonce
          </button>
        )}
        {isAuthenticated && (
          <Link to="/create-ad" className="btn-primary about__button">
            Publier une annonce
          </Link>
        )}
      </div>
    </div>
  );
};

AboutUs.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  toggleLoginModal: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(AboutUs);
