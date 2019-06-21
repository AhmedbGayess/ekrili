import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAd } from "../../store/actions/ads";
import Loader from "../common/Loader";
import AdImages from "./AdImages";
import AdPrice from "./AdPrice";
import AdDescription from "./AdDescription";
import AdPath from "./AdPath";

class AdPage extends React.Component {
  componentDidMount() {
    this.props.getAd(this.props.match.params.id);
  }
  render() {
    const { ad, loading } = this.props.ads;
    let pageContent;
    if (ad === null || loading) {
      pageContent = <Loader />;
    } else if (Object.keys(ad).length > 0) {
      pageContent = (
        <div className="container my-2">
          <AdPath category={ad.category} subCategory={ad.subCategory} />
          <div className="ad">
            <AdImages images={ad.images} />
            <AdPrice ad={ad} />
            <AdDescription ad={ad} />
          </div>
        </div>
      );
    }
    return <div>{pageContent}</div>;
  }
}

AdPage.propTypes = {
  ads: PropTypes.object.isRequired,
  getAd: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  ads: state.ads
});

export default connect(
  mapStateToProps,
  { getAd }
)(AdPage);