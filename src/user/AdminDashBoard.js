import React from 'react';
import Base from '../core/Base';
import { isAuthenticate } from '../auth/helper/index';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticate();

  const leftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-light text-dark">ADMIN NAVIGATION</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-info">
              Create Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link text-info">
              Manage Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-info">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-info">
              Manage Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-info">
              Manage Order
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const rightSide = () => {
    return (
      <div className="card m-2">
        <h4 className="card-header"> ADMIN INFOMATION</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success">Name:</span>
            {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success">Email</span>
            {email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-danger">YOU ARE ADMIN</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      Title="WELCOME TO ADMIN AREA"
      Description="MANAGE ALL OF YOUR PRODUCTS HERE"
      childrenProp="container mx-auto row"
      titleClass="display-3"
    >
      <div className="col-12 col-md-3"> {leftSide()}</div>
      <div className="col-12 col-md-9"> {rightSide()}</div>
    </Base>
  );
};

export default AdminDashboard;
