import React from "react";
import PropTypes from "prop-types";
import HomeSearch from "./HomeSearch";
import HomeCategories from "./HomeCategories";
import HomeUsers from "./HomeUsers";
import HomeProtect from "./HomeProtect";
import HomeLastAds from "./HomeLastAds";

const Home = ({ toggleSignupModal }) => (
  <div>
    <HomeSearch toggleSignupModal={toggleSignupModal} />
    <HomeCategories />
    <HomeUsers />
    <HomeProtect />
    <HomeLastAds />
  </div>
);

Home.propTypes = {
  toggleSignupModal: PropTypes.func.isRequired
};

export default Home;
