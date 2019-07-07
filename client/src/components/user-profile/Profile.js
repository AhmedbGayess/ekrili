import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { getUser, deleteUser } from "../../store/actions/users";
import { getUserAds } from "../../store/actions/ads";
import Loader from "../common/Loader";
import AdsList from "../ads/AdsList";
import Pagination from "../ads/Pagination";
import ProfileInfo from "./ProfieInfo";
import NoAd from "../ads/NoAd";
import DeleteModal from "../common/DeleteModal";

class Profile extends React.Component {
  state = {
    deleteModalOpen: false
  };

  componentDidMount() {
    window.scrollTo(0, 0);
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

  toggleDeleteModal = () => {
    this.setState((prevProps) => ({
      deleteModalOpen: !prevProps.deleteModalOpen
    }));
  };

  deleteUser = () => {
    this.props.deleteUser(this.props.match.params.id);
  };

  render() {
    const { ads, users, admin } = this.props;
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
      userContent = (
        <div>
          <Helmet>
            <title>Ekriha.com | Profil de {user.name}</title>
          </Helmet>
          {admin && this.props.match.path.includes("admin") && (
            <div className="profile-info__delete">
              <button
                className="profile-info__delete__button btn-secondary"
                onClick={this.toggleDeleteModal}
              >
                Supprimer utilisateur
              </button>
              <DeleteModal
                modalOpen={this.state.deleteModalOpen}
                toggleModal={this.toggleDeleteModal}
                deleteItem={this.deleteUser}
                item="cet utliisateur"
              />
            </div>
          )}
          <ProfileInfo user={user} />
        </div>
      );
    }

    let adsContent;
    if (adsLoading || userAds === null) {
      adsContent = <Loader />;
    } else if (userAds.length === 0) {
      adsContent = <NoAd />;
    } else if (userAds.length > 0 && user) {
      adsContent = (
        <div>
          <h2 className="profile-info__title">Les annonces de </h2>
          <h2 className="profile-info__title">{user.name}</h2>

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
  deleteUser: PropTypes.func.isRequired,
  getUserAds: PropTypes.func.isRequired,
  admin: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  users: state.users,
  ads: state.ads,
  admin: state.auth.user.admin
});

export default connect(
  mapStateToProps,
  { getUser, getUserAds, deleteUser }
)(Profile);
