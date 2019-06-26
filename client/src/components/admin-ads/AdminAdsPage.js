import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getAds } from "../../store/actions/ads";
import Pagination from "../ads/Pagination";
import Loader from "../common/Loader";
import NoAd from "../ads/NoAd";
import AdsFilters from "../ads/AdsFilters";
import AdsSort from "../ads/AdsSort";
import AdCard from "../ads/AdCard";

class AdminAdsPage extends React.Component {
  state = {
    sortBy: ""
  };
  componentDidMount() {
    const query = this.props.location.search
      ? `${this.props.location.search}&skip=${this.props.match.params.page *
          20 -
          20}&limit=20&sortBy=updatedAt:desc`
      : `?skip=${this.props.match.params.page * 20 -
          20}&limit=20&sortBy=updatedAt:desc`;
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
      `/admin/ads/1?title=${title ? title : ""}&governorate=${
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
      const adsList = ads.map((ad) => (
        <Link to={`/admin/ad/${ad._id}`} key={ad._id}>
          <AdCard
            title={ad.title}
            price={ad.price}
            governorate={ad.governorate}
            delegation={ad.delegation}
            image={ad.images[0]}
          />
        </Link>
      ));
      pageContent = (
        <div>
          <div className="sort">
            <AdsSort onChange={this.onSortChange} value={this.state.sortBy} />
          </div>
          <div className="admin-ads ads-list">{adsList}</div>
          <Pagination
            count={count}
            search={this.props.location.search}
            pageNumber={Number(this.props.match.params.page)}
            link="/admin/ads"
          />
        </div>
      );
    }

    return (
      <div>
        <AdsFilters
          queryString={this.props.location.search}
          link="/admin/ads/1"
        />
        {pageContent}
      </div>
    );
  }
}

AdminAdsPage.propTypes = {
  getAds: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  ads: state.ads
});

export default connect(
  mapStateToProps,
  { getAds }
)(AdminAdsPage);
