import React from "react";
import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";

const Pagination = ({ count, search, pageNumber, link }) => {
  const pagesNumber = Math.ceil(count / 20);
  let pages = [];

  if (pagesNumber <= 5) {
    for (let i = 1; i <= pagesNumber; i++) {
      pages.push(i);
    }
  } else if (pageNumber === pagesNumber) {
    pages = [1, pageNumber - 2, pageNumber - 1, pagesNumber];
  } else {
    const middlePages = [pageNumber - 1, pageNumber, pageNumber + 1]
      .filter((page) => page !== 0)
      .filter((page) => page !== 1)
      .filter((page) => page !== pagesNumber);
    pages = [1, ...middlePages, pagesNumber];
  }

  const pagination = pages.map((page, i) => (
    <NavLink
      to={{
        pathname: `${link}/${page}`,
        search
      }}
      key={i}
      className="pagination__number"
      activeClassName="pagination__number-active"
      exact
    >
      {page}
    </NavLink>
  ));

  if (pageNumber === pagesNumber && pagesNumber > 5) {
    pagination.splice(
      pagination.length - 3,
      0,
      <span className="pagination__dots" key="end-dots">
        ...
      </span>
    );
  } else if (pagination.length <= 5 && pageNumber < pagesNumber - 2) {
    pagination.splice(
      pagination.length - 1,
      0,
      <span className="pagination__dots" key="end-dots">
        ...
      </span>
    );
  }

  if (pagesNumber >= 5 && pageNumber >= 4 && pageNumber !== pagesNumber) {
    pagination.splice(
      1,
      0,
      <span className="pagination__dots" key="start-dots">
        ...
      </span>
    );
  }

  const previousLink = `${link}/${pageNumber - 1}/${search}`;
  const nextLink = `${link}/${pageNumber + 1}/${search}`;

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
  link: PropTypes.string.isRequired,
  search: PropTypes.string
};

export default Pagination;
