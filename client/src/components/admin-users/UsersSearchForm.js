import React from "react";
import PropTypes from "prop-types";

const UsersSearchFrom = ({ onChange, onSubmit, value }) => (
  <form className="users-search" onSubmit={onSubmit}>
    <input
      className="users-search__input form-input"
      value={value}
      onChange={onChange}
      placeholder="Chercher un utilisateur par nom, email ou téléphone"
    />
    <button className="btn-primary">Chercher</button>
  </form>
);

UsersSearchFrom.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default UsersSearchFrom;
