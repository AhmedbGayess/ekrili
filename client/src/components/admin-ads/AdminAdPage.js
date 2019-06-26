import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAd } from "../../store/actions/ads";
import { adminDeleteAd } from "../../store/actions/ads";
import Loader from "../common/Loader";
import AdImages from "../ad-page/AdImages";
import AdPrice from "../ad-page/AdPrice";
import AdDescription from "../ad-page/AdDescription";
import AdContact from "../ad-page/AdContact";
import DeleteModal from "../common/DeleteModal";

class AdminAdPage extends React.Component {
  state = {
    deleteModalOpen: false
  };

  componentDidMount() {
    this.props.getAd(this.props.match.params.id);
  }

  toggleDeleteModal = () => {
    this.setState((prevProps) => ({
      deleteModalOpen: !prevProps.deleteModalOpen
    }));
  };

  deleteAd = () => {
    this.props.adminDeleteAd(this.props.match.params.id);
  };

  render() {
    const { ad, loading } = this.props.ads;
    let pageContent;
    if (ad === null || loading) {
      pageContent = <Loader />;
    } else if (Object.keys(ad).length > 0) {
      pageContent = (
        <div className="container my-2">
          <div className="ad">
            <AdImages images={ad.images} />
            <h1 className="ad-title">{ad.title}</h1>
            <div className="ad-info">
              <AdPrice ad={ad} />
              <AdContact ad={ad} />

              <button
                className="btn-secondary ad-delete"
                onClick={this.toggleDeleteModal}
              >
                Supprimer
              </button>
            </div>
            <AdDescription description={ad.description} />
          </div>
          <DeleteModal
            modalOpen={this.state.deleteModalOpen}
            toggleModal={this.toggleDeleteModal}
            deleteItem={this.deleteAd}
            item="cette annonce"
          />
        </div>
      );
    }
    return <div>{pageContent}</div>;
  }
}

AdminAdPage.propTypes = {
  ads: PropTypes.object.isRequired,
  getAd: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  ads: state.ads,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAd, adminDeleteAd }
)(AdminAdPage);
