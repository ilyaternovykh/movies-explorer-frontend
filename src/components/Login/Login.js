import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import useFormWithValidation from '../useFormWithValidation/useFormWithValidation';

function Login({ button, handleLogin, reqStatus, setReqStatus }) {
  const {values: userData, errors, handleChange, isValid } = useFormWithValidation({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    handleLogin(userData);
  }

  useEffect(() => {
    setReqStatus(false);
  }, [setReqStatus, userData]);
  
  const submitButtonClassName = (`form__submit form__submit_login ${isValid ? '' : 'form__submit_type_disabled'}`);

  return (
    <div className="register profile-padding">
      <div className="register__content">
        <div className="register__form-group">
          <div className="register__title-group">
            <div className="register__logo"></div>
            <h2 className="register__title">Рады видеть!</h2>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form__input-group">
              <p className="form__input-title">E-mail</p>
              <input
                className="form__input"
                id="email"
                name="email"
                type="email"
                value={userData.email}
                onChange={handleChange}
                required
              />
              { errors.email && (<span className="form__error">{errors.email}</span>)}
              <p className="form__input-title">Пароль</p>
              <input
                className="form__input"
                id="password"
                name="password"
                type="password"
                value={userData.password}
                onChange={handleChange}
                required
                minLength="8"
              />
              { errors.password && (<span className="form__error">{errors.password}</span>)}
              { reqStatus && (<span className="form__error">Что-то пошло не так...</span>)}
            </div>
            <button className={submitButtonClassName} disabled={!isValid}>{button}</button>
          </form>
        </div>
        <div className="register__question-group">
          <p className="register__question">Ещё не зарегистрированы?</p>
          <Link className="button" to="/signup">Регистрация</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;