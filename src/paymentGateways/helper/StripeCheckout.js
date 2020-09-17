import React, { useState, useEffect } from 'react';
import { isAuthenticate } from '../../auth/helper';
import { emptyCart, loadAllProductsInCart } from '../../core/helper/carthelper';
import { createOrder } from '../../core/helper/orderHelper';
import { Link } from 'react-router-dom';
import ReactStripeCheckout from 'react-stripe-checkout';
import { API } from '../../backend';

const StripeCheckout = ({
  product,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: '',
    address: '',
  });

  const makePayment = (token) => {
    const body = {
      token,
      product: product[0],
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    return fetch(`${API}/payment`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        setData({ ...data, loading: false, success: true });
        const { status } = response;
        console.log('PAYMENT SUCCESSFUL STATUS ', status);
        emptyCart(() => {
          console.log('CARSH');
        });
        const orderData = {
          product: product,
        };
        createOrder(userId, tokenForAuth, orderData);
        setReload(!reload);
      })
      .catch((error) => {
        console.log('ERROR ', error);
      });
  };

  const tokenForAuth = isAuthenticate() && isAuthenticate().token;
  const userId = isAuthenticate() && isAuthenticate().user._id;

  const getFinalPriceValue = () => {
    let amount = 0;
    product.map((value) => {
      amount = amount + value.price;
    });
    return amount;
  };

  const showStripeButton = () => {
    return isAuthenticate() ? (
      <div>
        <ReactStripeCheckout
          stripeKey={process.env.REACT_APP_STRIPEKEY}
          name="Buy"
          token={makePayment}
          amount={getFinalPriceValue * 100}
          shippingAddress
          billingAddress
        >
          <button className="btn btn-light rounded my-2 text-dark font-weight-bolder">
            PAY WITH STRIPE
          </button>
        </ReactStripeCheckout>
      </div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-danger"> SIGN IN FIRST</button>
      </Link>
    );
  };

  return (
    <div className="card text-white bg-dark border border-info my-2">
      <div className="card-header border-light">
        <h2>Checkout Loaded</h2>
      </div>
      <div className="card-body">
        <h2 className="card-title">
          Your Final Value : {getFinalPriceValue()}
        </h2>
        {showStripeButton()}
      </div>
    </div>
  );
};

export default StripeCheckout;
