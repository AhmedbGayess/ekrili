import React from "react";
import { IoIosSearch } from "react-icons/io";
import { history } from "../../router/AppRouter";

class SearchBar extends React.Component {
  state = {
    title: ""
  };

  onChange = (e) => {
    this.setState({ title: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    history.push(
      `/browse-ads/1?title=${this.state.title}&sortBy=updatedAt:desc`
    );
    this.setState({ title: "" });
    if (this.props.screen === "mobile") {
      this.props.close();
    }
  };

  onBlurInput = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="searchbar-container">
          <input
            name="title"
            value={this.state.title}
            className={`searchbar-input searchbar-input-${this.props.screen}`}
            onChange={this.onChange}
            placeholder="Que cherchez-vous?"
            autoComplete="off"
            onKeyPress={this.onBlurInput}
          />
          <IoIosSearch
            className="searchbar-container-icon"
            onClick={this.onSubmit}
          />
        </div>
      </form>
    );
  }
}

export default SearchBar;
