import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadAllProductsInCart } from "./helper/carthelper";
import StripeCheckout from "../paymentGateways/helper/StripeCheckout";

const Cart = () => {
  const [product, setProduct] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProduct(loadAllProductsInCart());
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div>
        <h2>Products in Cart</h2>
        {product.map((value, index) => {
          return (
            <Card
              key={index}
              product={value}
              removeFromCart={true}
              addToCart={false}
              reload={reload}
              setReload={setReload}
            />
          );
        })}
      </div>
    );
  };

  const checkOutSection = () => {
    return (
      <div>
        <h2>CHECKOUT SECTIONS</h2>
      </div>
    );
  };

  return (
    <Base
      Title="CART"
      Description="CART PAGE"
      childrenProp="container-fluid text-center"
    >
      <div>
        <div className="row">
          <div className="col-6">{loadAllProducts()}</div>
          <div className="col-6">
            <StripeCheckout product={product} setReload={setReload} />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Cart;
