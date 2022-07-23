import React from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";
import {
  onModalFieldChange,
  activeDropdown,
  updateFolder,
  folderModalState,
} from "./../../actions/index";
import { Spinner } from "react-bootstrap";
import "./CreateFolderModal.scss";

class CreateFolder extends React.Component {
  onExitModal = () => {
    this.props.onModalFieldChange("title", "");
    this.props.onModalFieldChange("desc", "");
    this.props.activeDropdown("exit-modal-btn");
    this.props.folderModalState("");
  };

  onSubmit = (event) => {
    event.preventDefault();

    if (this.props.folderModalStateValue === "create") {
      this.props.createFolder(
        this.props.modalTitle.trim(),
        this.props.modalDesc.trim()
      );
    } else if (this.props.folderModalStateValue.startsWith("edit")) {
      const folderID = this.props.folderModalStateValue.split(" ")[1];
      const title = this.props.modalTitle.trim();
      const description = this.props.modalDesc
        ? this.props.modalDesc.trim()
        : undefined;
      this.props.updateFolder(folderID, {
        title,
        description,
      });
    }
  };

  modalHeading = () => {
    let heading = this.props.folderModalStateValue.split(" ")[0];
    let titleCase = heading[0].toUpperCase();
    return titleCase + heading.slice(1);
  };

  isButtonLoading = () => {
    if (this.props.isFolderCUDLoading) {
      return (
        <span className="loading-spinner">
          <Spinner animation="border" variant="info" />
        </span>
      );
    }
    return (
      <button className="add-folder-btn">
        {this.modalHeading() === "Create" ? "Create" : "Update"}
      </button>
    );
  };

  render() {
    return ReactDOM.createPortal(
      <div className="dim-background">
        <form
          onSubmit={this.onSubmit}
          onClick={(event) => event.stopPropagation()}
          className="add-folder-modal"
        >
          <div className="modal-heading">
            <div></div>
            <h4>{this.modalHeading()} Folder</h4>
            <div className="exit-modal-btn" onClick={this.onExitModal}>
              <i className="bi bi-x"></i>
            </div>
          </div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            autoFocus
            required
            value={this.props.modalTitle}
            onChange={(event) =>
              this.props.onModalFieldChange("title", event.target.value)
            }
          />
          <input
            type="text"
            name="desc"
            placeholder="Description"
            value={this.props.modalDesc || ""}
            onChange={(event) =>
              this.props.onModalFieldChange("desc", event.target.value)
            }
          />
          {this.isButtonLoading()}
        </form>
      </div>,
      document.getElementById("create-folder-modal")
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modalTitle: state.modalTitle,
    modalDesc: state.modalDesc,
    folderModalStateValue: state.folderModalState,
    isFolderCUDLoading: state.isFolderCUDLoading,
  };
};

export default connect(mapStateToProps, {
  onModalFieldChange,
  activeDropdown,
  updateFolder,
  folderModalState,
})(CreateFolder);
