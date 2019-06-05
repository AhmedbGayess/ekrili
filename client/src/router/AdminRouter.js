import React from "react";
import { Switch } from "react-router-dom";
import AdminRoute from "./AdminRoute";
import Dashboard from "../components/admin-dashboard/Dashboard";
import AdminSidebar from "../components/layout/AdminSidebar";

const AdminRouter = () => (
  <div className="admin-container">
    <AdminSidebar />
    <Switch>
      <AdminRoute route="/admin" component={Dashboard} exact />
    </Switch>
  </div>
);

export default AdminRouter;
