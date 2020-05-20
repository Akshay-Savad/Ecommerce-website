import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Base from "../core/Base";

import { signin, authenticate, isAuthenticate } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "akshay@gmail.com",
    password: "12345",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;

  const { token, user } = isAuthenticate();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("Signin request failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      console.log("User JSON", user, "Token Value", token);
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticate()) {
      return <Redirect to="/" />;
    }
  };

  //using loadingMessage component in signUpForm Component :: for error/bug refer there
  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading......</h2>
        </div>
      )
    );
  };

  //using errorMessage component in signUpForm Component :: for error/bug refer there
  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          {loadingMessage()}
          {errorMessage()}
          <form>
            <div className="form-group">
              <label className="text-dark"> Email</label>
              <input
                onChange={handleChange("email")}
                value={email}
                className="form-control"
                type="text"
              />
            </div>
            <div className="form-group">
              <label className="text-dark"> password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control"
                type="password"
              />
            </div>
            <button onClick={onSubmit} className="btm btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base Title="SIGNIN PAGE" Description="SIGNIN WITH YOUR EMAIL">
      {/* loadingMessage and errorMessage componet is in signInForm  */}
      {signInForm()}
      {performRedirect()}
      <p className="text-dark text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;
