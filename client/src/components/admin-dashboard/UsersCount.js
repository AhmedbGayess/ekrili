import React from "react";
import { connect } from "react-redux";
import { getUsers } from "../../store/actions/users";

class UsersCount extends React.Component {
  componentDidMount() {
    this.props.getUsers(0);
  }

  render() {
    return (
      <div className="dashboard__counts__card">
        <h3>Nombre de comptes sur le site</h3>
        <h2>{this.props.count}</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.users.count
});

export default connect(
  mapStateToProps,
  { getUsers }
)(UsersCount);
