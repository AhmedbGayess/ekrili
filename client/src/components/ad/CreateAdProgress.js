import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const CreateAdProgress = ({ step }) => (
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
    <h1>Étape {step}</h1>
  </div>
);

CreateAdProgress.propTypes = {
  step: PropTypes.number.isRequired
};

export default CreateAdProgress;
