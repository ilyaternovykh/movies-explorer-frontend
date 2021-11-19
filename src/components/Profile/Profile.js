import React from 'react';
import Header from "../Header/Header";


function Profile({ button, isOpen, onClose, onFormButton, loggedIn, menuValue, onMenuPopup, onSignOut }) {

  const [name, setName] = React.useState("Виталий");
  const [email, setDescription] = React.useState("pochta@yandex.ru");
  
  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

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
            <h2 className="profile__title">Привет, Виталий!</h2>
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
                  onChange={handleChangeDescription}
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