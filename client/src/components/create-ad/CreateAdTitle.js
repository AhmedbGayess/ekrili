import React from "react";
import PropTypes from "prop-types";
import FormInputField from "../common/FormInputField";
import CreateAdImage from "./CreateAdImage";

const CreateAdTitle = ({
  error,
  touched,
  imageOne,
  imageTwo,
  imageThree,
  addImage,
  removeImage
}) => (
  <div className="create-ad-title">
    <FormInputField
      name="title"
      label="Titre de l'annonce"
      error={error}
      touched={touched}
    />
    <div className="my-1">
      <h4 className="my-1">Ajoutez des images à votre annonce</h4>
      <div className="create-ad-images">
        <CreateAdImage
          image={imageOne}
          stateImage="imageOne"
          addImage={addImage}
          removeImage={removeImage}
        />
        <CreateAdImage
          image={imageTwo}
          stateImage="imageTwo"
          addImage={addImage}
          removeImage={removeImage}
        />
        <CreateAdImage
          image={imageThree}
          stateImage="imageThree"
          addImage={addImage}
          removeImage={removeImage}
        />
      </div>
    </div>
  </div>
);

CreateAdTitle.propTypes = {
  error: PropTypes.string,
  touched: PropTypes.bool,
  imageOne: PropTypes.string.isRequired,
  imageTwo: PropTypes.string.isRequired,
  imageThree: PropTypes.string.isRequired,
  addImage: PropTypes.func.isRequired,
  removeImage: PropTypes.func.isRequired
};

export default CreateAdTitle;
