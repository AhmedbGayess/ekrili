import React from "react";
import { connect } from "react-redux";
import { getAds } from "../../store/actions/ads";

class AdsCount extends React.Component {
  componentDidMount() {
    this.props.getAds("?limit=1");
  }

  render() {
    return (
      <div className="dashboard__counts__card">
        <h3>Nombre d'annonces sur le site</h3>
        <h2>{this.props.count}</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.ads.count
});

export default connect(
  mapStateToProps,
  { getAds }
)(AdsCount);
