import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getFavorites, clearFavorites } from "../../store/actions/favorites";
import Loader from "../common/Loader";
import AdCard from "../ads/AdCard";
import Pagination from "../ads/Pagination";
import NoAd from "../ads/NoAd";

class FavoritesPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.getNextFavorites();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.page !== this.props.match.params.page) {
      this.getNextFavorites();
    }
  }

  getNextFavorites = () => {
    const skip = this.props.match.params.page * 20 - 20;
    this.props.getFavorites(skip);
  };

  render() {
    const { favorites, loading, count } = this.props.favorites;
    let pageContent;
    if (loading) {
      pageContent = <Loader />;
    } else if (favorites.length > 0) {
      const ads = favorites.map((ad) => (
        <Link key={ad._id} to={`/ad/${ad._id}`}>
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
          <div className="ads-list">{ads}</div>
          <Pagination
            count={count}
            link={"/my-favorites"}
            pageNumber={Number(this.props.match.params.page)}
          />
        </div>
      );
    } else if (favorites.length === 0) {
      pageContent = <NoAd />;
    }
    return (
      <div className="favorites-page">
        <h1 className="favorites-page__title">VOS FAVORIS</h1>
        <div>{pageContent}</div>
      </div>
    );
  }
}

FavoritesPage.propTypes = {
  getFavorites: PropTypes.func.isRequired,
  clearFavorites: PropTypes.func.isRequired,
  favorites: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  favorites: state.favorites
});

export default connect(
  mapStateToProps,
  { getFavorites, clearFavorites }
)(FavoritesPage);
