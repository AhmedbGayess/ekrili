import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";

class MobileSideBar extends React.Component {
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
    const { open } = this.props;
    return (
      <nav
        ref={this.setWrapperRef}
        className={classNames("mobile-sidebar", {
          "mobile-sidebar__open": open
        })}
      >
        <Link to="/">Hi</Link>
        <Link to="/">Hi</Link>
        <Link to="/">Hi</Link>
        <Link to="/">Hi</Link>
      </nav>
    );
  }
}

MobileSideBar.propTypes = {
  open: PropTypes.bool.isRequired
};

export default MobileSideBar;
