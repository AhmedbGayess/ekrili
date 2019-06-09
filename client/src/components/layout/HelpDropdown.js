import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";

class HelpDropdown extends React.Component {
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
    const { open, close } = this.props;
    return (
      <div
        ref={this.setWrapperRef}
        className={classNames("dropdown dropdown-help", {
          "dropdown-closed": !open,
          "dropdown-open": open
        })}
      >
        <ul className="dropdown__list">
          <li className="dropdown__list-item">
            <Link
              to="/admin-login"
              onClick={close}
              className="dropdown__list-item-link"
            >
              Comment ça marche
            </Link>
          </li>
          <li className="dropdown__list-item">
            <Link to="/" onClick={close} className="dropdown__list-item-link">
              Conditions d'utilisation
            </Link>
          </li>
          <li className="dropdown__list-item">
            <Link to="/" onClick={close} className="dropdown__list-item-link">
              Qui sommes-nous?
            </Link>
          </li>
          <li className="dropdown__list-item">
            <Link to="/" onClick={close} className="dropdown__list-item-link">
              Nous contacter
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

HelpDropdown.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};

export default HelpDropdown;
