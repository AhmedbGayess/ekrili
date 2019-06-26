import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { governorates } from "../../utils/locations.js";
import setDelegation from "../../utils/setDelegation.js";
import HomeSearchForm from "./HomeSearchForm.js";
import { history } from "../../router/AppRouter";

class HomeSearch extends React.Component {
  state = {
    title: "",
    governorate: "",
    delegation: "",
    delegations: []
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onGovernorateChange = (e) => {
    const governorate = e.target.value;
    const delegations = setDelegation(governorate);
    this.setState({
      delegations: [...delegations],
      governorate,
      delegation: ""
    });
  };

  onDelegationChange = (e) => {
    this.setState({ delegation: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { title, governorate, delegation } = this.state;
    const titleQuery = title ? `title=${title}` : "";
    const governorateQuery = governorate ? `governorate=${governorate}` : "";
    const delegationQuery = delegation ? `delegation=${delegation}` : "";

    const query = [titleQuery, governorateQuery, delegationQuery]
      .filter((string) => string.length > 0)
      .join("&");
    history.push(`/browse-ads/1?${query}`);
  };

  render() {
    const { delegations, title, governorate, delegation } = this.state;

    return (
      <div className="home-search">
        <div className="home-search-center">
          <h1 className="home-search-title">
            Louez. Économisez. Gagnez de l'argent.
          </h1>
          <HomeSearchForm
            onChange={this.onChange}
            onGovernorateChange={this.onGovernorateChange}
            onDelegationChange={this.onDelegationChange}
            onSubmit={this.onSubmit}
            governorates={governorates}
            delegations={delegations}
            governorate={governorate}
            delegation={delegation}
            title={title}
          />
          <div className="home-search-post">
            <p>Ou mettez quelque chose à louer</p>
            {!this.props.isAuthenticated && (
              <button
                className="btn-secondary"
                onClick={this.props.toggleSignupModal}
              >
                Publier une annonce
              </button>
            )}
            {this.props.isAuthenticated && (
              <Link to="/create-ad" className="btn-secondary">
                Publier une annonce
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}

HomeSearch.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  toggleSignupModal: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(HomeSearch);
