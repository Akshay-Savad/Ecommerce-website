import React from 'react';

//import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Route, Switch, HashRouter as Router, BrowserRouter } from 'react-router-dom';
import Home from './core/Home';
import signup from './user/Signup';
import signin from './user/Signin';

import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';

import UserDashboard from './user/UserDashBoard';
import AdminDashboard from './user/AdminDashBoard';

import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';
import AddProduct from './admin/AddProduct';
import ManageProduct from './admin/ManageProducts';
import ManageOrders from './admin/Orders';
import UpdateProduct from './admin/UpdateProduct';
import Cart from './core/Cart';

const Routes = () => {
  return (
    <BrowserRouter>
      {/* <Router> */}
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={signin} />
        <Route path="/signup" exact component={signup} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/admin/create/category" exact component={AddCategory} />
        <AdminRoute path="/admin/categories" exact component={ManageCategories} />
        <AdminRoute path="/admin/create/product" exact component={AddProduct} />
        <AdminRoute path="/admin/products" exact component={ManageProduct} />
        <AdminRoute path="/admin/orders" exact component={ManageOrders} />
        <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
        <Route path="/cart" exact component={Cart} />
      </Switch>
      {/* </Router> */}
    </BrowserRouter>
  );
};

export default Routes;
