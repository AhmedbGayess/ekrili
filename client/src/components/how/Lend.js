import React from "react";
import Step from "./Step";

const Lend = () => (
  <div className="how__section">
    <div className="container">
      <h2 className="how__section__title">Vous avez quelque chose à louer?</h2>

      <div className="how__section__steps">
        <Step number={1} text="Inscrivez vous à notre site ou connectez vous à votre compte si vous en avez déja un" />
        <Step
          number={2}
          text="Publiez votre annonce avec des détails, des images et un prix de location par jour"
        />
        <Step
          number={3}
          text="Si quelqu'un vous contacte à propos de votre annonce, arrangez un rendez-vous, fixez un délai, écrivez idéalement un contrat pour vous protéger contre le vol ou les dégâts et récupérez votre payement"
        />
        <Step number={4} text="Récupérez votre article et recommencez!" />
      </div>
    </div>
  </div>
);

export default Lend;
