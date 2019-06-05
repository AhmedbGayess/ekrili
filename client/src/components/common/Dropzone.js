import React from "react";
import Dropzone from "react-dropzone";
import { MdAddAPhoto } from "react-icons/md";
import PropTypes from "prop-types";

const ImageZone = ({ onDrop, loading }) => (
  <Dropzone
    onDrop={onDrop}
    className="dropzone"
    multiple={false}
    accept="image/*"
    disabled={loading}
  >
    {({
      getRootProps,
      getInputProps,
      isDragActive,
      isDragAccept,
      isDragReject
    }) => {
      return (
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          {loading && (
            <img
              src={require("../../images/image-loader.svg")}
              alt="Loader"
              className="dropzone-loader"
            />
          )}
          {!loading && (
            <div>
              <MdAddAPhoto className="dropzone-icon" />
              {isDragAccept && <p>Relâchez l'image ici</p>}
              {isDragReject && <p>Seules les images sont acceptées</p>}
              {!isDragActive && (
                <p>Cliquez ou déposez une image ici pour la télécharger</p>
              )}
            </div>
          )}
        </div>
      );
    }}
  </Dropzone>
);

ImageZone.propTypes = {
  onDrop: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default ImageZone;
