import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => (
  <nav className="admin-nav">
    <ul>
      <li>
        <NavLink
          to="/admin"
          className="admin-nav-link"
          activeClassName="admin-nav-link-active"
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin" className="admin-nav-link">
          Catégories
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin" className="admin-nav-link">
          Ajouter Catégorie
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin" className="admin-nav-link">
          Sous-catégories
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin" className="admin-nav-link">
          Ajouter sous-catégorie
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin" className="admin-nav-link">
          Annonces
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin" className="admin-nav-link">
          Utilisateurs
        </NavLink>
      </li>
      <li>
        <span to="/admin" className="admin-nav-link">
          Se déconnecter
        </span>
      </li>
    </ul>
  </nav>
);

export default AdminSidebar;
