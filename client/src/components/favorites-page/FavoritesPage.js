import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFavorites } from "../../store/actions/favorites";

class FavoritesPage extends React.Component {
  state = {
    skip: 0
  };

  componentDidMount() {
    this.getNextFavorites();
  }

  getNextFavorites = () => {
    this.props.getFavorites(this.state.skip);
    this.setState((prevState) => ({
      skip: prevState.skip + 5
    }));
  };

  render() {
    return (
      <div>
        <h1>FAVORITES</h1>
      </div>
    );
  }
}

FavoritesPage.propTypes = {
  getFavorites: PropTypes.func.isRequired,
  favorites: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  favorites: state.favorites
});

export default connect(
  mapStateToProps,
  { getFavorites }
)(FavoritesPage);
