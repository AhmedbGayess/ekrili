import React from "react";
import Dropzone from "react-dropzone";
import classNames from "classnames";
import PropTypes from "prop-types";
import { MdAddAPhoto } from "react-icons/md";

import image from "../../images/image-loader.svg";

const UserImage = ({ onDrop, loading }) => (
  <Dropzone
    onDrop={onDrop}
    className="dropzone"
    multiple={false}
    accept="image/*"
    disabled={loading}
  >
    {({ getRootProps, getInputProps }) => {
      return (
        <div
          {...getRootProps()}
          className={classNames("user-dropzone", {
            "user-dropzone__uploading": loading
          })}
        >
          <input {...getInputProps()} />
          {loading && (
            <img src={image} alt="Loader" className="dropzone-loader" />
          )}
          {!loading && (
            <div className="user-dropzone__upload">
              <MdAddAPhoto className="user-dropzone__icon" />
            </div>
          )}
        </div>
      );
    }}
  </Dropzone>
);

UserImage.propTypes = {
  onDrop: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default UserImage;
