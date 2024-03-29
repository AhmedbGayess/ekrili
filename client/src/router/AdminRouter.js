import React from "react";
import { Switch } from "react-router-dom";
import AdminRoute from "./AdminRoute";
import Dashboard from "../components/admin-dashboard/Dashboard";
import AdminSidebar from "../components/layout/AdminSidebar";
import AdminCategories from "../components/admin-categories/AdminCategories";
import EditCategory from "../components/admin-categories/EditCategory";
import EditSubCategory from "../components/admin-subcategories/EditSubCategory";
import AdminSubCategories from "../components/admin-subcategories/AdminSubCategories";
import AdminAdsPage from "../components/admin-ads/AdminAdsPage";
import AdminAdPage from "../components/admin-ads/AdminAdPage";
import AdminUsersPage from "../components/admin-users/AdminUsersPage";
import Profile from "../components/user-profile/Profile";

const AdminRouter = () => (
  <div className="admin-container">
    <AdminSidebar />
    <Switch>
      <AdminRoute path="/admin" component={Dashboard} exact />
      <AdminRoute path="/admin/categories" component={AdminCategories} exact />
      <AdminRoute path="/admin/add-category" component={EditCategory} exact />
      <AdminRoute
        path="/admin/edit-category/:id"
        component={EditCategory}
        exact
      />
      <AdminRoute
        path="/admin/subcategories"
        component={AdminSubCategories}
        exact
      />
      <AdminRoute
        path="/admin/add-subcategory"
        component={EditSubCategory}
        exact
      />
      <AdminRoute
        path="/admin/edit-subcategory/:id"
        component={EditSubCategory}
        exact
      />
      <AdminRoute path="/admin/ads/:page" component={AdminAdsPage} exact />
      <AdminRoute path="/admin/ad/:id" component={AdminAdPage} exact />
      <AdminRoute path="/admin/users/:page" component={AdminUsersPage} exact />
      <AdminRoute path="/admin/user/:id" component={Profile} exact />
    </Switch>
  </div>
);

export default AdminRouter;
