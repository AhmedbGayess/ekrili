import React from "react";
import Step from "./Step";

const Rent = () => (
  <div className="how__section">
    <div className="container">
      <h2 className="how__section__title">Vous voulez louer quelque chose?</h2>
      <div className="how__section__steps">
        <Step
          number={1}
          text="Parcourez les annonces et cherchez ce dont vous avez besoin"
        />
        <Step
          number={2}
          text="Contactez le propriétaire et arrangez un rendez-vous"
        />
        <Step number={3} text="Payez le propriétaire et récupérez l'article" />
        <Step
          number={4}
          text="Retournez l'article dans les délais comme convenu avec le propriétaire"
        />
      </div>
    </div>
  </div>
);

export default Rent;
