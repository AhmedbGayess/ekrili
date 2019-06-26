import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";
import SearchBar from "../SearchBar";

class MobileSidebar extends React.Component {
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
    const { open, openMobileCategories, close } = this.props;
    return (
      <nav
        ref={this.setWrapperRef}
        className={classNames("mobile-sidebar", {
          "mobile-sidebar__open": open
        })}
      >
        <ul>
          <li>
            <SearchBar screen="mobile" close={close} />
          </li>
          <li>
            <p
              className="mobile-sidebar__link mobile-sidebar__link-category"
              onClick={openMobileCategories}
            >
              <span>Les Catégories</span>
              <span className="mobile-sidebar__link mobile-sidebar__link-category-plus">
                +
              </span>
            </p>
          </li>
          <li>
            <Link to="/" className="mobile-sidebar__link">
              Comment ça marche?
            </Link>
          </li>
          <li>
            <Link to="/" className="mobile-sidebar__link">
              Qui sommes nous?
            </Link>
          </li>
          <li>
            <Link to="/" className="mobile-sidebar__link">
              Nous contacter
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

MobileSidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  openMobileCategories: PropTypes.func.isRequired
};

export default MobileSidebar;
