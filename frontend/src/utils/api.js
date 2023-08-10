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
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  editUserInfo(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  postCard(data) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
      headers: this._headers,
    });
  }

  editAvatar(data) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }

  like(cardID) {
    return this._request(`${this._baseUrl}/cards/${cardID}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  deleteLike(cardID) {
    return this._request(`${this._baseUrl}/cards/${cardID}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  deleteCard(cardID) {
    return this._request(`${this._baseUrl}/cards/${cardID}`, {
      method: "DELETE",
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
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-65",
  headers: {
    authorization: "2123c628-f1b5-4ce0-be41-8740d5e266d9",
    "Content-Type": "application/json",
  },
});

export default api;
