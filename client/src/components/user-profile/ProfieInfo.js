import React from "react";
import PropTypes from "prop-types";
import avatar from "../../images/avatar.png";

const ProfileInfo = ({ user }) => (
  <div className="profile-info">
    <div className="profile-info__image">
      {user.image && <img src={`/images/${user.image}`} alt={user.name} />}
      {!user.image && <img src={avatar} alt={user.name} />}
    </div>
    <div className="profile-info__text">
      <p>
        <span>Nom: </span>
        {user.name}
      </p>
      <p>
        <span>Bio: </span>
        {user.bio || "Pas de bio pour cet utilisateur"}
      </p>
    </div>
  </div>
);

ProfileInfo.propTypes = {
  user: PropTypes.object.isRequired
};

export default ProfileInfo;
