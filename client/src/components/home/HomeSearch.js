import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { governorates } from "../../utils/locations.js";
import setDelegation from "../../utils/setDelegation.js";
import HomeSearchForm from "./HomeSearchForm.js";

class HomeSearch extends React.Component {
  state = {
    title: "",
    governorate: "",
    delegation: "",
    delegations: [],
    governorates: []
  };

  componentDidMount() {
    const options = governorates.map((option) => ({
      value: option.name,
      label: option.name
    }));
    this.setState({ governorates: options });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onGovernorateChange = (governorate) => {
    const delegationsArray = setDelegation(governorate.value);
    const delegations = delegationsArray.map((option) => ({
      value: option.name,
      label: option.name
    }));
    this.setState({ delegations, governorate });
  };

  onDelegationChange = (delegation) => {
    this.setState({ delegation });
  };

  render() {
    const {
      governorates,
      delegations,
      title,
      governorate,
      delegation
    } = this.state;
    const titleQuery = title ? `title=${title}` : "";
    const governorateQuery = governorate
      ? `governorate=${governorate.value}`
      : "";
    const delegationQuery = delegation ? `delegation=${delegation.value}` : "";

    const query = [titleQuery, governorateQuery, delegationQuery]
      .filter((string) => string.length > 0)
      .join("&");

    return (
      <div className="home-search">
        <div className="home-search-center">
          <h1 className="home-search-title">
            Trouvez ce dont vous avez besoin.
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
            query={query}
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
