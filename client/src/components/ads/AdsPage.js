import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getAds } from "../../store/actions/ads";
import Pagination from "./Pagination";

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
        ? `${this.props.location.search}&skip=${this.props.match.params.page -
            20 -
            20}&limit=20`
        : `?skip=${this.props.match.params.page * 20 - 20}&limit=20`;
      this.props.getAds(query);
    }
  }

  render() {
    const { ads, count, loading } = this.props.ads;
    return (
      <div>
        <h1>hello</h1>
        <Link to="/browse-ads">Go</Link>
        <Pagination
          count={count}
          link={this.props.location.search}
          pageNumber={Number(this.props.match.params.page)}
        />
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
