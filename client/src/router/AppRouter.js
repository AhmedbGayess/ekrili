import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";
import ReactGA from "react-ga";
import Home from "../components/home/Home";
import PrivateRoute from "./PrivateRoute";
import AdminRouter from "./AdminRouter";
import Navbar from "../components/layout/Navbar";
import EditAd from "../components/create-ad/EditAd";
import AdsPage from "../components/ads/AdsPage";
import SideBar from "../components/layout/sidebar/SideBar";
import PageCover from "../components/layout/PageCover";
import MobileSidebar from "../components/layout/mobile-sidebar/MobileSidebar";
import { getCategories } from "../store/actions/categories";
import { getSubCategories } from "../store/actions/subCategories";
import MobileCategories from "../components/layout/mobile-sidebar/MobileCategories";
import MobileSubCategories from "../components/layout/mobile-sidebar/MobileSubCategroies";
import Loader from "../components/common/Loader";
import AdPage from "../components/ad-page/AdPage";
import MyPage from "../components/user/MyPage";
import FavoritesPage from "../components/favorites-page/FavoritesPage";
import UserAdsPage from "../components/user-ads/UserAdsPage";
import UpdateAd from "../components/create-ad/UpdateAd";
import Profile from "../components/user-profile/Profile";
import Footer from "../components/layout/Footer";
import NotFoundPage from "../components/not-found/NotFoundPage";
import Contact from "../components/contact/Contact";
import How from "../components/how/How";

export const history = createBrowserHistory();
history.listen((location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

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

  async componentDidMount() {
    this.props.getCategories();
    this.props.getSubCategories();
    ReactGA.pageview(window.location.pathname);
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
    const subCategories = this.props.subCategories.subCategories.filter(
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
    const { categories } = this.props.categories;
    let app;

    if (
      this.props.categories.loading ||
      categories === null ||
      this.props.subCategories.loading ||
      this.props.subCategories === null
    ) {
      app = <Loader />;
    } else {
      app = (
        <Router history={history}>
          <Route
            path={[
              "/",
              "/create-ad",
              "/edit-ad/:id",
              "/browse-ads/:page",
              "/ad/:id",
              "/my-page",
              "/my-favorites/:page",
              "/my-ads/:page",
              "/user/:id/:page",
              "/contact",
              "/how-it-works"
            ]}
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
            toggleLoginModal={this.toggleLoginModal}
            toggleSignupModal={this.toggleSignupModal}
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
            <PrivateRoute path="/create-ad" component={EditAd} exact />
            <PrivateRoute path="/edit-ad/:id" component={UpdateAd} exact />
            <PrivateRoute path="/my-page" component={MyPage} exact />
            <PrivateRoute
              path="/my-favorites/:page"
              component={FavoritesPage}
              exact
            />
            <PrivateRoute path="/my-ads/:page" component={UserAdsPage} exact />
            <Route path="/browse-ads/:page" component={AdsPage} exact />
            <Route path="/ad/:id" component={AdPage} exact />
            <Route path="/user/:id/:page" component={Profile} exact />
            <Route path="/admin" component={AdminRouter} />
            <Route path="/contact" component={Contact} exact />
            <Route path="/how-it-works" component={How} exact />
            <Route
              render={() => (
                <NotFoundPage
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
            />
          </Switch>
          <Route
            path={[
              "/",
              "/create-ad",
              "/edit-ad/:id",
              "/browse-ads/:page",
              "/ad/:id",
              "/my-page",
              "/my-favorites/:page",
              "/my-ads/:page",
              "/user/:id/:page",
              "/contact",
              "/how-it-works"
            ]}
            render={() => (
              <Footer
                toggleLoginModal={this.toggleLoginModal}
                toggleSignupModal={this.toggleSignupModal}
              />
            )}
            exact
          />
        </Router>
      );
    }

    return app;
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
  subCategories: state.subCategories
});

export default connect(
  mapStateToProps,
  { getCategories, getSubCategories }
)(AppRouter);
