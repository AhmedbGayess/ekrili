import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAds } from "../../store/actions/ads";
import Pagination from "./Pagination";
import Loader from "../common/Loader";
import AdsList from "./AdsList";
import NoAd from "./NoAd";
import AdsFilters from "./AdsFilters";

class AdsPage extends React.Component {
  componentDidMount() {
    const query = this.props.location.search
      ? `${this.props.location.search}&skip=${this.props.match.params.page *
          20 -
          20}&limit=20`
      : `?skip=${this.props.match.params.page * 20 - 20}&limit=20`;
    this.props.getAds(query);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.location.search !== this.props.location.search ||
      prevProps.match.params.page !== this.props.match.params.page
    ) {
      const query = this.props.location.search
        ? `${this.props.location.search}&skip=${this.props.match.params.page *
            20 -
            20}&limit=20`
        : `?skip=${this.props.match.params.page * 20 - 20}&limit=20`;
      this.props.getAds(query);
    }
  }

  render() {
    const { ads, count, loading } = this.props.ads;
    let pageContent;

    if (loading || ads === null) {
      pageContent = <Loader />;
    } else if (ads.length === 0) {
      pageContent = <NoAd />;
    } else {
      pageContent = (
        <div>
          <AdsList ads={ads} />
          <Pagination
            count={count}
            link={this.props.location.search}
            pageNumber={Number(this.props.match.params.page)}
          />
        </div>
      );
    }

    return (
      <div>
        <AdsFilters queryString={this.props.location.search} />
        {pageContent}
      </div>
    );
  }
}

AdsPage.propTypes = {
  getAds: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  ads: state.ads
});

export default connect(
  mapStateToProps,
  { getAds }
)(AdsPage);
