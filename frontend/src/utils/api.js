class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getUserInfo() {
    this._headers['Cache-Control'] = 'no-cache';
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    });
  }

  editUserInfo(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
      credentials: 'include',
    });
  }

  postCard(data) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
      headers: this._headers,
    });
  }

  editAvatar(data) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }

  like(cardID) {
    return this._request(`${this._baseUrl}/cards/${cardID}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: this._headers,
    });
  }

  deleteLike(cardID) {
    return this._request(`${this._baseUrl}/cards/${cardID}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    });
  }

  deleteCard(cardID) {
    return this._request(`${this._baseUrl}/cards/${cardID}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    });
  }

  changeLikeCardStatus(cardID, isLiked) {
    if (isLiked) {
      return this.like(cardID);
    } else {
      return this.deleteLike(cardID);
    }
  }
}

const api = new Api({
  baseUrl: 'api.alicehab.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
