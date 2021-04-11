import { API } from '../../backend';

export const createOrder = (
  userId,
  token,
  orderedProductArray,
  stripeToken
) => {
  return fetch(`${API}/order/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ order: orderedProductArray, token: stripeToken }),
  })
    .then((response) => {
      console.log('RESPONSE ', response);
      return response.json();
    })
    .catch((err) => console.log('ERROR IN ORDER HELPER', err));
};
