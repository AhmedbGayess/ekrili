import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const UserRow = ({ user }) => (
  <Link className="users-table__body">
    <div className="users-table__body__cell">{user._id}</div>
    <div className="users-table__body__cell">{user.name}</div>
    <div className="users-table__body__cell">{user.email}</div>
    <div className="users-table__body__cell">{user.phone}</div>
  </Link>
);

UserRow.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserRow;
