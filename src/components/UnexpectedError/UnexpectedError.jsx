import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { errorDestroyer } from "../../actions";

import "./UnexpectedError.scss";

class UnexpectedError extends React.Component {
  onExitError = (event) => {
    this.props.errorDestroyer();
    event.stopPropagation();
  };

  render() {
    return ReactDOM.createPortal(
      <div className="dim-background" onClick={this.onExitError}>
        <section
          className="error-modal"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="error-heading">
            <h4>{this.props.unexpectedError.heading}</h4>
            <i className="bi bi-x" onClick={this.onExitError}></i>
          </div>
          <hr />
          <p className="error-message">{this.props.unexpectedError.text}</p>
        </section>
      </div>,
      document.getElementById("unexpected-error")
    );
  }
}

const mapStateToProps = (state) => {
  return {
    unexpectedError: state.unexpectedError,
  };
};

export default connect(mapStateToProps, { errorDestroyer })(UnexpectedError);
