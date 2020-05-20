export const addItemToCart = (item, next) => {
  let cart = [];

  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({ ...item });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const loadAllProductsInCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
};

export const removeItemFromCart = (productId) => {
  let cart = [];

  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((value, index) => {
      if (value._id === productId) {
        cart.splice(index, 1);
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  return cart;
};

export const emptyCart = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("cart");
    const cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};
