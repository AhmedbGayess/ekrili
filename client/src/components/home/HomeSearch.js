import React from "react";
import { governorates } from "../../utils/locations.js";
import setDelegation from "../../utils/setDelegation.js";
import HomeSelectInput from "./HomeSelectInput.js";
import { IoIosSearch } from "react-icons/io";
import Select from "react-select";

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
    this.setState({ delegations });
  };

  onDelegationChange = (delegation) => {
    this.setState({ delegation });
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
        <h1 className="home-search-title">Hello</h1>
        <form className="home-search-form">
          <div className="home-search-container">
            <input
              value={search}
              className="home-search-input"
              onChange={this.onChange}
              placeholder="Ordinateur, appareil photo, robe..."
            />
            <IoIosSearch className="home-search-container-icon" />
          </div>
          <HomeSelectInput
            onChange={this.onGovernorateChange}
            options={governorates}
            value={governorate}
            placeholder="Gouvernorat"
          />
          <HomeSelectInput
            onChange={this.onDelegationChange}
            options={delegations}
            value={delegation}
            placeholder="Délégation"
          />
          <HomeSelectInput
            onChange={this.onDelegationChange}
            options={delegations}
            value={delegation}
            placeholder="Délégation"
          />
          <button className="btn-primary">Chercher</button>
        </form>
      </div>
    );
  }
}

export default HomeSearch;
