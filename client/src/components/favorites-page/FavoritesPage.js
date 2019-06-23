import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getFavorites, clearFavorites } from "../../store/actions/favorites";
import Loader from "../common/Loader";
import AdCard from "../ads/AdCard";

class FavoritesPage extends React.Component {
  state = {
    skip: 0
  };

  componentDidMount() {
    this.getNextFavorites();
  }

  componentWillUnmount() {
    this.props.clearFavorites();
  }

  getNextFavorites = () => {
    this.props.getFavorites(this.state.skip);
    this.setState((prevState) => ({
      skip: prevState.skip + 5
    }));
  };

  render() {
    const { favorites, loading, more } = this.props.favorites;
    let pageContent;
    if (loading) {
      pageContent = <Loader />;
    } else if (favorites.length > 0) {
      pageContent = favorites.map((ad) => (
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
    }
    return (
      <div className="favorites-page">
        <h1 className="favorites-page__title">VOS FAVORIS</h1>
        <div className="ads-list">{pageContent}</div>
        {more && (
          <button
            className="favorites-page__more btn-primary"
            onClick={this.getNextFavorites}
          >
            Afficher Plus
          </button>
        )}
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
