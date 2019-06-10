import React from "react";
import { FaRegLightbulb } from "react-icons/fa";
import PropTypes from "prop-types";

const CreatAdTips = ({ step }) => {
  let content;
  if (step === 1) {
    content = (
      <ul className="tips-list">
        <li className="tips-list-item">
          <span className="tips-list-item-number">1.</span> Choisissez un titre
          qui décrit bien ce que vous avez à louer.
        </li>
        <li className="tips-list-item">
          <span className="tips-list-item-number">2.</span> Il est préférable de
          mettre de vraies photos de votre article. Les gens préfèrent voir un
          article avant de le prendre.
        </li>
        <li className="tips-list-item">
          <span className="tips-list-item-number">3.</span> La première photo
          sera la couverture de votre annonce.
        </li>
      </ul>
    );
  }
  return (
    <div className="tips">
      <FaRegLightbulb className="tips-bulb" />
      <h2>Astuces</h2>
      {content}
    </div>
  );
};

CreatAdTips.propTypes = {
  step: PropTypes.number.isRequired
};

export default CreatAdTips;
