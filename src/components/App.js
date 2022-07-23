import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Landing from "./Landing/Landing";
import Header from "./Header/Header";
import Dashboard from "./Dashboard/Dashboard";
import UnexpectedError from "./UnexpectedError/UnexpectedError";
import TodoList from "./TodoList/TodoList";
import "./App.scss";
import {
  activeDropdown,
  onModalFieldChange,
  folderModalState,
} from "../actions";

class App extends React.Component {
  render() {
    return (
      <section
        onClick={() => {
          this.props.activeDropdown("app-container");
          this.props.onModalFieldChange("title", "");
          this.props.onModalFieldChange("desc", "");
          this.props.folderModalState("");
        }}
        className="app"
      >
        <BrowserRouter>
          <Header />
          <Route path="/" exact component={Landing} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/dashboard/:id" exact component={TodoList} />
        </BrowserRouter>
        <p className="footer-text">
          Full stack app coded by{" "}
          <a href="https://github.com/ramankarki">Raman Karki</a>
        </p>
        {this.props.unexpectedError ? <UnexpectedError /> : null}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return { unexpectedError: state.unexpectedError };
};

export default connect(mapStateToProps, {
  activeDropdown,
  onModalFieldChange,
  folderModalState,
})(App);
