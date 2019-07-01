import React from "react";
import save from "../../images/save-money.png";
import success from "../../images/success.png";
import idea from "../../images/idea.png";

const HomeUsers = () => (
  <div className="home-users">
    <div className="container">
      <h1 className="home-users__title">
        Vous pouvez dès aujourd'hui gagner de l'argent et faire des économies!
      </h1>
      <div className="home-users__sections">
        <div className="home-users__sections__section">
          <h2 className="home-users__sections__section__title">
            Plus besoin de tout acheter
          </h2>
          <img
            src={idea}
            className="home-users__sections__section__icon"
            alt="idea"
          />
          <p className="home-users__sections__section__description">
            Si vous avez besoin de quelque chose pour une courte période ou si
            vous ne pouvez pas l'acheter, vous pouvez la louer pour une petite
            fraction de son prix puis la retourner à son propriétaire.
          </p>
        </div>
        <div className="home-users__sections__section">
          <h2 className="home-users__sections__section__title">
            Gagnez de l'argent sans effort
          </h2>
          <img
            src={save}
            className="home-users__sections__section__icon"
            alt="idea"
          />

          <p className="home-users__sections__section__description">
            Offrez à louer ce que vous possédez déja, que vous l'utiliez
            occasionnellement ou pas du tout. Celà vous aidera à augmenter votre
            revenu sans faire d'effort ou de dépenser de l'argent.
          </p>
        </div>
        <div className="home-users__sections__section">
          <h2 className="home-users__sections__section__title">
            Atteignez un plus large public
          </h2>
          <img
            src={success}
            className="home-users__sections__section__icon"
            alt="idea"
          />

          <p className="home-users__sections__section__description">
            Vous êtes déja dans le domaine de la location? Vous pouvez
            maintenant atteindre un nombre plus large de clients potentiels et
            booster votre business.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default HomeUsers;
