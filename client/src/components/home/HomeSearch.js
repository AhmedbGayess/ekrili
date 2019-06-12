import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import PropTypes from "prop-types";
import { governorates } from "../../utils/locations.js";
import setDelegation from "../../utils/setDelegation.js";
import HomeSelectInput from "./HomeSelectInput.js";
import HomeSearchForm from "./HomeSearchForm.js";

class HomeSearch extends React.Component {
  state = {
    search: "",
    governorate: null,
    delegation: null,
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
    this.setState({ governorate });
    const delegationsArray = setDelegation(governorate.value);
    const delegations = delegationsArray.map((option) => ({
      value: option.name,
      label: option.name
    }));
    this.setState({ delegations, delegation: "" });
  };

  onDelegationChange = (delegation) => {
    this.setState({ delegation });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { search, governorate, delegation } = this.state;
    console.log({
      search,
      governorate: governorate.value,
      delegation: delegation.value
    });
  };

  render() {
    const {
      search,
      governorate,
      governorates,
      delegation,
      delegations
    } = this.state;
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
            search={search}
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
