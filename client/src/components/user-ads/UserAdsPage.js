import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { getOwnAds } from "../../store/actions/ads";
import Loader from "../common/Loader";
import AdCard from "../ads/AdCard";
import Pagination from "../ads/Pagination";
import NoAd from "../ads/NoAd";

class UserAdsPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.nextAds();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.page !== this.props.match.params.page) {
      this.nextAds();
    }
  }

  nextAds = () => {
    const skip = this.props.match.params.page * 20 - 20;
    this.props.getOwnAds(20, skip);
  };

  render() {
    const { ads, loading, count } = this.props.ads;
    let pageContent;

    if (loading || ads === null) {
      pageContent = <Loader />;
    } else if (ads.length > 0) {
      const fetchedAds = ads.map((ad) => (
        <Link key={ad._id} to={`/edit-ad/${ad._id}`}>
          <AdCard
            title={ad.title}
            price={ad.price}
            governorate={ad.governorate}
            delegation={ad.delegation}
            image={ad.images[0]}
          />
        </Link>
      ));
      pageContent = (
        <div>
          <div className="ads-list">{fetchedAds}</div>
          <Pagination
            count={count}
            link={"/my-ads"}
            pageNumber={Number(this.props.match.params.page)}
          />
        </div>
      );
    } else if (ads.length === 0) {
      pageContent = <NoAd />;
    }
    return (
      <div className="favorites-page">
        <Helmet>
          <title>Ekriha.com | Vos annonces</title>
        </Helmet>
        <h1 className="favorites-page__title">VOS ANNONCES</h1>
        <div>{pageContent}</div>
      </div>
    );
  }
}

UserAdsPage.propTypes = {
  getOwnAds: PropTypes.func.isRequired,
  ads: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  ads: state.ads
});

export default connect(
  mapStateToProps,
  { getOwnAds }
)(UserAdsPage);
