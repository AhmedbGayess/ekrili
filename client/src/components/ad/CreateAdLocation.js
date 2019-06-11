import React from "react";
import PropTypes from "prop-types";
import { governorates } from "../../utils/locations.js";
import FormInputSelect from "../common/FormInputSelect";
import setDelegation from "../../utils/setDelegation.js";

const CreateAdLocation = ({ governorate }) => {
  const delegations = setDelegation(governorate);

  return (
    <div>
      <FormInputSelect
        name="governorate"
        label="Gouvernorat"
        choices={governorates}
      />
      {delegations.length > 0 && (
        <FormInputSelect
          name="delegation"
          label="Délégation"
          choices={delegations}
        />
      )}
    </div>
  );
};

CreateAdLocation.propTypes = {
  governorate: PropTypes.string.isRequired
};

export default CreateAdLocation;
