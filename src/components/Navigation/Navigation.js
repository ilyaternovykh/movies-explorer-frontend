import { Link, NavLink } from 'react-router-dom';
import accountImage from '../../images/account-image.png';
import menuImage from '../../images/menu-burger.png';

function Navigation({ link, menuValue, onSignIn, headerStatus, onMenuPopup }) {


  return(
    <>
    {headerStatus ? 
      <nav className="header__account">
        <Link to='/signup' className="header__account-link">{menuValue}</Link>
        <Link to='/signin' className="header__profile-link">
          <button onClick={onSignIn} className="header__account-button">Войти</button>
        </Link>
        
      </nav>
      :
      <>
        <nav className="header__menu">
          {/* <Link to='/movies' className="header__account-link">Фильмы</Link>
            <Link to='/saved-movies' className="header__account-link">Сохранённые фильмы</Link>
            <button onClick={onSignIn} className="header__account-button">Аккаунт</button> */}

          <div className="header__menu-links">
            <NavLink to='/movies' activeClassName="header__menu-link_active" className="header__menu-link">Фильмы</NavLink>
            <NavLink to='/saved-movies' activeClassName="header__menu-link_active" className="header__menu-link">Сохранённые фильмы</NavLink>
          </div>
          <div className="header__menu-profile">
            <Link to='/profile' className="header__menu-profile-link">
              <p className="header__menu-link">Аккаунт</p>
              <img className="header__menu-image" src={accountImage} alt="Изображение профиля" />
            </Link>
          </div>
        </nav>
        <nav className="header__menu-burger">
          <button className="header__menu-burger-button" onClick={onMenuPopup}>
            <img className="header__menu-burger-image" src={menuImage} alt="Изображение профиля" />
          </button>
        </nav>
      </>
    }
      
    </> 
  );
}

export default Navigation;