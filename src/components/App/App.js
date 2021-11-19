import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
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
import * as apiAuth from '../../utils/AuthApi';
import apiMain from '../../utils/MainApi';


function App() {
  const [isMenuPopupOpen, setIsMenuPopupOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isFormButtonEnable, setIsFormButtonEnable] = React.useState(false);
  const [currentUser, setСurrentUser] = React.useState({});


  const history = useHistory();

  React.useEffect(() => {
    if (loggedIn) {
      apiMain.getUserInfo()
      .then(data => {
        setСurrentUser(data);
      }).catch(err => console.error(err))
    }
  }, [loggedIn]);

  React.useEffect(() => {
    const tokenCheck = () => {
      const token = localStorage.getItem('token');

      if (token){
        apiAuth.getContent(token).then((res) => {
          if (res.email) {
            // setUserData({
            //   email: res.email
            // });
            setLoggedIn(true);
            history.push('./movies');
          }
        }).catch(err => console.error(err));
      }
    }

    tokenCheck();
  }, [history]);


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
  
  const handleLogin = ({ email, password }) => {
    apiAuth.authorize({ email, password })
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          // setUserData({ email });
          setСurrentUser(data);
          history.push('/saved-movies');
        }
      })
      .catch(err => console.log(err));
  }
  
  const handleRegister = ( { password, email, name }) => {
    apiAuth.register({ password, email, name })
      .then(data => {
        if (data) {
          // setUserData({
          //   email: data.email
          // });
          // setСurrentUser(data);
          // setLoggedIn(true);
          // history.push('/saved-movies');
          // setIsInfoTooltipOpen({status: true, type: true})
          handleLogin({ password, email, name });
        }
      })
      .catch((err) => {
        console.log(err)
        // setIsInfoTooltipOpen({status: true, type: false})
      });
  }

  const handleUpdateUser = (userInfo) => {
    apiMain.editUserInfo(userInfo)
    .then(data => {
      setСurrentUser(data);
      closeFormButton();
    })
    .catch(err => console.error(err))
  }

  function onSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/');
  }

  return(
    <CurrentUserContext.Provider value={currentUser}>
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
            onSignOut={onSignOut}
            onUpdateUser={handleUpdateUser}
          />
          <Route exact path="/">
            <Header 
              loggedIn={loggedIn}
              menuValue="Регистрация"
              onMenuPopup={handleMenuPopupClick}
            />
            <Main />
            <Footer />
          </Route>
          <Route path="/signup">
            <Register 
              button="Зарегистриоваться"
              handleRegister={handleRegister}
            />
          </Route>
          <Route path="/signin">
            <Login
              button="Войти"
              handleLogin={handleLogin}
            />
          </Route>
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
    </CurrentUserContext.Provider>
  );
}

export default App;