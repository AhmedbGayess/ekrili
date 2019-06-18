import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";
import Home from "../components/home/Home";
import AdminLogin from "../components/auth/AdminLogin";
import PrivateRoute from "./PrivateRoute";
import AdminRouter from "./AdminRouter";
import Navbar from "../components/layout/Navbar";
import CreateAd from "../components/create-ad/CreateAd";
import AdsPage from "../components/ads/AdsPage";
import SideBar from "../components/layout/sidebar/SideBar";
import PageCover from "../components/layout/PageCover";
import MobileSidebar from "../components/layout/mobile-sidebar/MobileSidebar";
import { getCategories } from "../store/actions/categories";
import { getSubCategories } from "../store/actions/subCategories";
import MobileCategories from "../components/layout/mobile-sidebar/MobileCategories";
import MobileSubCategories from "../components/layout/mobile-sidebar/MobileSubCategroies";

export const history = createBrowserHistory();

class AppRouter extends React.Component {
  state = {
    signupModalOpen: false,
    loginModalOpen: false,
    sidebarOpen: false,
    mobileSidebarOpen: false,
    subCategories: [],
    mobileCategoriesOpen: false,
    mobileSubCategoriesOpen: false
  };

  componentDidMount() {
    this.props.getCategories();
    this.props.getSubCategories();
  }

  toggleSignupModal = () => {
    this.setState((prevState) => ({
      signupModalOpen: !prevState.signupModalOpen
    }));
  };

  toggleLoginModal = () => {
    this.setState((prevState) => ({
      loginModalOpen: !prevState.loginModalOpen
    }));
  };

  switchToSignup = () => {
    this.setState({
      loginModalOpen: false,
      signupModalOpen: true
    });
  };

  switchToLogin = () => {
    this.setState({
      loginModalOpen: true,
      signupModalOpen: false
    });
  };

  openSidebar = () => {
    this.setState({ sidebarOpen: true });
  };

  closeSidebar = () => {
    this.setState({ sidebarOpen: false });
  };

  openMobileSidebar = () => {
    this.setState({ mobileSidebarOpen: true });
  };

  closeMobileSidebar = () => {
    this.setState({ mobileSidebarOpen: false });
  };

  setSubCategories = (category) => {
    const subCategories = this.props.subCategories.filter(
      (subCategory) => subCategory.category === category
    );
    this.setState({ subCategories: [...subCategories] });
  };

  openMobileCategories = () => {
    this.setState({ mobileCategoriesOpen: true });
  };

  closeMobileCategories = () => {
    this.setState({ mobileCategoriesOpen: false });
  };

  openMobileSubCategories = () => {
    this.setState({ mobileSubCategoriesOpen: true });
  };

  closeMobileSubCategories = () => {
    this.setState({ mobileSubCategoriesOpen: false });
  };

  render() {
    const {
      loginModalOpen,
      signupModalOpen,
      sidebarOpen,
      mobileSidebarOpen,
      subCategories,
      mobileCategoriesOpen,
      mobileSubCategoriesOpen
    } = this.state;
    const { categories } = this.props;
    return (
      <Router history={history}>
        <Route
          path={["/", "/create-ad", "/browse-ads/:page"]}
          render={() => (
            <Navbar
              loginModalOpen={loginModalOpen}
              signupModalOpen={signupModalOpen}
              toggleLoginModal={this.toggleLoginModal}
              toggleSignupModal={this.toggleSignupModal}
              switchToSignup={this.switchToSignup}
              switchToLogin={this.switchToLogin}
              location={history.location.pathname}
              openSidebar={this.openSidebar}
              sidebarOpen={sidebarOpen}
              openMobileSidebar={this.openMobileSidebar}
              mobileOpen={mobileSidebarOpen}
              mobileCategoriesOpen={mobileCategoriesOpen}
              mobileSubCategoriesOpen={mobileSubCategoriesOpen}
            />
          )}
          exact
        />
        <SideBar
          open={sidebarOpen}
          close={this.closeSidebar}
          categories={categories}
          subCategories={subCategories}
          setSubCategories={this.setSubCategories}
        />
        <MobileSidebar
          open={mobileSidebarOpen}
          close={this.closeMobileSidebar}
          openMobileCategories={this.openMobileCategories}
        />
        <MobileCategories
          categories={categories}
          close={this.closeMobileCategories}
          open={mobileCategoriesOpen}
          openMobileSidebar={this.openMobileSidebar}
          setSubCategories={this.setSubCategories}
          openMobileSubCategories={this.openMobileSubCategories}
        />
        <MobileSubCategories
          subCategories={subCategories}
          close={this.closeMobileSubCategories}
          open={mobileSubCategoriesOpen}
          openMobileCategories={this.openMobileCategories}
        />
        <PageCover
          open={sidebarOpen}
          mobileOpen={mobileSidebarOpen}
          categoriesOpen={mobileCategoriesOpen}
          subCategoriesOpen={mobileSubCategoriesOpen}
        />
        <Switch>
          <Route
            path="/"
            render={() => <Home toggleSignupModal={this.toggleSignupModal} />}
            exact
          />
          <PrivateRoute path="/create-ad" component={CreateAd} exact />
          <Route path="/browse-ads/:page" component={AdsPage} exact />
          <Route path="/admin-login" component={AdminLogin} exact />
          <Route path="/admin" component={AdminRouter} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
  subCategories: state.subCategories.subCategories
});

export default connect(
  mapStateToProps,
  { getCategories, getSubCategories }
)(AppRouter);
