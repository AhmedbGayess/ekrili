import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";

class MobileUserDropdown extends React.Component {
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

  openLogin = () => {
    this.props.toggleLoginModal();
    this.props.close();
  };

  openSignup = () => {
    this.props.toggleSignupModal();
    this.props.close();
  };

  render() {
    const { open } = this.props;
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
            <span onClick={this.openLogin} className="dropdown__list-item-link">
              Connexion
            </span>
          </li>
          <li className="dropdown__list-item">
            <span
              onClick={this.openSignup}
              className="dropdown__list-item-link"
            >
              Insription
            </span>
          </li>
        </ul>
      </div>
    );
  }
}

MobileUserDropdown.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  toggleLoginModal: PropTypes.func.isRequired,
  toggleSignupModal: PropTypes.func.isRequired
};

export default MobileUserDropdown;
