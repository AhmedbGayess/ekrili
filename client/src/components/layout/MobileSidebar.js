import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";
import { getCategories } from "../../store/actions/categories";
import { getSubCategories } from "../../store/actions/subCategories";

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
    const { open, openMobileCategories } = this.props;
    return (
      <nav
        ref={this.setWrapperRef}
        className={classNames("mobile-sidebar", {
          "mobile-sidebar__open": open
        })}
      >
        <h1>Placeholder</h1>
        <ul>
          <li>
            <p
              className="mobile-sidebar__link mobile-sidebar__link-category"
              onClick={openMobileCategories}
            >
              <span>Les Catégories</span>
              <span>+</span>
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
  getCategories: PropTypes.func.isRequired,
  getSubCategories: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  subCategories: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
  subCategories: state.subCategories.subCategories
});

export default connect(
  mapStateToProps,
  { getCategories, getSubCategories }
)(MobileSidebar);
