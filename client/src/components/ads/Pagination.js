import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const Pagination = ({ count, link }) => {
  console.log(link);
  const pagesNumber = Math.ceil(count / 20);
  let pages = [];

  for (let i = 1; i <= pagesNumber; i++) {
    pages.push(i);
  }

  const pagination = pages.map((page, i) => (
    <NavLink to={`/browse-ads/${page}${link}`} key={i}>
      {page}
    </NavLink>
  ));

  return (
    <div>
      <h1>Pagination</h1>
      {pagination}
    </div>
  );
};

Pagination.propTypes = {
  count: PropTypes.number.isRequired
};

export default Pagination;
