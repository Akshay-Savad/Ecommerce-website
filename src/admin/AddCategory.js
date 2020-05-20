import React, { useState } from "react";
import { Link } from "react-router-dom";

import { isAuthenticate } from "../auth/helper/index";

import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticate();

  const goBack = () => {
    return (
      <div className="my-3">
        <Link className="btn btn-md btn-light" to="/admin/dashboard">
          ADMIN HOME
        </Link>
      </div>
    );
  };

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    //backend calling
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category Created Successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-error">Failed to Create Category</h4>;
    }
  };

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead text-light">Enter Category</p>
          <input
            type="text"
            className="form-control mb-3"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder="For Ex. Winter"
          />
          <button onClick={onSubmit} className="btn btn-outline-light">
            Create Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      Title="CREATE A CATEGORY HERE"
      Description="ADD NEW CATEGORY FOR NEW T-SHIRTS"
      className="container p-4 text-center"
    >
      <div className="row bg-dark rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
