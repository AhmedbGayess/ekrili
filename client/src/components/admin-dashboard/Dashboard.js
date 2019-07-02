import React from "react";
import AdsCount from "./AdsCount";
import UsersCount from "./UsersCount";
import axios from "axios";

class Dashboard extends React.Component {
  state = {
    loading: false
  };
  deleteUnusedImages = async () => {
    this.setState({ loading: true });
    await axios.delete("/upload/unused/delete");
    this.setState({ loading: false });
  };

  render() {
    return (
      <div className="container">
        <h1 className="my-2 text-center">Dashboard</h1>
        <div className="dashboard__counts">
          <AdsCount />
          <UsersCount />
        </div>
        <button
          className="btn-primary dashboard__delete"
          onClick={this.deleteUnusedImages}
        >
          {this.state.loading
            ? "Suppression en cours"
            : "Supprimer les images non utilisées"}
        </button>
      </div>
    );
  }
}

export default Dashboard;
