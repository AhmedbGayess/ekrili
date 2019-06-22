import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import avatar from "../../images/avatar.png";

class UserInfo extends React.Component {
  render() {
    const { name, email, phone, image } = this.props.user;
    return (
      <div className="user-info">
        <img src={avatar} alt="avatar" className="user-info__image" />
        <p>Nom: {name}</p>
        <p>Adresse Email: {email}</p>
        <p>Numéro de téléphone: {phone}</p>
      </div>
    );
  }
}

UserInfo.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(UserInfo);
