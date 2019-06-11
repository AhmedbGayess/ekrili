import React from "react";
import PropTypes from "prop-types";
import { governorates } from "../../utils/locations.js";
import FormInputSelect from "../common/FormInputSelect";
import setDelegation from "../../utils/setDelegation.js";

const CreateAdLocation = ({
  governorate,
  governorateError,
  touchedGovernorate,
  delegationError,
  touchedDelegation
}) => {
  const delegations = setDelegation(governorate);

  return (
    <div>
      <FormInputSelect
        name="governorate"
        label="Gouvernorat"
        choices={governorates}
        error={governorateError}
        touched={touchedGovernorate}
      />
      {delegations.length > 0 && (
        <FormInputSelect
          name="delegation"
          label="Délégation"
          choices={delegations}
          error={delegationError}
          touched={touchedDelegation}
        />
      )}
    </div>
  );
};

CreateAdLocation.propTypes = {
  governorate: PropTypes.string.isRequired,
  governorateError: PropTypes.string,
  touchedGovernorate: PropTypes.bool,
  delegationError: PropTypes.string,
  touchedDelegation: PropTypes.bool
};

export default CreateAdLocation;
