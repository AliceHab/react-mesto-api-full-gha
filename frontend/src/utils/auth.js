class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    console.log('Server Response:', res);
    if (res.ok || res.status === 304) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then((res) => {
      res
        .clone()
        .json()
        .then((data) => console.log(data));
      return this._checkResponse(res);
    });
  }

  registerUser(password, email) {
    return this._request(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ password, email }),
      credentials: 'include',
    });
  }

  loginUser(password, email) {
    return this._request(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ password, email }),
      credentials: 'include',
    });
  }

  getContent() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
  }
}

const auth = new Auth({
  baseUrl: 'https://api.alicehab.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});

export default auth;
