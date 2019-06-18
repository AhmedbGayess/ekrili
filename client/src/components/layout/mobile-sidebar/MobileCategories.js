import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import MobileCategory from "./MobileCategory";

class MobileCategories extends React.Component {
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

  back = () => {
    this.props.close();
    this.props.openMobileSidebar();
  };

  render() {
    const {
      open,
      categories,
      close,
      setSubCategories,
      openMobileSubCategories
    } = this.props;
    const categoriesList = categories.map((category) => (
      <MobileCategory
        key={category._id}
        category={category}
        close={close}
        setSubCategories={setSubCategories}
        openMobileSubCategories={openMobileSubCategories}
      />
    ));

    return (
      <nav
        ref={this.setWrapperRef}
        className={classNames("mobile-sidebar", {
          "mobile-sidebar__open": open
        })}
      >
        <p className="mobile-sidebar__back" onClick={this.back}>
          <span className="mobile-sidebar__back-icon">&larr; </span>{" "}
          <span>Retour</span>
        </p>
        <ul>{categoriesList}</ul>
      </nav>
    );
  }
}

MobileCategories.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  openMobileSidebar: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  setSubCategories: PropTypes.func.isRequired,
  openMobileSubCategories: PropTypes.func.isRequired
};

export default MobileCategories;
