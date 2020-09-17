import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import ImageHelper from "./helper/ImageHelper";
import { addItemToCart, removeItemFromCart } from "./helper/carthelper";

const Card = ({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = (f) => f, // functions(f){return f}
  reload = undefined,
  className = "card text-white bg-dark border border-info",
}) => {
  const [redirect, setRedirect] = useState(false);

  const addToCartFunction = () => {
    console.log("1");
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const cardTitle = product ? product.name : "A Title For Image";
  const description = product ? product.description : "Description";
  const price = product ? product.price : "Price";

  const showAddToCart = (addToCart) => {
    return (
      addToCart && (
        <div className="col-12">
          <button
            onClick={addToCartFunction}
            className="btn btn-block btn-outline-success mt-2 mb-2"
          >
            Add to Cart
          </button>
        </div>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <div className="col-12">
          <button
            onClick={() => {
              setReload(!reload);
              removeItemFromCart(product._id);
            }}
            className="btn btn-block btn-outline-danger mt-2 mb-2"
          >
            Remove from cart
          </button>
        </div>
      )
    );
  };

  return (
    <div className={className} style={{ width: "18rem", margin: "0.2rem" }}>
      {getARedirect(redirect)}
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap mt-2">
          {description}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">₹{price}</p>
        <div className="row">
          {showAddToCart(addToCart)}
          {showRemoveFromCart(removeFromCart)}
        </div>
      </div>
    </div>
  );
};

export default Card;
