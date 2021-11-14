import { Link } from "react-router-dom";

function Login({ button }) {

  return (
    <div className="register profile-padding">
      <div className="register__content">
        <div className="register__form-group">
          <div className="register__title-group">
            <div className="register__logo"></div>
            <h2 className="register__title">Рады видеть!</h2>
          </div>
          <form className="form">
            <div className="form__input-group">
              <p className="form__input-title">E-mail</p>
              <input className="form__input" id="email" name="email" type="email" />
              <p className="form__input-title">Пароль</p>
              <input className="form__input" id="password" name="password" type="password" />
            </div>
            <button className="form__submit form__submit_login">{button}</button>
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