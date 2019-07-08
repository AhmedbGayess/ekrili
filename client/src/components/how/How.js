import React from "react";
import { Helmet } from "react-helmet";
import Rent from "./Rent";
import Lend from "./Lend";

const How = () => (
  <div className="how">
    <Helmet>
      <title>Ekriha.com | Comment ça marche</title>
    </Helmet>
    <h1 className="how__title">Comment ça marche?</h1>
    <Rent />
    <Lend />
  </div>
);

export default How;
