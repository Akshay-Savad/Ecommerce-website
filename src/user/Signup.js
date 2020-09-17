import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Base from '../core/Base';
import { signup } from '../auth/helper/index';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: '',
            email: '',
            password: '',
            error: '',
            success: true,
          });
        }
      })
      .catch(console.log('Error in signup'));
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          {successMessage()}
          {errorMessage()}
          <form>
            <div className="form-group">
              <label className="text-dark"> Name</label>
              <input
                className="form-control"
                onChange={handleChange('name')}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-dark"> Email</label>
              <input
                className="form-control"
                onChange={handleChange('email')}
                type="text"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-dark"> password</label>
              <input
                className="form-control"
                onChange={handleChange('password')}
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={onSubmit}
              className="btm btn-success btn-block mb-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  //using successMessage component in signUpForm Component :: for error/bug refer there
  const successMessage = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? '' : 'none' }}
      >
        New Account Was created successfully. Please{' '}
        <Link to="/signin">Login</Link>
      </div>
    );
  };

  //using errorMessage component in signUpForm Component :: for error/bug refer there
  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? '' : 'none' }}
      >
        {error}
      </div>
    );
  };

  return (
    <Base Title="SIGNUP PAGE" Description="NEW TO OUR SITE">
      {signUpForm()}
    </Base>
  );
};

export default Signup;
