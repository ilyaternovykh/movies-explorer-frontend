import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';


function App() {
  const [isMenuPopupOpen, setIsMenuPopupOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isFormButtonEnable, setIsFormButtonEnable] = React.useState(false);

  const history = useHistory();

  const onGoBack = () => {
    history.goBack();
  };

  const closeAllPopups = () => {
    setIsMenuPopupOpen(false);
  };

  const handleMenuPopupClick = () => {
    setIsMenuPopupOpen(!isMenuPopupOpen);
  }

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
        <ProtectedRoute
          exact path="/movies"
          loggedIn={loggedIn}
          component={Movies}
          menuValue=""
          onMenuPopup={handleMenuPopupClick}
        />
        <ProtectedRoute
          exact path="/saved-movies"
          loggedIn={loggedIn}
          component={SavedMovies}
          menuValue=""
          onMenuPopup={handleMenuPopupClick}
        />
        <ProtectedRoute
          exact path="/profile"
          loggedIn={loggedIn}
          component={Profile}
          menuValue=""
          button="Сохранить"
          onFormButton={handleFormButtonClick}
          isOpen={isFormButtonEnable} 
          onClose={closeFormButton}
          onMenuPopup={handleMenuPopupClick}
        />
        <Route exact path="/">
          <Header 
            loggedIn={loggedIn}
            menuValue="Регистрация"
          />
          <Main />
          <Footer />
        </Route>
        {/* <Route path="/movies">
          <Header 
            loggedIn={false}
            menuValue=""
            onMenuPopup={handleMenuPopupClick}
          />
          <Movies />
          <Footer />
        </Route> */}
        {/* <Route path="/saved-movies">
          <Header 
            loggedIn={loggedIn}
            menuValue=""
            onMenuPopup={handleMenuPopupClick}
          />
          <SavedMovies />
          <Footer />
        </Route> */}
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
        {/* <Route path="/profile">
          <Header 
            loggedIn={loggedIn}
            menuValue=""
          />
          <Profile
            button="Сохранить"
            onFormButton={handleFormButtonClick}
            isOpen={isFormButtonEnable} 
            onClose={closeFormButton}
          />
        </Route> */}
        {/* <Route>
          {loggedIn ? (
            <Redirect to="/movies" />
           ) : (
            <Redirect exact to="/" />
           )}
        </Route> */}
        <Route path="*">
          <PageNotFound 
            onGoBack={onGoBack}
          />
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