import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";

const SubCategoriesCard = ({
  subCategories,
  subCategoriesOpen,
  openSubCategories,
  closeSubCategories,
  close
}) => {
  const onLinkClick = () => {
    close();
    closeSubCategories();
  };

  const subCategoriesList = subCategories.map((subCategory) => (
    <li key={subCategory._id}>
      <Link
        className="sidebar__list-item"
        to={`/browse-ads/1?subCategory=${subCategory._id}`}
        onClick={onLinkClick}
      >
        {subCategory.name}
      </Link>
    </li>
  ));
  return (
    <ul
      className={classNames("subcategories-card sidebar__list", {
        "subcategories-card-open": subCategoriesOpen
      })}
      onMouseEnter={openSubCategories}
      onMouseLeave={closeSubCategories}
    >
      {subCategoriesList}
    </ul>
  );
};

SubCategoriesCard.propTypes = {
  subCategories: PropTypes.array.isRequired
};

export default SubCategoriesCard;
