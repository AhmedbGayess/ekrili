import React from "react";
import PropTypes from "prop-types";
import HomeSearch from "./HomeSearch";
import HomeCategories from "./HomeCategories";
import HomeUsers from "./HomeUsers";
import HomeProtect from "./HomeProtect";
import HomeLastAds from "./HomeLastAds";

class Home extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <HomeSearch toggleSignupModal={this.props.toggleSignupModal} />
        <HomeCategories />
        <HomeUsers />
        <HomeProtect />
        <HomeLastAds />
      </div>
    );
  }
}

Home.propTypes = {
  toggleSignupModal: PropTypes.func.isRequired
};

export default Home;
