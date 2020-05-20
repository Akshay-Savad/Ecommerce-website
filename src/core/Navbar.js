import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticate } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#000000" };
  } else {
    return { color: "#ffffff" };
  }
};

const Navbar = ({ history }) => (
  <div style={{ backgroundColor: "#487EB0" }}>
    <ul className="nav nav-tabs">
      <li className="nav-item active">
        <Link
          style={currentTab(history, "/")}
          className="nav-link text-body"
          to="/"
        >
          Home
        </Link>
      </li>
      <li className="nav-item active">
        <Link
          style={currentTab(history, "/cart")}
          className="nav-link"
          to="/cart"
        >
          Cart
        </Link>
      </li>
      {isAuthenticate() && isAuthenticate().user.role === 0 && (
        <li className="nav-item active">
          <Link
            style={currentTab(history, "/user/dashboard")}
            className="nav-link"
            to="/user/dashboard"
          >
            Dashboard
          </Link>
        </li>
      )}
      {isAuthenticate() && isAuthenticate().user.role === 1 && (
        <li className="nav-item active">
          <Link
            style={currentTab(history, "/admin/dashboard")}
            className="nav-link"
            to="/admin/dashboard"
          >
            A. Dashboard
          </Link>
        </li>
      )}
      {!isAuthenticate() && (
        <React.Fragment>
          <li className="nav-item active">
            <Link
              style={currentTab(history, "/signin")}
              className="nav-link"
              to="/signin"
            >
              SignIn
            </Link>
          </li>
          <li className="nav-item active">
            <Link
              style={currentTab(history, "/signup")}
              className="nav-link"
              to="/signup"
            >
              Sign Up
            </Link>
          </li>
        </React.Fragment>
      )}
      {isAuthenticate() && (
        <li className="nav-item active">
          <span
            className="nav-link"
            style={{ color: "#74B9FF" }}
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Sign Out
          </span>
        </li>
      )}
    </ul>
  </div>
);

export default withRouter(Navbar);
