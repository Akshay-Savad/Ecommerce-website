import { API } from "../../backend";

export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return console.log(err);
    });
};

export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return console.log(err);
    });
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("Jwt", JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("Jwt");
    next();
    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const isAuthenticate = () => {
  if (typeof window === "undefined") {
    return false;
  }
  if (localStorage.getItem("Jwt")) {
    return JSON.parse(localStorage.getItem("Jwt"));
  } else {
    return false;
  }
};
