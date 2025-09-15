export const BASE_URL = 'http://localhost:3001';

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

async function getItems() {
  return request(`${BASE_URL}/items`);
}

async function postItems(card, token) {
  return request(`${BASE_URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: card.name,
      type: card.type,
      amount: card.amount,
      category: card.category,
    }),
  });
}

async function patchItems(card, id, token) {
  return request(`${BASE_URL}/items/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: card.name,
      type: card.type,
      amount: card.amount,
      category: card.category,
    }),
  });
}

async function deleteItems(id, token) {
  return request(`${BASE_URL}/items/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
}

export { getItems, postItems, patchItems, deleteItems };
