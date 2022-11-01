import { serverRequestConfig } from './consts'
class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getCards(token) {
    return fetch(`${this._url}/cards`, {
      headers: {
        ...this._headers,
        'Authorization': token
      },
    })
      .then(this._checkResponse)
  }

  getUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        ...this._headers,
        'Authorization': token
      },
    })
      .then(this._checkResponse)
  }

  patchUserInfo(data, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        'Authorization': token
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._checkResponse)
  }

  patchUserPhoto(data, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        'Authorization': token
      },
      body: JSON.stringify({
        avatar: data.photo,
      })
    })
      .then(this._checkResponse)
  }

  postNewCard(data, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        ...this._headers,
        'Authorization': token
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._checkResponse)
  }

  likeCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        ...this._headers,
        'Authorization': token
      }
    })
      .then(this._checkResponse)
  }

  deleteLikeCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        'Authorization': token
      },
    })
      .then(this._checkResponse)
  }

  deleteCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        'Authorization': token
      },
    })
      .then(this._checkResponse)
  }

}

const api = new Api(serverRequestConfig)

export default api
