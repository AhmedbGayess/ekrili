import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUsers, searchUsers } from "../../store/actions/users";
import Loader from "../common/Loader";
import Pagination from "../ads/Pagination";
import UserRow from "./UserRow";
import UsersSearchFrom from "./UsersSearchForm";

class AdminUsersPage extends React.Component {
  state = {
    search: ""
  };

  componentDidMount() {
    this.nextUsers();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.page !== this.props.match.params.page) {
      this.nextUsers();
    }
  }

  onSearchChange = (e) => {
    this.setState({ search: e.target.value });
  };

  onSubmitSearch = (e) => {
    e.preventDefault();
    this.props.searchUsers(this.state.search);
  };

  nextUsers = () => {
    const skip = this.props.match.params.page * 20 - 20;
    this.props.getUsers(skip);
  };

  render() {
    const { users, loading, count } = this.props.users;
    let content;
    if (loading || users === null) {
      content = <Loader />;
    } else {
      content = users.map((user) => <UserRow key={user._id} user={user} />);
    }
    return (
      <div className="container my-3">
        <UsersSearchFrom
          onChange={this.onSearchChange}
          value={this.state.search}
          onSubmit={this.onSubmitSearch}
        />
        <div className="users-table">
          <div className="users-table__header">
            <div className="users-table__header__cell">ID</div>
            <div className="users-table__header__cell">Nom</div>
            <div className="users-table__header__cell">Adresse Email</div>
            <div className="users-table__header__cell">Numéro de téléphone</div>
          </div>
          {content}
        </div>
        <Pagination
          count={count}
          search={this.props.location.search}
          pageNumber={Number(this.props.match.params.page)}
          link="/admin/users"
        />
      </div>
    );
  }
}

AdminUsersPage.propTypes = {
  users: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  users: state.users
});

export default connect(
  mapStateToProps,
  { getUsers, searchUsers }
)(AdminUsersPage);
