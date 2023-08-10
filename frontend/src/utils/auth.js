class Auth {
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

  registerUser(password, email) {
    return this._request(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    });
  }

  loginUser(password, email) {
    return this._request(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    });
  }

  getContent(token) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
  }
}

const auth = new Auth({
  baseUrl: "https://auth.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
});

export default auth;
