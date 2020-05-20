import React from "react";
import "../styles.css";
import Navbar from "./Navbar";

const Base = ({
  Title = "HOME PAGE",
  Description = "BETTER MARKET PLACE!!",
  className = "container-fluid text-dark text-center",
  childrenProp = "container",
  children,
}) => (
  <React.Fragment>
    <div className="wrapper">
      <Navbar />
      <div className={className}>
        <div className="display-2">{Title}</div>
        <h2 className="lead">{Description}</h2>
      </div>

      <div className={childrenProp}>{children}</div>
    </div>
    <div>
      <footer className="row container-fluid fixed-bottom mx-auto text-white text-center bg-dark footer py-1">
        <div className="col-sm">ABOUT</div>
        <div className="col-sm">HELP</div>
        <div className="col-sm">POLICY</div>
        <div className="col-sm">SOCIAL</div>
        <div className="col-sm">MAIL</div>
        <div className="col-sm">OFFICAL ADDRESS</div>
      </footer>
    </div>
  </React.Fragment>
);

export default Base;
