import React from "react";
import { connect } from "react-redux";
import { deleteTodoItem, editTodoItem, activeDropdown } from "../../actions";
import { Spinner } from "react-bootstrap";
import "./TodoItem.scss";

class TodoItem extends React.Component {
  state = {
    checked: this.props.status === "completed" ? true : false,
    editedValue:
      this.props.todoListRequestLoading === `edit ${this.props.index}`
        ? ""
        : this.props.payload,
  };

  checkedItemClass = () => {
    if (this.props.status === "completed")
      return "todo-item-value todo-item-value-checked";
    return "todo-item-value";
  };

  cantEditCompleted = () => {
    if (this.props.status === "completed") return "invisible";
    return "";
  };

  onDeleteItem = () => {
    this.props.deleteTodoItem(this.props.activeTodoList._id, this.props.index);
  };

  changeStatus = () => {
    this.props.editTodoItem(
      this.props.activeTodoList._id,
      this.props.index,
      {
        status: this.props.status === "completed" ? "pending" : "completed",
        payload: this.props.payload,
      },
      true
    );
  };

  spinnerIfLoadingDelete = () => {
    const loadingtype = this.props.todoListRequestLoading;
    let { index } = this.props;
    if (loadingtype && loadingtype.startsWith("delete")) {
      let id = +loadingtype.split(" ")[1];
      if (id === index) {
        return (
          <span style={{ margin: ".53rem 0" }}>
            <Spinner animation="border" variant="info" />
          </span>
        );
      }
    }
    return <i className="bi bi-x exit-icon" onClick={this.onDeleteItem}></i>;
  };

  activateEditMode = (event) => {
    event.stopPropagation();
    this.props.activeDropdown(
      `todo-item-edit ${this.props.activeTodoList._id} ${this.props.index}`
    );
  };

  freezeEditMode = (event) => {
    this.activateEditMode(event);
    this.activateEditMode(event);
  };

  onTodoItemEdit = (event) => {
    event.preventDefault();

    if (this.state.editedValue.trim()) {
      this.props.editTodoItem(this.props.activeTodoList._id, this.props.index, {
        status: "pending",
        payload: this.state.editedValue,
      });
    } else {
      this.props.editTodoItem(this.props.activeTodoList._id, this.props.index, {
        status: "pending",
        payload: "Empty String",
      });
    }
  };

  onEditItemChange = (event) => {
    this.setState({ editedValue: event.target.value });
  };

  render() {
    return (
      <section className={`todo-item ${this.props.extraClassName}`}>
        {this.props.activeDropdownState ===
        `todo-item-edit ${this.props.activeTodoList._id} ${this.props.index}` ? (
          <form
            onSubmit={this.onTodoItemEdit}
            onClick={this.freezeEditMode}
            className="todo-edit-form"
          >
            <input
              type="text"
              placeholder={
                this.props.todoListRequestLoading === `edit ${this.props.index}`
                  ? "Loading..."
                  : "Edit item"
              }
              value={this.state.editedValue}
              onChange={this.onEditItemChange}
              required
              autoFocus
            />
            {this.props.todoListRequestLoading ===
            `edit ${this.props.index}` ? (
              <Spinner
                animation="border"
                variant="info"
                style={{ marginTop: ".22rem", marginRight: "1.5rem" }}
              />
            ) : (
              <button>Edit</button>
            )}
          </form>
        ) : (
          <React.Fragment>
            <label className={this.checkedItemClass()}>
              <input
                type="checkbox"
                checked={this.state.checked}
                onChange={this.changeStatus}
              />
              {this.props.payload}
            </label>
            <div className="todo-item-settings">
              <i
                onClick={(event) => {
                  this.activateEditMode(event);
                  this.setState({ editedValue: this.props.payload });
                }}
                className={"bi bi-pencil-square" + this.cantEditCompleted()}
              ></i>
              {this.spinnerIfLoadingDelete()}
            </div>
          </React.Fragment>
        )}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeTodoList: state.activeTodoList,
    todoListRequestLoading: state.todoListRequestLoading,
    activeDropdownState: state.activeDropdown,
  };
};

export default connect(mapStateToProps, {
  deleteTodoItem,
  editTodoItem,
  activeDropdown,
})(TodoItem);
