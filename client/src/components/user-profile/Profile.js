import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getUser } from "../../store/actions/users";
import { getUserAds } from "../../store/actions/ads";
import Loader from "../common/Loader";
import AdsList from "../ads/AdsList";
import Pagination from "../ads/Pagination";
import ProfileInfo from "./ProfieInfo";
import NoAd from "../ads/NoAd";

class Profile extends React.Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
    this.nextAds();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.page !== this.props.match.params.page) {
      this.nextAds();
    }
  }

  nextAds = () => {
    const id = this.props.match.params.id;
    const skip = this.props.match.params.page * 20 - 20;
    this.props.getUserAds(id, 20, skip);
  };

  render() {
    const { ads, users } = this.props;
    const { ads: userAds, loading: adsLoading, count } = ads;
    const { user, loading: userLoading } = users;

    let userContent;
    if (userLoading) {
      userContent = "";
    } else if (!user) {
      userContent = (
        <div className="no-ad">
          <h3 className="no-ad__message">Cet utilisateur n'existe pas.</h3>
          <Link to="/" className="no-ad__link">
            Retourner à la page d'acceuil
          </Link>
        </div>
      );
    } else {
      userContent = <ProfileInfo user={user} />;
    }

    let adsContent;
    if (adsLoading || userAds === null) {
      adsContent = <Loader />;
    } else if (userAds.length === 0) {
      adsContent = <NoAd />;
    } else if (userAds.length > 0 && user) {
      adsContent = (
        <div>
          <h2 className="profile-info__title">Les annonces de {user.name}</h2>
          <AdsList ads={userAds} />
          {count > 20 && (
            <Pagination
              count={count}
              search={this.props.location.search}
              pageNumber={Number(this.props.match.params.page)}
              link={`/user/${this.props.match.params.id}`}
            />
          )}
        </div>
      );
    }

    if (!user && !userLoading) {
      adsContent = "";
    }
    return (
      <div>
        <div className="container">{userContent}</div>
        {adsContent}
      </div>
    );
  }
}

Profile.propTypes = {
  users: PropTypes.object.isRequired,
  ads: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  getUserAds: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  users: state.users,
  ads: state.ads
});

export default connect(
  mapStateToProps,
  { getUser, getUserAds }
)(Profile);
