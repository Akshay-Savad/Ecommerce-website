import React, { useState } from 'react';
import ReactDom from 'react-dom';

import { API } from '../backend';
import { isAuthenticate } from '../auth/helper';

const Modal = ({ order, open = undefined, setIsOpen, setIsFalse }) => {
  const [orderStatus, setOrderStatus] = useState(order.status);

  const updateStatus = () => {
    const userId = isAuthenticate() && isAuthenticate().user._id;
    const token = isAuthenticate() && isAuthenticate().token;

    console.log(userId, token);
    if (!userId || !token) {
      return;
    }

    return fetch(`${API}/order/${order._id}/status/${userId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status: orderStatus,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => console.log('ERROR IN CORE API CALLS', error));
  };

  if (!open) {
    console.log('in if statement', open);
    return null;
  }

  return ReactDom.createPortal(
    <React.Fragment>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <div className="d-flex justify-content-end ">
          <button
            type="button"
            className="btn btn-dark btn-sm mb-2"
            onClick={setIsOpen}
          >
            Close
          </button>
        </div>
        <div style={ModalContent}>
          <div className="d-flex justify-content-between">
            <h6> Trans Id: {order.transaction_id}</h6>
            <h6> Status: {order.status}</h6>
          </div>
          <div className="d-flex align-item-center">
            <select
              className="w-25 my-1 mx-2"
              value={orderStatus}
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
              onClick={updateStatus}
            >
              Update Status
            </button>
          </div>
          <hr style={{ backgroundColor: 'black' }} />
          <h5> Customer Name: {order.address.name}</h5>
          <div className="d-flex justify-content-between">
            <h6>{order.address.address.line1}</h6>
            <h6>{order.address.address.postal_code}</h6>
          </div>
          <div className="d-flex justify-content-between">
            <h6>{order.address.address.city}</h6>
            <h6>{order.address.address.country}</h6>
          </div>
          <hr style={{ backgroundColor: 'black' }} />
          {order.products.map((product, index) => {
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
      </div>
    </React.Fragment>,
    document.getElementById('portal')
  );
};

export default Modal;

// Styles

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000,
};

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  width: '70%',
  zIndex: 1000,
};

const ModalContent = {
  backgroundColor: '#fefefe',
  margin: 'auto',
  padding: '20px',
  border: '1px solid #888',
};
