import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/actions/auth";

const AdminSidebar = ({ logout }) => (
  <nav className="admin-nav">
    <ul>
      <li>
        <NavLink
          to="/admin"
          className="admin-nav-link"
          activeClassName="admin-nav-link-active"
          exact
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/admin/categories"
          className="admin-nav-link"
          activeClassName="admin-nav-link-active"
          exact
        >
          Catégories
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/admin/add-category"
          className="admin-nav-link"
          activeClassName="admin-nav-link-active"
          exact
        >
          Ajouter Catégorie
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/admin/subcateogries"
          className="admin-nav-link"
          activeClassName="admin-nav-link-active"
          exact
        >
          Sous-catégories
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/admin/add-subcategory"
          className="admin-nav-link"
          activeClassName="admin-nav-link-active"
          exact
        >
          Ajouter sous-catégorie
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/admin/ads"
          className="admin-nav-link"
          activeClassName="admin-nav-link-active"
          exact
        >
          Annonces
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/admin/users"
          className="admin-nav-link"
          activeClassName="admin-nav-link-active"
          exact
        >
          Utilisateurs
        </NavLink>
      </li>
      <li>
        <span to="/admin" className="admin-nav-link" onClick={logout}>
          Se déconnecter
        </span>
      </li>
    </ul>
  </nav>
);

export default connect(
  null,
  { logout }
)(AdminSidebar);
