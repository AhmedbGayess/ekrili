import React from "react";
import PropTypes from "prop-types";
import HomeSearch from "./HomeSearch";

const Home = ({ toggleSignupModal }) => (
  <div>
    <HomeSearch toggleSignupModal={toggleSignupModal} />
    <div className="container">
      <p>hi</p>
    </div>
  </div>
);

Home.propTypes = {
  toggleSignupModal: PropTypes.func.isRequired
};

export default Home;
