import React from "react";
import fraud from "../../images/fraud.png";

const HomeProtect = () => (
  <div className="home-protect">
    <div className="container">
      <h1 className="home-protect__title">Comment vous protéger ?</h1>
      <img src={fraud} alt="thief" className="home-protect__icon" />
      <p className="home-protect__description">
        Pour vous protéger contre le vol ou les dégâts, tout ce qu'il vous faut
        est un papier et un stylo et la loi tunisienne se charge de vous
        protéger! écrivez un contrat (pas nécessairement légalisé) ou vous citez
        l'état du bien, la durée de la location et le consentement à payer le
        dédommagement si quelque chose arrive à votre article. N'oubliez pas de
        mettre les noms et les numéros de carte d'identité des deux partis et le
        tour est joué!
      </p>
    </div>
  </div>
);

export default HomeProtect;
