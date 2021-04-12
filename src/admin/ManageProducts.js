import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Base from '../core/Base';

import { isAuthenticate } from '../auth/helper';
import { getAllProduct, deleteProduct } from './helper/adminapicall';

const ManageProduct = () => {
  const [product, setProduct] = useState([]);

  const { user, token } = isAuthenticate();

  const preload = () => {
    getAllProduct().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProduct(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteAProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base Title="Welcome Admin" Description="Manage products here">
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          {console.log(product.length)}
          <h5 className="text-right text-dark my-3">
            Total Products :
            <span className="text-monospace"> {product.length} </span>
          </h5>

          {product.map((value, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-dark text-left">{value.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success rounded"
                    to={`/admin/product/update/${value._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      deleteAProduct(value._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageProduct;
