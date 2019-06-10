import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const CreateAdProgress = ({ step }) => {
  let subtitle;
  if (step === 1) {
    subtitle = <h3>Qu'avez-vous à louer?</h3>;
  }
  if (step === 2) {
    subtitle = <h3>Décrivez votre article</h3>;
  }
  return (
    <div className="my-3">
      <div className="progress-bar">
        <div
          className={classNames({
            "progress-bar__quarter": step === 1,
            "progress-bar__half": step === 2,
            "progress-bar__three-quarters": step === 3,
            "progress-bar__full": step === 4
          })}
        />
      </div>
      <h1 className="my-1">Étape {step}</h1>
      {subtitle}
    </div>
  );
};

CreateAdProgress.propTypes = {
  step: PropTypes.number.isRequired
};

export default CreateAdProgress;
