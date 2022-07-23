import React from "react";
import { connect } from "react-redux";
import { fetchFolder, createTodoItem, deleteAllTodoItem } from "../../actions";
import { Spinner } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import TodoItem from "../TodoItem/TodoItem";
import deleteIcon from "./delete-icon.svg";
import "./TodoList.scss";
import NotFound404 from "../NotFound404/NotFound404";

class TodoList extends React.Component {
  state = { activeTab: "All", newItem: "", borderColor: "#272727" };

  inputField = React.createRef();

  activeTab = (tab) => {
    if (tab === this.state.activeTab) return "tabs tabs-active";
    return "tabs";
  };

  setActiveTab = (event) =>
    this.setState({ activeTab: event.target.textContent.split(" ")[0] });

  onAddItemChange = (event) => {
    this.setState({ newItem: event.target.value });
  };

  onTodoItemSubmit = (event) => {
    event.preventDefault();

    if (this.state.newItem.trim()) {
      this.props.createTodoItem(this.props.activeTodoList._id, {
        status: "pending",
        payload: this.state.newItem.trim(),
      });
    }
    this.setState({ newItem: "" });
    this.inputField.current.focus();
  };

  renderTodoItem = () => {
    let list = this.props.activeTodoList.listData;

    if (this.state.activeTab === "Pending") {
      list = list.filter((item) => item.status === "pending");
    } else if (this.state.activeTab === "Completed") {
      list = list.filter((item) => item.status === "completed");
    }

    return list.map((item, index, allList) => {
      return (
        <TodoItem
          key={uuidv4()}
          index={index}
          status={item.status}
          payload={item.payload}
          extraClassName={allList.length === 1 ? "todo-item-single" : ""}
        />
      );
    });
  };

  deleteAllCompleted = () => {
    this.props.deleteAllTodoItem(this.props.activeTodoList._id);
  };

  renderDeleteAllBtn = () => {
    const completed =
      this.props.activeTodoList.listData.length -
      this.props.activeTodoList.pendingItem.length;
    if (this.state.activeTab === "Completed" && completed !== 0) {
      if (this.props.todoListRequestLoading === "delete all") {
        return (
          <div className="delete-all-spinner">
            <Spinner animation="border" variant="info" />
          </div>
        );
      }
      return (
        <button
          className="delete-all-completed"
          onClick={this.deleteAllCompleted}
        >
          Delete all <img src={deleteIcon} alt="delete all icon" />
        </button>
      );
    }
  };

  componentDidMount() {
    this.props.fetchFolder(null, this.props.match.params.id);
  }

  render() {
    if (this.props.notFound404) {
      return <NotFound404 />;
    } else if (!this.props.activeTodoList) {
      return (
        <div className="loading-screen">
          <Spinner animation="border" variant="info" />
        </div>
      );
    }

    return (
      <section className="todo-list-route">
        <div className="todo-list-route-container container">
          <header>
            <h1 className="todo-title">{this.props.activeTodoList.title}</h1>
            <p className="todo-desc">{this.props.activeTodoList.description}</p>
          </header>
          <section className="todo-list">
            <header className="todo-list-tabs">
              <button
                className={this.activeTab("All")}
                onClick={this.setActiveTab}
              >
                All ({this.props.activeTodoList.listData.length})
              </button>
              <button
                className={this.activeTab("Pending")}
                onClick={this.setActiveTab}
              >
                Pending ({this.props.activeTodoList.pendingItem.length})
              </button>
              <button
                className={this.activeTab("Completed")}
                onClick={this.setActiveTab}
              >
                Completed (
                {this.props.activeTodoList.listData.length -
                  this.props.activeTodoList.pendingItem.length}
                )
              </button>
            </header>
            {this.state.activeTab !== "Completed" ? (
              <form
                onFocus={() => this.setState({ borderColor: "#DF8654" })}
                onBlur={() => this.setState({ borderColor: "#272727" })}
                style={{ borderColor: this.state.borderColor }}
                onSubmit={this.onTodoItemSubmit}
                className="todo-form"
              >
                <input
                  type="text"
                  placeholder="Add Item"
                  value={this.state.newItem}
                  onChange={this.onAddItemChange}
                  ref={this.inputField}
                />
                {this.props.todoListRequestLoading === "create" ? (
                  <Spinner
                    animation="border"
                    variant="info"
                    style={{ marginTop: ".4rem", marginRight: "1.5rem" }}
                  />
                ) : (
                  <button>Add</button>
                )}
              </form>
            ) : null}
            <section className="todo-items">{this.renderTodoItem()}</section>
            {this.renderDeleteAllBtn()}
          </section>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeTodoList: state.activeTodoList,
    todoListRequestLoading: state.todoListRequestLoading,
    notFound404: state.notFound404,
  };
};

export default connect(mapStateToProps, {
  fetchFolder,
  createTodoItem,
  deleteAllTodoItem,
})(TodoList);
