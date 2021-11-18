import React from 'react';
import { Link } from "react-router-dom";

function Register({ button, handleRegister}) {
  const [data, setData] = React.useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;

    setData({
      ...data,
      [name]: value
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { password, email, name } = data;
    
    handleRegister({
      email,
      password,
      name
    });
  }

  return (
    <div className="register profile-padding">
      <div className="register__content">
        <div className="register__form-group">
          <div className="register__title-group">
            <div className="register__logo"></div>
            <h2 className="register__title">Добро пожаловать!</h2>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form__input-group">
              <p className="form__input-title">Имя</p>
              <input className="form__input" id="name" name="name" type="text" value={data.name} onChange={handleChange} />
              <p className="form__input-title">E-mail</p>
              <input className="form__input" id="email" name="email" type="email" value={data.email} onChange={handleChange} />
              <p className="form__input-title">Пароль</p>
              <input className="form__input" id="password" name="password" type="password" value={data.password} onChange={handleChange} />
              <span className="form__error">Что-то пошло не так...</span>
            </div>
            <button className="form__submit">{button}</button>
          </form>
        </div>
        <div className="register__question-group">
          <p className="register__question">Уже зарегистрированы?</p>
          <Link className="button" to="/signin">Войти</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;