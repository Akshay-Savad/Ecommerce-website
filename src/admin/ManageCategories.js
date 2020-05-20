import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";
import {
  getAllCategory,
  updateCategory,
  getAllUniqueCategory,
  deleteCategory,
} from "./helper/adminapicall";
import { isAuthenticate } from "../auth/helper/index";

const { user, token } = isAuthenticate();

const ManageCategories = () => {
  //state variables
  const [categories, setCategories] = useState([]);
  const [alert, setAlert] = useState({
    error: false,
    success: false,
    categoryCanDelete: 2, //can't delete category since they are associate with products
    //2 means message not shown to user
    //0 means false and 1 means true
  });
  const [category, setCategory] = useState();
  const [showInput, setShowInput] = useState(false);

  const AllCategories = () => {
    getAllCategory().then((data) => {
      if (data.error) {
        setAlert({
          ...alert,
          error: true,
        });
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    AllCategories();
  }, []);

  const goBack = () => {
    return (
      <div className="my-3">
        <Link className="btn btn-md btn-light" to="/admin/dashboard">
          ADMIN HOME
        </Link>
      </div>
    );
  };

  const handleChange = (event) => {
    console.log("IN HANDLE CHANGE", category);
    setCategory({ ...category, name: event.target.value });
  };

  const inputBox = () => {
    return (
      <div className="row">
        <span className="col-sm-8">
          <input
            placeholder="ENTER UPDATED NAME"
            className="form-control"
            onChange={handleChange}
          />
        </span>
        <span className="col-sm-4">
          <button
            onClick={() => updateCate(category._id)}
            className="btn btn-success rounded"
          >
            UPDATE CATEGORY
          </button>
        </span>
      </div>
    );
  };

  const updateCate = (categoryId) => {
    updateCategory(user._id, categoryId, token, category).then((data) => {
      if (data.err) {
        setAlert({
          ...alert,
          error: true,
        });
        setCategory("");
      } else {
        setCategory("");
        setShowInput(false);
        setAlert({
          ...alert,
          success: true,
        });
        AllCategories();
      }
    });
  };

  const deleteACategory = (categoryId) => {
    let uniqueCategory = [];
    let flag = false; //FALSE MEANS DELETE PROPERTY

    getAllUniqueCategory().then((response) => {
      if (response.err) {
        setAlert({ ...alert, error: true });
        console.log("ERROR", response.err);
      } else {
        uniqueCategory = response;
        console.log("WE ARE IN ELSE PART");

        uniqueCategory.forEach((element) => {
          if (element === categoryId) {
            //WE CANNOT DELETE CATEGORY
            console.log("THIS CATEGORY CANNOT DELETE", element);
            flag = true;
          }
        });

        if (flag) {
          //WE CANNOT DELETE CATEGORY
          setAlert({ ...alert, categoryCanDelete: 0 });
        } else {
          //DELETE CATEGORY
          deleteCategory(categoryId, user._id, token).then((response) => {
            if (response.err) {
              setAlert({ ...alert, categoryCanDelete: 0 });
            } else {
              setAlert({ ...alert, categoryCanDelete: 1 });
            }
          });

          setAlert({ ...alert, categoryCanDelete: 1 });
        }

        AllCategories();
      }
    });
  };

  const deleteMessage = () => {
    return (
      <div>
        {alert.categoryCanDelete === 1 && (
          <div className="alert alert-success" role="alert">
            CATEGORY DELETE
          </div>
        )}

        {alert.categoryCanDelete === 0 && (
          <div className="alert alert-danger" role="alert">
            CATEGORY CANNOT DELETED SINCE IT'S BIND WITH SOME PRODUCTS
          </div>
        )}
      </div>
    );
  };

  const successMessage = () => {
    return (
      alert.success && (
        <div>
          <div className="alert alert-success" role="alert">
            Category Updated Succesfully
          </div>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      alert.error && (
        <div>
          <div className="alert alert-danger" role="alert">
            CATEGORY NOT UPDATED
          </div>
        </div>
      )
    );
  };

  const showCategory = () => {
    return (
      <div>
        {showInput && inputBox()}
        {categories &&
          categories.map((cate, index) => {
            return (
              <div key={index} className="row my-3 text-center">
                <div className="col-4">
                  <h2 className="text-left">{cate.name}</h2>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      setShowInput(!showInput);
                      setCategory(cate);
                    }}
                    className="btn btn-success rounded"
                  >
                    UPDATE
                  </button>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      deleteACategory(cate._id);
                    }}
                    className="btn btn-danger rounded"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    );
  };

  return (
    <Base
      Title="MANAGE YOUR CATEGORIES HERE"
      Description="UPDATE YOUR CATEGORIES HERE"
      className="container p-4 text-center"
    >
      {goBack()}
      {deleteMessage()}
      {successMessage()}
      {errorMessage()}
      {showCategory()}
    </Base>
  );
};

export default ManageCategories;
