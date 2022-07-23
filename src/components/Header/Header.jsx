import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";

import Logo from "./favicon.svg";
import "./Header.scss";
import { fetchUser, activeDropdown } from "./../../actions/index";

class Header extends React.Component {
  loginButtonHandler = () => {
    if (!this.props.user) {
      return <Spinner animation="border" variant="info" />;
    } else if (this.props.user.statusCode === 200) {
      return (
        <picture
          className="userProfile"
          onClick={(event) => {
            this.props.activeDropdown("logout-btn");
            event.stopPropagation();
          }}
        >
          <span className="userEmail">
            <i
              className="bi bi-caret-down-fill"
              style={{ marginRight: ".3rem" }}
            ></i>
            {this.props.user.user.email}
          </span>
          <img
            className="header-img userProfile-img"
            src={this.props.user.user.photo}
            alt="user"
          />
        </picture>
      );
    } else {
      return (
        <a href="/auth/google" className="login-button">
          Login <span className="googleButtonText">with google</span>{" "}
          <i className="bi bi-google"></i>
        </a>
      );
    }
  };

  logoNavigate = () => {
    if (!this.props.user) return "/";
    else if (this.props.user.statusCode === 200) return "/dashboard";
    return "/";
  };

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <header className="header">
        <nav className="container d-flex justify-content-between align-items-center pt-2 pb-2">
          <Link to={this.logoNavigate()} style={{ textDecoration: "none" }}>
            <picture className="logo d-flex align-items-center">
              <img
                className="header-img logo-img"
                src={Logo}
                alt="logo of website"
              />{" "}
              Folder List
            </picture>
          </Link>
          <div className="login-logout">
            {this.loginButtonHandler()}
            {this.props.activeDropdownState === "logout-btn" ? (
              <a
                href="/auth/google/logout"
                id="logout-btn"
                className="logout-button"
              >
                Logout <span className="triangle"></span>
              </a>
            ) : null}
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user, activeDropdownState: state.activeDropdown };
};

export default connect(mapStateToProps, { fetchUser, activeDropdown })(Header);
