import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAd, deleteAd } from "../../store/actions/ads";
import Loader from "../common/Loader";
import EditAd from "./EditAd";
import { history } from "../../router/AppRouter";
import DeleteAd from "./DeleteAd";
import DeleteModal from "../common/DeleteModal";

class UpdateAd extends React.Component {
  state = {
    imageOne: "",
    imageTwo: "",
    imageThree: "",
    deleteModalOpen: false
  };

  async componentDidMount() {
    await this.props.getAd(this.props.match.params.id);
    const { images } = this.props.ads.ad;
    this.setState({
      imageOne: images[0],
      imageTwo: images[1] || "",
      imageThree: images[2] || ""
    });
    if (this.props.ads.ad.user !== this.props.user.id) {
      history.push("/");
    }
  }

  toggleDeleteModal = () => {
    this.setState((prevProps) => ({
      deleteModalOpen: !prevProps.deleteModalOpen
    }));
  };

  deleteAd = () => {
    this.props.deleteAd(this.props.match.params.id);
  };

  render() {
    const { loading, ad } = this.props.ads;

    let content;

    if (loading || ad === null) {
      content = <Loader />;
    } else if (Object.keys(ad).length > 0) {
      const {
        title,
        description,
        price,
        delegation,
        governorate,
        category,
        subCategory,
        images
      } = ad;
      content = (
        <div>
          <EditAd
            title={title}
            description={description}
            price={price}
            delegation={delegation}
            governorate={governorate}
            category={category}
            subCategory={subCategory}
            imageOne={images[0]}
            imageTwo={images[1] || ""}
            imageThree={images[2] || ""}
            id={this.props.match.params.id}
          />
          <DeleteAd toggleDeleteModal={this.toggleDeleteModal} />
          <DeleteModal
            modalOpen={this.state.deleteModalOpen}
            toggleModal={this.toggleDeleteModal}
            deleteItem={this.deleteAd}
            item="votre annonce"
          />
        </div>
      );
    }
    return content;
  }
}

UpdateAd.propTypes = {
  ads: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getAd: PropTypes.func.isRequired,
  deleteAd: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  ads: state.ads,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { getAd, deleteAd }
)(UpdateAd);
