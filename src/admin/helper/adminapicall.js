import { API } from "../../backend";

//category calls
export const createCategory = (userId, token, catogory) => {
  console.log("WHILE CALLING BACKEND NAME IS", catogory);
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(catogory),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log("ERROR WHILE CREATING CATEGORY", err);
    });
};

//get all categories
export const getAllCategory = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//get all unique category
export const getAllUniqueCategory = () => {
  return fetch(`${API}/uniquecategories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log("ERROR IN ADMINAPICALLS", error);
    });
};

//update category
export const updateCategory = (userId, categoryId, token, updatedName) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedName),
  })
    .then((response) => {
      console.log("RESPONSE FROM BACKEND", response);
      return response.json();
    })
    .catch((error) => {
      console.log("ERROR IN adminapicalls", error);
    });
};

//delete category
export const deleteCategory = (categoryId, userId, token) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log("ERROR WHILE DELETEING IN ADMIN API CALLS", error);
    });
};

//products calls
//create product
export const createProduct = (userId, token, product) => {
  return fetch(`${API}/products/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => {
      console.log("RESPONSE FOR CRATING PRODUCT", res);
      return res.json();
    })
    .catch((err) => {
      console.error(err);
    });
};

//get all products
export const getAllProduct = () => {
  return fetch(`${API}/products`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//delete a product

//get a single product
export const getProduct = (productId) => {
  return fetch(`${API}/products/${productId}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//update a product
export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/products/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => {
      console.log("UPDATE PRODUCT", res);
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//delete a product
export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/products/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      console.log("WE ARE GETTING RESPONSE FROM BACKEND", res);
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
