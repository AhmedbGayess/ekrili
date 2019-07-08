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
        <HomeSearch toggleLoginModal={this.props.toggleLoginModal} />
        <HomeCategories />
        <HomeUsers />
        <HomeProtect />
        <HomeLastAds />
      </div>
    );
  }
}

Home.propTypes = {
  toggleLoginModal: PropTypes.func.isRequired
};

export default Home;
