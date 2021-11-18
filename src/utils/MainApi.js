class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // getInitialCards() {
  //   const token = localStorage.getItem('token');

  //   return fetch(`${this._baseUrl}/cards`, {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': `Bearer ${token}`,
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //   .then(this._checkResponse);
  // }

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
    return Promise.all([this.getUserInfo()]);
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

  // addNewCard(cardData) {
  //   const token = localStorage.getItem('token');

  //   return fetch(`${this._baseUrl}/cards`, {
  //     method: 'POST',
  //     headers: {
  //       'Authorization': `Bearer ${token}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(cardData)
  //   })
  //   .then(this._checkResponse);
  // }

  // removeCard(id) {
  //   const token = localStorage.getItem('token');

  //   return fetch(`${this._baseUrl}/cards/${id}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Authorization': `Bearer ${token}`,
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //   .then(this._checkResponse);
  // }

  // likeCard(id) {
  //   const token = localStorage.getItem('token');

  //   return fetch(`${this._baseUrl}/cards/${id}/likes`, {
  //     method: 'PUT',
  //     headers: {
  //       'Authorization': `Bearer ${token}`,
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //   .then(this._checkResponse);
  // }

  // dislikeLikeCard(id) {
  //   const token = localStorage.getItem('token');

  //   return fetch(`${this._baseUrl}/cards/${id}/likes`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Authorization': `Bearer ${token}`,
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //   .then(this._checkResponse);
  // }

  // editUserAvatar(userAvatar) {
  //   const token = localStorage.getItem('token');

  //   return fetch(`${this._baseUrl}/users/me/avatar`, {
  //     method: 'PATCH',
  //     headers: {
  //       'Authorization': `Bearer ${token}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(userAvatar)
  //   })
  //   .then(this._checkResponse);
  // }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }
}


const api = new Api({
  baseUrl: 'http://localhost:3000'
});

export default api;
