import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAds } from "../../store/actions/ads";
import AdCard from "../ads/AdCard";

class HomeLastAds extends React.Component {
  componentDidMount() {
    this.props.getAds("?limit=4");
  }

  render() {
    const { ads, loading } = this.props.ads;
    let content;
    if (loading || ads === null) {
      content = "";
    } else if (ads.length > 0) {
      const adsList = ads.map((ad) => (
        <AdCard
          key={ad._id}
          title={ad.title}
          price={ad.price}
          governorate={ad.governorate}
          delegation={ad.delegation}
          image={ad.images[0]}
        />
      ));
      content = (
        <div className="home-ads">
          <h1 className="home-ads__title">Les dernières annonces</h1>
          <div className="home-ads__list">{adsList}</div>
        </div>
      );
    }
    return content;
  }
}

HomeLastAds.propTypes = {
  getAds: PropTypes.func.isRequired,
  ads: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  ads: state.ads
});

export default connect(
  mapStateToProps,
  { getAds }
)(HomeLastAds);
