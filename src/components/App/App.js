import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import MenuPopup from '../MenuPopup/MenuPopup';
import PageNotFound from '../PageNotFound/PageNotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';


function App() {
  const [isMenuPopupOpen, setIsMenuPopupOpen] = React.useState(false);

  const closeAllPopups = () => {
    setIsMenuPopupOpen(false);
  };

  const handleMenuPopupClick = () => {
    setIsMenuPopupOpen(!isMenuPopupOpen);
  }

  const [isFormButtonEnable, setIsFormButtonEnable] = React.useState(false);

  const closeFormButton = () => {
    setIsFormButtonEnable(false);
  };

  const handleFormButtonClick = () => {
    setIsFormButtonEnable(!isFormButtonEnable);
  }

  return(
    <div className="page">
      <div className="page__container">
      <Switch>
        <Route exact path="/">
          <Header 
            headerStatus={true}
            menuValue="Регистрация"
          />
          <Main />
          <Footer />
        </Route>
        <Route path="/movies">
          <Header 
            headerStatus={false}
            menuValue=""
            onMenuPopup={handleMenuPopupClick}
          />
          <Movies />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Header 
            headerStatus={false}
            menuValue=""
            onMenuPopup={handleMenuPopupClick}
          />
          <SavedMovies />
          <Footer />
        </Route>
        <Route path="/signup">
          <Register 
            button="Зарегистриоваться"
          />
        </Route>
        <Route path="/signin">
          <Login
            button="Войти"
          />
        </Route>
        <Route path="/profile">
          <Header 
            headerStatus={false}
            menuValue=""
          />
          <Profile
            button="Сохранить"
            onFormButton={handleFormButtonClick}
            isOpen={isFormButtonEnable} 
            onClose={closeFormButton}
          />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      <MenuPopup
        isOpen={isMenuPopupOpen} 
        onClose={closeAllPopups}
      />
      </div>
    </div>
  );
}

export default App;