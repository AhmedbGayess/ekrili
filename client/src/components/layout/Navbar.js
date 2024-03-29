import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import classNames from "classnames";
import Proptypes from "prop-types";
import SignupModal from "../auth/SignupModal";
import LoginModal from "../auth/LoginModal";
import { logout } from "../../store/actions/auth";
import MobileNavList from "./MobileNavList";
import NavbarList from "./NavbarList";
import avatar from "../../images/avatar.png";
import SearchBar from "./SearchBar";
import logo from "../../images/logo.png";

class Navbar extends React.Component {
  state = {
    userDropdownOpen: false,
    helpDropdownOpen: false
  };

  closeUserDropdown = () => {
    this.setState({
      userDropdownOpen: false
    });
  };

  openUserDropdown = () => {
    this.setState({
      userDropdownOpen: true
    });
  };

  closeHelpDropdown = () => {
    this.setState({
      helpDropdownOpen: false
    });
  };

  openHelpDropdown = () => {
    this.setState({
      helpDropdownOpen: true
    });
  };

  logout = () => {
    this.props.logout();
    this.closeUserDropdown();
  };

  render() {
    const homePath = this.props.location === "/";
    const { userDropdownOpen, helpDropdownOpen } = this.state;

    const {
      loginModalOpen,
      signupModalOpen,
      toggleLoginModal,
      toggleSignupModal,
      switchToSignup,
      switchToLogin,
      openSidebar,
      openMobileSidebar,
      user
    } = this.props;
    const loggedIn = Object.keys(user).length > 0;
    let userImage = user.image ? `/images/${user.image}` : avatar;
    return (
      <nav
        className={classNames("navbar", {
          "navbar-home": homePath,
          "navbar-page": !homePath
        })}
      >
        {/* <div className="navbar-logo-container"> */}
        <NavLink to="/">
          <img src={logo} alt="logo" className="navbar__logo" />
        </NavLink>
        {/* </div> */}
        {!homePath && <SearchBar screen="large" />}
        <NavbarList
          loggedIn={loggedIn}
          openHelpDropdown={this.openHelpDropdown}
          openUserDropdown={this.openUserDropdown}
          closeHelpDropdown={this.closeHelpDropdown}
          closeUserDropdown={this.closeUserDropdown}
          logout={this.logout}
          toggleLoginModal={toggleLoginModal}
          toggleSignupModal={toggleSignupModal}
          helpDropdownOpen={helpDropdownOpen}
          userDropdownOpen={userDropdownOpen}
          openSidebar={openSidebar}
          userImage={userImage}
        />
        <MobileNavList
          toggleLoginModal={toggleLoginModal}
          toggleSignupModal={toggleSignupModal}
          openUserDropdown={this.openUserDropdown}
          closeUserDropdown={this.closeUserDropdown}
          userDropdownOpen={userDropdownOpen}
          logout={this.logout}
          loggedIn={loggedIn}
          openMobileSidebar={openMobileSidebar}
          userImage={userImage}
        />
        <SignupModal
          modalOpen={signupModalOpen}
          toggleModal={toggleSignupModal}
          switchModal={switchToLogin}
        />
        <LoginModal
          modalOpen={loginModalOpen}
          toggleModal={toggleLoginModal}
          switchModal={switchToSignup}
        />
      </nav>
    );
  }
}

Navbar.propTypes = {
  user: Proptypes.shape({}).isRequired,
  logout: Proptypes.func.isRequired,
  loginModalOpen: Proptypes.bool.isRequired,
  signupModalOpen: Proptypes.bool.isRequired,
  toggleLoginModal: Proptypes.func.isRequired,
  toggleSignupModal: Proptypes.func.isRequired,
  switchToSignup: Proptypes.func.isRequired,
  switchToLogin: Proptypes.func.isRequired,
  openSidebar: Proptypes.func.isRequired,
  sidebarOpen: Proptypes.bool.isRequired,
  openMobileSidebar: Proptypes.func.isRequired,
  mobileSubCategoriesOpen: Proptypes.bool.isRequired,
  mobileCategoriesOpen: Proptypes.bool.isRequired,
  mobileOpen: Proptypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
