import React from "react";
import PropTypes from "prop-types";
import HomeSearch from "./HomeSearch";
import HomeCategories from "./HomeCategories";

const Home = ({ toggleSignupModal }) => (
  <div>
    <HomeSearch toggleSignupModal={toggleSignupModal} />
    <HomeCategories />
  </div>
);

Home.propTypes = {
  toggleSignupModal: PropTypes.func.isRequired
};

export default Home;
