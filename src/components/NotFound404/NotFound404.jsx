import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { disableNotFound } from "../../actions/index";
import "./NotFound404.scss";

const NotFound404 = (props) => {
  return (
    <section className="not-found-container">
      <h1 className="not-found">Oops!</h1>
      <h3 className="not-found-desc">404- PAGE NOT FOUND</h3>
      <p className="not-found-info">
        The folder you are looking for might have been removed or temporarily
        unavailable.
      </p>
      <div className="dashboard-link-wrapper">
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <button onClick={props.disableNotFound} className="dashboard-link">
            Back to dashboard
          </button>
        </Link>
      </div>
    </section>
  );
};

export default connect(null, { disableNotFound })(NotFound404);
