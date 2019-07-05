import React, { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="contact">
      <div className="container">
        <h1 className="contact__title">Nous Contacter</h1>
        <p className="contact__text">
          Vous avez une question ou une proposition? Nous sommes à votre
          disposition par mail 7J/7 et sommes heureux de vous assister du mieux
          que nous pouvons.{" "}
        </p>
        <a className="contact__mail" href="mailto:contact@ekriha.com">
          contact@ekriha.com
        </a>
      </div>
    </div>
  );
};

export default Contact;
