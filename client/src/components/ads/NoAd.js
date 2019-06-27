import React from "react";
import { Link } from "react-router-dom";

const NoAd = () => (
  <div className="no-ad">
    <h3 className="no-ad__message">Aucune annonce trouvée.</h3>
    <Link to="/" className="no-ad__link">
      Retourner à la page d'acceuil
    </Link>
  </div>
);

export default NoAd;
