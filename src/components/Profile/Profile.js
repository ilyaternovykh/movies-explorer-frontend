import React, { useEffect } from 'react';
import Header from "../Header/Header";
import useFormWithValidation from '../useFormWithValidation/useFormWithValidation';


function Profile({ button, isOpen, onClose, onFormButton, loggedIn, menuValue, onMenuPopup, onSignOut, onUpdateUser, currentUser, setReqStatus, reqStatus }) {
  const {values: userData, errors, handleChange, isValid } = useFormWithValidation({
    name: currentUser.name,
    email: currentUser.email
  });

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser(userData);
  }

  useEffect(() => {
    setReqStatus({
      visible: false
    });
  }, [setReqStatus, userData]);

  useEffect(() => {
    userData.name = currentUser.name;
    userData.email = currentUser.email;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const compareUserData = currentUser.name === userData.name && currentUser.email === userData.email;
  
  // console.log(`currentUser.name - ${currentUser.name}`)
  // console.log(`userData.name - ${userData.name}`)
  // console.log(`currentUser.email - ${currentUser.email}`)
  // console.log(`userData.email - ${userData.email}`)
  // console.log(`isValid - ${isValid}`)
  // console.log(`compareUserData - ${compareUserData}`)

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
                  id="name" 
                  name="name" 
                  type="text"
                  minLength="2"
                  maxLength="30"
                  value={userData.name || ""}
                  // placeholder={currentUser.name}
                  onChange={handleChange}
                  required
                />
              </div>
              { errors.name && (<span className="form__error">{errors.name}</span>)}
              <div className="form-profile__input-text-group">
                <p className="form-profile__input-title">E-mail</p>
                <input 
                  className={`form-profile__input ${isOpen ? 'form-profile__input_enable' : ''}`}
                  id="email"
                  name="email"
                  type="email"
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  value={userData.email || ""}
                  // placeholder={currentUser.email}
                  onChange={handleChange}
                  required
                />
              </div>
              { errors.email && (<span className="form__error">{errors.email}</span>)}
            </div>
            <div className={`form-profile__submit-group ${isOpen ? 'form-profile__submit-group_enable' : ''}`}>
              { reqStatus.visible && 
                (reqStatus.status ?
                    (<div className="form__error_profile">Данные успешно отправлены</div>)
                  :
                    (<div className="form__error_profile">При обновлении профиля произошла ошибка</div>)
                )
              }
              <button 
                className={`form__submit form-profile__submit ${reqStatus.status ? '' : 'form-profile__submit_enable'} ${isValid && !compareUserData ? '' : 'form__submit_type_disabled'}`}
                // onClick={onClose}
                disabled={compareUserData}
              >
                {button}
              </button>
            </div>
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