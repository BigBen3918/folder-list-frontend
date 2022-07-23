import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

import { activeDropdown, folderModalState, deleteFolder } from "../../actions";
import { Spinner } from "react-bootstrap";
import "./DeleteModal.scss";

class DeleteModal extends React.Component {
  onCancelClick = (event) => {
    this.props.activeDropdown("exit-modal-btn");
    this.props.folderModalState("");
    event.stopPropagation();
  };

  deleteLoading = () => {
    if (this.props.isFolderCUDLoading) {
      return (
        <span className="delete-loading">
          <Spinner animation="border" variant="info" />
        </span>
      );
    }
    return (
      <button className="delete-btn" onClick={this.props.deleteFolder}>
        Delete
      </button>
    );
  };

  render() {
    return ReactDOM.createPortal(
      <div className="dim-background">
        <section
          className="delete-modal"
          onClick={(event) => event.stopPropagation()}
        >
          <h4 className="delete-heading">Delete Folder</h4>
          <hr />
          <p className="delete-que">
            Are you sure you want to delete '
            {this.props.folderModalStateValue.split("-")[2]}' folder ?
          </p>
          <div className="buttons">
            {this.deleteLoading()}
            <button className="cancel-btn" onClick={this.onCancelClick}>
              Cancel
            </button>
          </div>
        </section>
      </div>,
      document.getElementById("delete-modal")
    );
  }
}

const mapStateToProps = (state) => {
  return {
    folderModalStateValue: state.folderModalState,
    isFolderCUDLoading: state.isFolderCUDLoading,
  };
};

export default connect(mapStateToProps, {
  activeDropdown,
  folderModalState,
  deleteFolder,
})(DeleteModal);
