import React from "react";
import PropTypes from "prop-types";
import HomeSearch from "./HomeSearch";
import HomeCategories from "./HomeCategories";
import HomeUsers from "./HomeUsers";
import HomeProtect from "./HomeProtect";

const Home = ({ toggleSignupModal }) => (
  <div>
    <HomeSearch toggleSignupModal={toggleSignupModal} />
    <HomeUsers />
    <HomeProtect />
    <HomeCategories />
  </div>
);

Home.propTypes = {
  toggleSignupModal: PropTypes.func.isRequired
};

export default Home;
