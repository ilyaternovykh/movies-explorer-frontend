import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
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
import apiMovies from '../../utils/MoviesApi';


function App() {
  const [isMenuPopupOpen, setIsMenuPopupOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isFormButtonEnable, setIsFormButtonEnable] = React.useState(false);
  const [currentUser, setСurrentUser] = React.useState({});
  // const [moviesData, setMoviesData] = React.useState([]);
  const [findedMovies, setFindedMovies] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [resultMovies, setResultMovies] = React.useState([]);
  const [isShortFilm, setIsShortFilm] = React.useState(false);



  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const tokenCheck = () => {
      if (token){
        apiAuth.getContent(token).then((res) => {
          if (res.email) {
            setLoggedIn(true);
            history.push(location.pathname);
          } else {
            history.push('/');
          }
        }).catch(err => console.error(err));
      }
    }

    tokenCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      apiMain.getUserInfo()
      .then(data => {
        setСurrentUser(data);
      }).catch(err => console.error(err))
    }
  }, [loggedIn]);

  // const tokenCheck = () => {
  //   if (localStorage.getItem('token')){
  //     const token = localStorage.getItem('token');
  //     apiAuth.getContent(token).then((res) => {
  //       if (res.email) {
  //         // setUserData({
  //         //   email: res.email
  //         // });
  //         setLoggedIn(true);
  //         history.push(location.pathname);
  //         // history.push('./movies');
  //       } else {
  //         history.push('/');
  //       }
  //     }).catch(err => console.error(err));
  //   }
  // }

  // React.useEffect(() => {
  //   tokenCheck();
  // }, []);

  // React.useEffect(() => {
  //   if (loggedIn) {
  //     apiMovies.getMovies()
  //     .then(data => {
  //       setMovies(data);
  //     }).catch(err => console.error(err))
  //   }
  // }, [loggedIn]);



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

  const handleSearch = ({movie}) => {
    const movieList = JSON.parse(localStorage.getItem('movie-list'));

      if (!movieList) {
        apiMovies.getMovies()
          .then(data => {
            const findedMovieList = data.filter(function(film) {
              // debugger;
              return film.nameRU.toLowerCase().includes(movie.toLowerCase());
            })
            // setMoviesData(data);
            setFindedMovies(findedMovieList);
            setFilteredMovies(filterMovies(findedMovieList));
            if (isShortFilm === true) {
              setResultMovies(filterMovies(findedMovieList));
            } else {
              setResultMovies(findedMovieList);
            }
            localStorage.setItem("movie-list", JSON.stringify(data));
      }).catch(err => console.error(err))
      } else {
        const findedSavedMovieList = movieList.filter(function(film) {
          // debugger;
          return film.nameRU.toLowerCase().includes(movie.toLowerCase());
        })
        setFindedMovies(findedSavedMovieList);
        setFilteredMovies(filterMovies(findedSavedMovieList));
        if (isShortFilm === true) {
          setResultMovies(filterMovies(findedSavedMovieList));
        } else {
          setResultMovies(findedSavedMovieList);
        }
      }
    
  }

  const handleFilter = () => {
    // setIsShortFilm(!isShortFilm);
    if (resultMovies) {
      if (isShortFilm === false) {
        setResultMovies(filteredMovies);
      } else {
        setResultMovies(findedMovies);
      }
    }
  }

  const filterMovies = (movies) => {
    return movies.filter(function(film) {
      // debugger;
      return film.duration <= 40;
    })
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
            movies={resultMovies}
            menuValue=""
            onMenuPopup={handleMenuPopupClick}
            handleSearch={handleSearch}
            handleFilter={handleFilter}
            filterStatus={isShortFilm}
            setIsShortFilm ={setIsShortFilm}
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