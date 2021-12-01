import React from 'react';
import { Route, Switch, useHistory, useLocation, Redirect } from 'react-router-dom';
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
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as apiAuth from '../../utils/AuthApi';
import apiMain from '../../utils/MainApi';
import apiMovies from '../../utils/MoviesApi';


function App() {
  const [isMenuPopupOpen, setIsMenuPopupOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isFormButtonEnable, setIsFormButtonEnable] = React.useState(false);
  const [currentUser, setСurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [resultMovies, setResultMovies] = React.useState([]);
  const [isShortFilm, setIsShortFilm] = React.useState(false);
  const [savedLocalMovies, setSavedLocalMovies] = React.useState([]);
  const [isShortSavedFilm, setIsShortSavedFilm] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [reqStatus, setReqStatus] = React.useState({
    visible: false,
    status: false,
    visibleButton: false
  });
  // const [savedMoviesForSearch, setSavedMoviesForSearch] = React.useState(
  //    JSON.parse(localStorage.getItem('saved-movie-list'))
  // );


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

  React.useEffect(() => {
    if (loggedIn) {
      apiMain.getInitialMovies()
      .then(data => {
        const userSavedMovies = data.filter((movie) => {
          return movie.owner === currentUser._id;
        });
        setSavedLocalMovies(userSavedMovies);
        localStorage.setItem("saved-movie-list", JSON.stringify(userSavedMovies));
      }).catch(err => console.error(err))
    }
  }, [currentUser, loggedIn]);

  React.useEffect(() => {
    if (currentUser && (location.pathname === "signin" || location.pathname === "signup")) {
      history.replace('/');
    }

  }, [currentUser, history, location]);

  const onGoBack = () => {
    history.goBack();
  };

  const closeAllPopups = () => {
    setIsMenuPopupOpen(false);
    setIsInfoTooltipOpen(false);
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
          setСurrentUser(data);
          history.push('/movies');
        }
      })
      .catch((err) => {
        setReqStatus(true);
        console.log(err);
        debugger;
      });
  }
  
  const handleRegister = ({ password, email, name }) => {
    apiAuth.register({ password, email, name })
      .then(data => {
        if (data) {
          handleLogin({ password, email, name });
        }
      })
      .catch((err) => {
        setReqStatus(true);
        console.log(err);
      });
  }

  const handleUpdateUser = (userInfo) => {
    apiMain.editUserInfo(userInfo)
    .then(data => {
      setСurrentUser(data);
      setIsInfoTooltipOpen(true);
      // setReqStatus({
      //   visible: true,
      //   status: true
      // });
      closeFormButton();
    })
    .catch((err) => {
      setReqStatus({
        visible: true,
        status: false
      });
      console.log(err);
    });
  }

  const handleSearch = ({movie}) => {
    const movieList = JSON.parse(localStorage.getItem('movie-list'));
    // setIsLoading(true);
    // debugger;

    if (!movieList) {
      setIsLoading(true);
      apiMovies.getMovies()
        .then(data => {
          const findedMovieList = data.filter(function(film) {
            return film.nameRU.toLowerCase().includes(movie.toLowerCase());
          })

          if (isShortFilm === true) {

            setResultMovies(filterMovies(findedMovieList));
            setIsLoading(false);
          } else {
            setResultMovies(findedMovieList);
            setIsLoading(false);
          }
          localStorage.setItem("movie-list", JSON.stringify(data));
        }).catch(err => console.error(err))
    } else {
        setIsLoading(true);
        const findedLocalMovieList = movieList.filter(function(film) {

        return film.nameRU.toLowerCase().includes(movie.toLowerCase());
      })

      if (isShortFilm === true) {
        setResultMovies(filterMovies(findedLocalMovieList));
        setIsLoading(false);
      } else {
        setResultMovies(findedLocalMovieList);
        setIsLoading(false);
      }
    }
  }

  const handleSavedSearch = ({movie}) => {
      const savedMovieList = JSON.parse(localStorage.getItem('saved-movie-list'));
      // setSavedMoviesForSearch(savedMovieList);
      // debugger;
 
      if (savedMovieList) {
        const findedSavedMovieList = savedMovieList.filter(function(film) {
          return film.nameRU.toLowerCase().includes(movie.toLowerCase());
        })
 
        // setFindedSavedMovies(findedSavedMovieList);
        // setFilteredSavedMovies(filterMovies(findedSavedMovieList));
        // setSavedMoviesForSearch(findedSavedMovieList);
 
        if (isShortSavedFilm === true) {
          setSavedLocalMovies(filterMovies(findedSavedMovieList));
          // debugger;
        } else {
          setSavedLocalMovies(findedSavedMovieList);
          // debugger;
        }
      }
    }

  const filteredSavedMovies = isShortSavedFilm ? savedLocalMovies.filter((film) => film.duration <= 40) : savedLocalMovies;
  const filteredResultMovies = isShortFilm ? resultMovies.filter((film) => film.duration <= 40) : resultMovies;

  const filterMovies = (movies) => {
    return movies.filter(function(film) {
      return film.duration <= 40;
    })
  }

  function handleCardLike(card, isLiked) {
    const findDeleteMovie = () => {
      return savedLocalMovies.find((c) => c.movieId === String(card.id));
    }
    const deleteMovie = findDeleteMovie();
    const cardTthumbnail = card.thumbnail ? card.thumbnail : `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`;

    isLiked ? (
        apiMain.dislikeMovie(deleteMovie._id)
        .then(() => {
          setSavedLocalMovies((prev) =>
            prev.filter((c) => c._id !== deleteMovie._id)
          )
          localStorage.setItem(
            'saved-movie-list',
            JSON.stringify(
              JSON.parse(localStorage.getItem('saved-movie-list')).filter(
                (movie) => movie._id !== deleteMovie._id
              )
            )
          );

          const dislikedResultMovies = resultMovies.map((c) => {
            return c.id === card.id ? card : c
          });
          setResultMovies(dislikedResultMovies);
        })
        .catch(err => console.error(err))
      ) : (
        apiMain.likeMovie({
          country: card.country ?? "текст",
          director: card.director ?? "текст",
          duration: card.duration ?? "текст",
          year: card.year ?? "текст",
          description: card.description ?? "текст",
          image: `https://api.nomoreparties.co${card.image.url}`,
          trailer: card.trailerLink ?? "текст",
          thumbnail: cardTthumbnail,
          movieId: card.id,
          nameRU: card.nameRU ?? "текст",
          nameEN: card.NameEN ?? "текст",
        })
        .then((newCard) => {
          newCard.likes = currentUser._id;
          setSavedLocalMovies((prev) => [...prev, newCard]);
          localStorage.setItem(
            "saved-movie-list",
             JSON.stringify([
               ...JSON.parse(localStorage.getItem('saved-movie-list')),
               newCard
            ])
          );
          setResultMovies(resultMovies);
        })
        .catch(err => console.error(err))
      );
  };

  function handleCardDelete(card) {
    apiMain.dislikeMovie(card._id)
      .then(() => {
        setSavedLocalMovies((prev) =>
          prev.filter((c) => c._id !== card._id)
        )
        localStorage.setItem(
          'saved-movie-list',
          JSON.stringify(
            JSON.parse(localStorage.getItem('saved-movie-list')).filter(
              (movie) => movie._id !== card._id
            )
          )
        );
      })
      .catch(err => console.error(err))
  }

  function onSignOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('saved-movie-list');
    localStorage.removeItem('movie-list');
    localStorage.clear();
    setIsShortFilm(false);
    setIsShortSavedFilm(false);
    setSavedLocalMovies([]);
    setResultMovies([]);
    setСurrentUser({});
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
            movies={filteredResultMovies}
            menuValue=""
            onMenuPopup={handleMenuPopupClick}
            handleSearch={handleSearch}
            filterStatus={isShortFilm}
            setIsShortFilm ={setIsShortFilm}
            isLoading={isLoading}
            onCardLike={handleCardLike}
          />
          <ProtectedRoute
            exact path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            menuValue=""
            onMenuPopup={handleMenuPopupClick}
            movies={filteredSavedMovies}
            filterStatus={isShortSavedFilm}
            setIsShortFilm ={setIsShortSavedFilm}
            onCardDelete={handleCardDelete}
            handleSearch={handleSavedSearch}
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
            currentUser={currentUser}
            reqStatus={reqStatus}
            setReqStatus={setReqStatus}
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
            {!loggedIn ? (
              <Register 
                button="Зарегистриоваться"
                handleRegister={handleRegister}
                reqStatus={reqStatus}
                setReqStatus={setReqStatus}
              />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/signin">
            {!loggedIn ? (
              <Login
                button="Войти"
                handleLogin={handleLogin}
                reqStatus={reqStatus}
                setReqStatus={setReqStatus}
              />
            ) : (
              <Redirect to="/" />
            )}
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
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
        />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;