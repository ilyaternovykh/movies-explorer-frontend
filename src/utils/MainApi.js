class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialMovies() {
    const token = localStorage.getItem('token');

    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(this._checkResponse);
  }

  getUserInfo() {
    const token = localStorage.getItem('token');

    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(this._checkResponse);
  }

  getAllData() {
    return Promise.all([this.getUserInfo(), this.getInitialMovies()]);
  }

  editUserInfo(userData) {
    const token = localStorage.getItem('token');

    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    })
    .then(this._checkResponse);
  }

  likeMovie(cardData) {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cardData)
    })
    .then(this._checkResponse);
  }

  dislikeMovie(id) {
    const token = localStorage.getItem('token');

    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }
}


const api = new Api({
  baseUrl: 'https://api.movies-explorer.it.nomoredomains.work'
  // baseUrl: 'http://localhost:3000'
});

export default api;
