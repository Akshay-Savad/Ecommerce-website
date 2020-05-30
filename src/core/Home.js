import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const getAllProducts = () => {
    getProducts().then((data) => {
      console.log("ERROE ", data);
      if (data && data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Base childrenProp="container-fluid">
      <div>
        <div className="row text-center text-capitalize">
          {products.map((value, index) => {
            return (
              <div key={index} className="col-3">
                <Card product={value} />
              </div>
            );
          })}
        </div>
        <h3>HERE GOING INPUT BUUTON</h3>
      </div>
    </Base>
  );
}
