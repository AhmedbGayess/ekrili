import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAds } from "../../store/actions/ads";
import Pagination from "./Pagination";
import Loader from "../common/Loader";
import AdsList from "./AdsList";
import NoAd from "./NoAd";
import AdsFilters from "./AdsFilters";
import AdsSort from "./AdsSort";

class AdsPage extends React.Component {
  state = {
    sortBy: ""
  };
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

  onSortChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    const { history, location } = this.props;
    const query = {};
    const pairs = (location.search[0] === "?"
      ? location.search.substr(1)
      : location.search
    ).split("&");
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i].split("=");
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
    }
    const { title, governorate, delegation, category, subCategory } = query;
    history.push(
      `/browse-ads/1?title=${title ? title : ""}&governorate=${
        governorate ? governorate : ""
      }&delegation=${delegation ? delegation : ""}&category=${
        category ? category : ""
      }&subCategory=${subCategory ? subCategory : ""}&sortBy=${e.target.value}`
    );
  };

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
          <AdsSort onChange={this.onSortChange} value={this.state.sortBy} />
          <AdsList ads={ads} />
          <Pagination
            count={count}
            search={this.props.location.search}
            pageNumber={Number(this.props.match.params.page)}
            link="/browse-ads"
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
