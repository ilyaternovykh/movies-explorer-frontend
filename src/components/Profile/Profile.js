import React from 'react';
import Header from "../Header/Header";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


function Profile({ button, isOpen, onClose, onFormButton, loggedIn, menuValue, onMenuPopup, onSignOut, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);
  
  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      email
    });
  }


  return (
    <>
      <Header 
        loggedIn={loggedIn}
        menuValue={menuValue}
        onMenuPopup={onMenuPopup}
      />
      <main className="profile profile-padding">
        <div className="profile__content">
          <form className="form-profile" onSubmit={handleSubmit}>
            <h2 className="profile__title">Привет, {currentUser.name}!</h2>
            <div className="form-profile__input-group">
              <div className="form-profile__input-text-group">
                <p className="form-profile__input-title">Имя</p>
                <input 
                  className={`form-profile__input ${isOpen ? 'form-profile__input_enable' : ''}`}
                  id="email" 
                  name="email" 
                  type="text" 
                  value={name || ""} 
                  onChange={handleChangeName}
                />
              </div>
              <div className="form-profile__input-text-group">
                <p className="form-profile__input-title">E-mail</p>
                <input 
                  className={`form-profile__input ${isOpen ? 'form-profile__input_enable' : ''}`}
                  id="email"
                  name="email"
                  type="email"
                  value={email || ""}
                  onChange={handleChangeEmail}
                />
              </div>
            </div>
            <button 
              className={`form__submit form-profile__submit ${isOpen ? 'form-profile__submit_enable' : ''}`}
              onClick={onClose}
            >
              {button}
            </button>
          </form>
          <div className={`profile__buttons-group ${isOpen ? 'profile__buttons-group_disable' : ''}`}>
            <button className="profile__buttons" onClick={onFormButton}>Редактировать</button>
            <button className="profile__buttons profile__buttons_color_red" onClick={onSignOut}>Выйти из аккаунта</button>
          </div>

        </div>
      </main>
    </>
    
  );
}

export default Profile;