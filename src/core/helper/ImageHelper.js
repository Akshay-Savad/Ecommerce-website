import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageUrl = product
    ? `${API}/productphoto/${product._id}`
    : "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageUrl}
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default ImageHelper;
