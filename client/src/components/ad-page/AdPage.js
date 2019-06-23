import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { getAd } from "../../store/actions/ads";
import { checkIfFavorite, addToFavorites } from "../../store/actions/favorites";
import Loader from "../common/Loader";
import AdImages from "./AdImages";
import AdPrice from "./AdPrice";
import AdDescription from "./AdDescription";
import AdPath from "./AdPath";
import AdContact from "./AdContact";

class AdPage extends React.Component {
  componentDidMount() {
    this.props.getAd(this.props.match.params.id);
    this.props.checkIfFavorite(this.props.match.params.id);
  }

  addToFavorites = () => {
    this.props.addToFavorites(this.props.match.params.id);
  };

  render() {
    const { ad, loading } = this.props.ads;
    const { favorite, isAuthenticated } = this.props;
    let pageContent;
    if (ad === null || loading) {
      pageContent = <Loader />;
    } else if (Object.keys(ad).length > 0) {
      pageContent = (
        <div className="container my-2">
          <AdPath category={ad.category} subCategory={ad.subCategory} />
          <div className="ad">
            <AdImages
              images={ad.images}
              favorite={favorite}
              isAuthenticated={isAuthenticated}
              addToFavorites={this.addToFavorites}
            />
            <h1 className="ad-title">{ad.title}</h1>
            <div className="ad-info">
              <AdPrice ad={ad} />
              <AdContact ad={ad} />
            </div>
            <AdDescription description={ad.description} />
          </div>
        </div>
      );
    }
    return <div>{pageContent}</div>;
  }
}

AdPage.propTypes = {
  ads: PropTypes.object.isRequired,
  getAd: PropTypes.func.isRequired,
  checkIfFavorite: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  favorite: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  ads: state.ads,
  favorite: state.favorites.inFavorites,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getAd, checkIfFavorite, addToFavorites }
)(AdPage);
