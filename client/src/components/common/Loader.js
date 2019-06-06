import React from "react";
import loader from "../../images/loader.svg";

const Loader = () => (
  <div className="loader-container">
    <img src={loader} alt="Chargement" className="loader-image" />
  </div>
);

export default Loader;
