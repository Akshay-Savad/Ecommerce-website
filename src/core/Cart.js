import React, { useState, useEffect } from 'react';
import '../styles.css';
import Base from './Base';
import Card from './Card';
import { loadAllProductsInCart } from './helper/carthelper';
import StripeCheckout from '../paymentGateways/helper/StripeCheckout';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [product, setProduct] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProduct(loadAllProductsInCart());
  }, [reload]);

  const loadAllProducts = () => {
    if (!Boolean(Number(Array.isArray(product) && product.length))) {
      return (
        <React.Fragment>
          <div className="card bg-dark my-2">
            <h2 className="card-header text-light border-light">
              Your Cart is Empty
            </h2>
            <div className="card-body">
              <Link to="/">
                <button
                  type="button "
                  className="btn btn-light rounded font-weight-bolder"
                >
                  Home
                </button>
              </Link>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="p-2 text-bold">
            <h2>Products in Cart</h2>
          </div>
          <div className="container-fluid row mx-auto">
            {product.map((value, index) => {
              return (
                <div key={index} className="col-12 col-sm-3">
                  <Card
                    product={value}
                    removeFromCart={true}
                    addToCart={false}
                    reload={reload}
                    setReload={setReload}
                    className="card text-white bg-dark border border-info text-center"
                  />
                </div>
              );
            })}
          </div>
          <div>
            <StripeCheckout product={product} setReload={setReload} />
          </div>
        </React.Fragment>
      );
    }
  };

  return (
    <Base Title="CART" Description="CART PAGE" childrenProp="container-fluid">
      <div>{loadAllProducts()}</div>
    </Base>
  );
};

export default Cart;
