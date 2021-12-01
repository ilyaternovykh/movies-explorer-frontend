import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PopupWithMenu from '../PopupWithMenu/PopupWithMenu';
import accountImage from '../../images/account-image.png';


function MenuPopup({ isOpen, onClose }) {

  return (
    <PopupWithMenu
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="header__menu-burger-links">
      <NavLink to='/' exact activeClassName="header__menu-burger-link_active" className="header__menu-burger-link" onClick={onClose}>Главная</NavLink>
        <NavLink to='/movies' activeClassName="header__menu-burger-link_active" className="header__menu-burger-link" onClick={onClose}>Фильмы</NavLink>
        <NavLink to='/saved-movies' activeClassName="header__menu-burger-link_active" className="header__menu-burger-link" onClick={onClose}>Сохранённые фильмы</NavLink>
      </div>
      <div className="header__menu-burger-account">
        <Link to='/profile' className="header__menu-profile-link" onClick={onClose}>
          <p className="header__menu-burger-profile">Аккаунт</p>
          <img className="header__menu-image" src={accountImage} alt="Изображение профиля" />
        </Link>
      </div>
    </PopupWithMenu>
  );
}

export default MenuPopup;