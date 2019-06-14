import React from "react";
import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";

const Pagination = ({ count, link, pageNumber }) => {
  const pagesNumber = Math.ceil(count / 3);
  let pages = [];

  if (pagesNumber <= 5) {
    for (let i = 1; i <= pagesNumber; i++) {
      pages.push(i);
    }
  } else if (pageNumber === pagesNumber) {
    pages = [1, pageNumber - 2, pageNumber - 1, pageNumber];
  } else {
    const arr = [1, pageNumber - 1, pageNumber, pageNumber + 1, pageNumber];
    pages = [...new Set(arr)].filter((num) => num !== 0);
  }

  const pagination = pages.map((page, i) => (
    <NavLink
      to={{
        pathname: `/browse-ads/${page}`,
        search: link
      }}
      key={i}
      className="pagination__number"
      activeClassName="pagination__number-active"
      exact
    >
      {page}
    </NavLink>
  ));

  const previousLink = `/browse-ads/${pageNumber - 1}/${link}`;
  const nextLink = `/browse-ads/${pageNumber + 1}/${link}`;

  return (
    <div className="pagination">
      {pageNumber > 1 && (
        <Link to={previousLink} className="pagination__number">
          &#60;
        </Link>
      )}
      {pagination}
      {pageNumber < pagesNumber && (
        <Link to={nextLink} className="pagination__number">
          &#62;
        </Link>
      )}
    </div>
  );
};

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired
};

export default Pagination;
