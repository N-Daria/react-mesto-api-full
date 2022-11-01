export const BASE_URL = 'http://backend.mesto.nomoredomains.icu';
// export const BASE_URL = 'http://localhost:3001';

const checkResponse = (response) => {
  return response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`);
}

export const register = (data) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: data.password,
      email: data.email
    })
  })
    .then(checkResponse)
};

export const authorize = (data) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: data.password,
      email: data.email
    })
  })
    .then(checkResponse)
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
    // credentials: 'include'
  })
    .then(checkResponse)
};
