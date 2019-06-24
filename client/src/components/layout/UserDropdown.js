import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";

class UserDropdown extends React.Component {
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.close();
    }
  };

  render() {
    const { open, close, logout } = this.props;
    return (
      <div
        ref={this.setWrapperRef}
        className={classNames("dropdown", {
          "dropdown-closed": !open,
          "dropdown-open": open
        })}
      >
        <ul className="dropdown__list">
          <li className="dropdown__list-item">
            <Link
              to="/user-page"
              onClick={close}
              className="dropdown__list-item-link"
            >
              Mon compte
            </Link>
          </li>
          <li className="dropdown__list-item">
            <Link
              to="/my-ads/1"
              onClick={close}
              className="dropdown__list-item-link"
            >
              Mes annonces
            </Link>
          </li>
          <li className="dropdown__list-item">
            <Link
              to="/my-favorites"
              onClick={close}
              className="dropdown__list-item-link"
            >
              Mes favoris
            </Link>
          </li>
          <li className="dropdown__list-item">
            <span to="/" onClick={logout} className="dropdown__list-item-link">
              Se déconnecter
            </span>
          </li>
        </ul>
      </div>
    );
  }
}

UserDropdown.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

export default UserDropdown;
