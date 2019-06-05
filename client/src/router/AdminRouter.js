import React from "react";
import { Switch } from "react-router-dom";
import AdminRoute from "./AdminRoute";
import Dashboard from "../components/admin-dashboard/Dashboard";
import AdminSidebar from "../components/layout/AdminSidebar";
import AdminCategories from "../components/admin-categories/AdminCategories";
import EditCategory from "../components/admin-categories/EditCategory";

const AdminRouter = () => (
  <div className="admin-container">
    <AdminSidebar />
    <Switch>
      <AdminRoute path="/admin" component={Dashboard} exact />
      <AdminRoute path="/admin/categories" component={AdminCategories} exact />
      <AdminRoute path="/admin/add-category" component={EditCategory} exact />
    </Switch>
  </div>
);

export default AdminRouter;
