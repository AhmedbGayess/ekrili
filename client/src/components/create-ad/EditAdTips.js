import React from "react";
import { FaRegLightbulb } from "react-icons/fa";
import PropTypes from "prop-types";

const EditAdTips = ({ step }) => {
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
  } else if (step === 2) {
    content = (
      <ul className="tips-list">
        <li className="tips-list-item">
          <span className="tips-list-item-number">1.</span> Essayez d'anticiper
          ce qu'on va vous demander à propos de votre article et includez-le
          dans votre déscription.
        </li>
        <li className="tips-list-item">
          <span className="tips-list-item-number">2.</span> N'hésitez pas à
          décrire l'état de votre article et tout ce qu'il inclut.
        </li>
      </ul>
    );
  } else if (step === 3) {
    content = (
      <ul className="tips-list">
        <li className="tips-list-item">
          Préciser votre location permettra aux personnes proches de vous de
          retrouver votre article plus facilement.
        </li>
      </ul>
    );
  } else if (step === 4) {
    content = (
      <ul className="tips-list">
        <li className="tips-list-item">
          <span className="tips-list-item-number">1.</span> Fixez le prix de
          location par jour de votre article. Vous pouvez parcourir la liste des
          articles dans la même catégorie que le votre pour avoir une idée de
          combien les autres utilisateurs chargent pour leur articles.
        </li>
        <li className="tips-list-item">
          <span className="tips-list-item-number">2.</span> Nous calculons pour
          vous le coût de location par semaine et par mois en arrondissant le
          montant.
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

EditAdTips.propTypes = {
  step: PropTypes.number.isRequired
};

export default EditAdTips;
