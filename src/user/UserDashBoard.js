import React, { useEffect, useState } from 'react';
import Base from '../core/Base';
import { getAllOrder } from './helper/userapicalls';
import { isAuthenticate } from '../auth/helper';

const UserDashboard = () => {
  const [orders, setOrders] = useState([]);

  const userId = isAuthenticate() && isAuthenticate().user._id;
  const token = isAuthenticate() && isAuthenticate().token;

  const getAllOrders = () => {
    getAllOrder(userId, token)
      .then((Response) => {
        setOrders(Response);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const showUserInfo = () => {
    return (
      <React.Fragment>
        <h5 style={{ display: 'inline' }}>
          <span className="badge badge-primary">Name</span>
          {isAuthenticate().user.name}
        </h5>
        <h5 className="ml-2" style={{ display: 'inline' }}>
          <span className="badge badge-primary">Email</span>{' '}
          {isAuthenticate().user.email}
        </h5>
      </React.Fragment>
    );
  };

  const showUserOrders = () => {
    if (!Boolean(Number(Array.isArray(orders) && orders.length))) {
      return <h2>Cart is Empty</h2>;
    } else {
      return (
        <React.Fragment>
          <div className="container-fluid row mx-auto my-3">
            {orders.map((order, primaryIndex) => {
              return (
                <React.Fragment>
                  <div className="col-12">
                    <div
                      key={primaryIndex}
                      className="card text-white bg-dark border my-2"
                    >
                      <div className="card-header border border-info">
                        <h4>Order Status: {order.status}</h4>
                      </div>
                      <div className="card-body">
                        <h5>Products</h5>
                        <hr style={{ backgroundColor: '#17a2b8' }} />
                        {order.products.map((singleProduct, index) => {
                          return (
                            <React.Fragment>
                              <div key={index} className="col-12">
                                <div className="card text-dark bg-light my-1">
                                  <div className="card-body d-flex justify-content-between">
                                    <h6>Product Name: {singleProduct.name}</h6>
                                    <h6>
                                      Product Price: ₹{singleProduct.price}
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            </React.Fragment>
                          );
                        })}
                      </div>
                      <div className="card-body">
                        <h5>Shipping Address</h5>
                        <hr style={{ backgroundColor: '#17a2b8' }} />
                        <div className="d-flex justify-content-between">
                          <h6> Customer Name: {order.address.name}</h6>
                          <h6> {order.address.address.line1}</h6>
                          <h6> {order.address.address.postal_code}</h6>
                        </div>
                        <div className="d-flex justify-content-between">
                          <h6> City: {order.address.address.city}</h6>
                          <h6> Country: {order.address.address.country}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </React.Fragment>
      );
    }
  };

  return (
    <Base Title="USER DASHBOARD">
      {showUserInfo()}
      {showUserOrders()}
    </Base>
  );
};

export default UserDashboard;
