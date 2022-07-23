import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  activeDropdown,
  onModalFieldChange,
  folderModalState,
  fetchFolder,
} from "../../actions";
import "./FolderCard.scss";
import generateTemplate from "./generateTemplate";

class FolderCard extends React.Component {
  onEditClick = (event) => {
    this.props.onModalFieldChange("title", this.props.heading);
    this.props.onModalFieldChange("desc", this.props.desc);
    this.props.activeDropdown("create-folder");
    event.stopPropagation();
  };

  onDeleteClick = (event) => {
    this.props.activeDropdown("delete-folder");
    this.props.folderModalState(
      `delete-${this.props.folderID}-${this.props.heading}`
    );
    event.stopPropagation();
  };

  onHeadingClick = () => {
    this.props.fetchFolder(this.props.doc);
  };

  onDownloadClick = () => {
    const folder = this.props.folders.filter(
      (item) => item._id === this.props.folderID
    )[0];

    const template = generateTemplate(
      folder.title,
      folder.description,
      new Date(folder.createdAt).toDateString(),
      new Date(folder.updatedAt).toDateString(),
      folder.listData
    );

    const a = document.createElement("a");
    const newFile = new Blob(template, { type: "text/html" });
    a.download = `${folder.title}`;
    a.href = URL.createObjectURL(newFile);
    a.click();
  };

  activeSettingsClassName = () => {
    if (this.props.activeDropdownState === this.props.folderID) {
      return "bi-gear-fill bi-gear-fill-active";
    }
    return "bi-gear-fill";
  };

  render() {
    return (
      <section className="folderCard">
        <div
          className="settings-icon"
          onClick={(event) => {
            this.props.activeDropdown(this.props.folderID);
            this.props.folderModalState(`edit ${this.props.folderID}`);
            event.stopPropagation();
          }}
        >
          <i className={`bi ${this.activeSettingsClassName()}`}></i>
          {this.props.activeDropdownState === this.props.folderID ? (
            <div className="folder-settings">
              <p onClick={this.onDownloadClick}>Download</p>
              <p onClick={this.onEditClick}>Edit</p>
              <p className="folder-delete" onClick={this.onDeleteClick}>
                Delete
              </p>
            </div>
          ) : null}
        </div>
        <Link
          to={"/dashboard/" + this.props.folderID}
          style={{
            textDecoration: "none",
            display: "block",
            maxWidth: "max-content",
            margin: "0",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          onClick={this.onHeadingClick}
        >
          <h4 className="folderCard-heading">{this.props.heading}</h4>
        </Link>
        <p className="folderCard-desc">{this.props.desc}</p>
        <div className="folderCard-date d-flex justify-content-between">
          <p>
            Created at
            <br />
            {this.props.createdAt}
          </p>
          <p>
            Updated at
            <br />
            {this.props.updatedAt}
          </p>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return { activeDropdownState: state.activeDropdown, folders: state.folders };
};

export default connect(mapStateToProps, {
  activeDropdown,
  onModalFieldChange,
  folderModalState,
  fetchFolder,
})(FolderCard);
