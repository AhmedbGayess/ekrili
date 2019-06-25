import React from "react";
import { getAd } from "../../store/actions/ads";
import { connect } from "react-redux";
import Loader from "../common/Loader";
import EditAd from "./EditAd";

class UpdateAd extends React.Component {
  state = {
    imageOne: "",
    imageTwo: "",
    imageThree: ""
  };

  async componentDidMount() {
    await this.props.getAd(this.props.match.params.id);
    const { images } = this.props.ads.ad;
    this.setState({
      imageOne: images[0],
      imageTwo: images[1] || "",
      imageThree: images[2] || ""
    });
  }

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
      );
    }
    return content;
  }
}

const mapStateToProps = (state) => ({
  ads: state.ads
});

export default connect(
  mapStateToProps,
  { getAd }
)(UpdateAd);
