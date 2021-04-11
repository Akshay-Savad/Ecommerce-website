import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import Base from '../core/Base';
// import Modal from '../core/Modal';

import { getAllOrder, updateStatus } from './helper/adminapicall';
import { isAuthenticate } from '../auth/helper';

Modal.setAppElement('#root');

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(orders ? orders[0] : {});
  const [orderStatus, setOrderStatus] = useState(
    orderDetails && orderDetails.status ? orderDetails : 'undefined'
  );

  const userId = isAuthenticate() && isAuthenticate().user._id;
  const token = isAuthenticate() && isAuthenticate().token;

  const callOrderApi = async () => {
    getAllOrder(userId, token).then((Response) => {
      setOrders(Response);
    });
    console.log(orders[0]);
  };

  useEffect(() => {
    callOrderApi();
  }, [setOrderStatus]);

  const callUpdateStatus = () => {
    updateStatus(userId, token, orderDetails, orderStatus);
  };

  const modalCompoenent = () => {
    return (
      <React.Fragment>
        {orderDetails ? (
          <Modal style={MODAL_STYLES} isOpen={isOpen}>
            <div className="d-flex justify-content-end ">
              <button
                type="button"
                className="btn btn-dark btn-sm mb-2"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Close
              </button>
            </div>
            <div style={ModalContent}>
              <div className="d-flex justify-content-between">
                <h6>
                  {' '}
                  Trans Id:{' '}
                  {orderDetails.transaction_id
                    ? orderDetails.transaction_id
                    : 'undefined'}
                </h6>
                <h6>
                  {' '}
                  Status:{' '}
                  {orderDetails.status ? orderDetails.status : 'undefined'}
                </h6>
              </div>
              <div className="d-flex align-item-center">
                <select
                  className="w-25 my-1 mx-2"
                  value={orderStatus ? orderStatus : 'undefined'}
                  onChange={(e) => {
                    setOrderStatus(e.target.value);
                  }}
                >
                  <option value="Placed">Placed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Deliverd">Deliverd</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <button
                  type="button"
                  className="btn btn-dark btn-sm"
                  onClick={() => {
                    callUpdateStatus();
                  }}
                >
                  Update Status
                </button>
              </div>
              <hr style={{ backgroundColor: 'black' }} />
              <h5>
                {' '}
                Customer Name:{' '}
                {orderDetails.address.name
                  ? orderDetails.address.name
                  : 'undefined'}
              </h5>
              <div className="d-flex justify-content-between">
                <h6>
                  {orderDetails.address.address.line1
                    ? orderDetails.address.address.line1
                    : 'undefined'}
                </h6>
                <h6>
                  {orderDetails.address.address.postal_code
                    ? orderDetails.address.address.postal_code
                    : 'undefined'}
                </h6>
              </div>
              <div className="d-flex justify-content-between">
                <h6>
                  {orderDetails.address.address.city
                    ? orderDetails.address.address.city
                    : 'undefined'}
                </h6>
                <h6>
                  {orderDetails.address.address.country
                    ? orderDetails.address.address.country
                    : 'undefined'}
                </h6>
              </div>
              <hr style={{ backgroundColor: 'black' }} />
              {orderDetails.products.map((product, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="d-flex justify-content-between">
                      <h5>Product Name: {product.name}</h5>
                      <h6>Count: {product.count}</h6>
                    </div>
                    <h6>Price: {product.price}</h6>
                  </React.Fragment>
                );
              })}
            </div>
          </Modal>
        ) : (
          ''
        )}
      </React.Fragment>
    );
  };

  const showAllOrders = () => {
    return (
      <React.Fragment>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Transaction Id</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>More Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              var d = new Date(order.createdAt);
              return (
                <React.Fragment key={index}>
                  <tr>
                    <td
                      onClick={() => {
                        setOrderDetails(order);
                        setIsOpen(!isOpen);
                      }}
                    >
                      {order.transaction_id}
                    </td>
                    <td>
                      {`${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`}
                    </td>
                    <td>
                      {`${
                        d.getHours() + 1
                      }:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}`}
                    </td>
                    <td>{order.status}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          setOrderDetails(order);
                          setIsOpen(!isOpen);
                        }}
                      >
                        More Details
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  };

  return (
    <Base Title="Manage Orders">
      {showAllOrders()}
      {modalCompoenent()}
    </Base>
  );
};

export default ManageOrders;

const ModalContent = {
  backgroundColor: '#fefefe',
  margin: 'auto',
  padding: '20px',
  border: '1px solid #888',
};

const MODAL_STYLES = {
  content: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '50px',
    width: '70%',
    height: '70%',
    zIndex: 1000,
  },
};
