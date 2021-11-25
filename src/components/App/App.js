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
  const [isLoading, setIsLoading] = React.useState(false);
  const [findedMovies, setFindedMovies] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [resultMovies, setResultMovies] = React.useState([]);
  const [isShortFilm, setIsShortFilm] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);




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
    apiMain.getInitialMovies()
    .then(data => {
      const userSavedMovies = data.filter((movie) => {
        return movie.owner === currentUser._id;
      });
      setSavedMovies(userSavedMovies);
      localStorage.setItem("saved-movie-list", JSON.stringify(userSavedMovies));
    }).catch(err => console.error(err))
  }, [currentUser]);

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
          setСurrentUser(data);
          history.push('/saved-movies');
        }
      })
      .catch(err => console.log(err));
  }
  
  const handleRegister = ({ password, email, name }) => {
    apiAuth.register({ password, email, name })
      .then(data => {
        if (data) {
          handleLogin({ password, email, name });
        }
      })
      .catch((err) => {
        console.log(err)
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
    setIsLoading(true);
    const savedMoviesForLikes = savedMovies.map(movieId => movieId.movieId);

    if (!movieList) {
      apiMovies.getMovies()
        .then(data => {
          const movieListWithLikes = data.map(function(item) {
            if (savedMoviesForLikes.includes(String(item.id))) {
              item.likes = currentUser._id;
              return item;
            } else {
              item.likes = ""
              return item;
            }
          })
          const findedMovieList = movieListWithLikes.filter(function(film) {
            return film.nameRU.toLowerCase().includes(movie.toLowerCase());
          })
          setFindedMovies(findedMovieList);
          setFilteredMovies(filterMovies(findedMovieList));
          if (isShortFilm === true) {
            setResultMovies(filterMovies(findedMovieList));
          } else {
            setResultMovies(findedMovieList);
          }
          localStorage.setItem("movie-list", JSON.stringify(movieListWithLikes));
    }).catch(err => console.error(err))
    } else {
      const movieListWithLikes = movieList.map(function(item) {
        if (savedMoviesForLikes.includes(String(item.id))) {
          item.likes = currentUser._id;
          return item;
        } else {
          item.likes = ""
          return item;
        }
      })
      
      
      const findedSavedMovieList = movieListWithLikes.filter(function(film) {
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
    setIsLoading(false);
  }

  const handleFilter = () => {
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
      return film.duration <= 40;
    })
  }

  function handleCardLike(card, isLiked) {
    const findDeleteMovie = () => {
      return savedMovies.find((c) => c.movieId === String(card.id));
    }
    const deleteMovie = findDeleteMovie();
    const cardTthumbnail = card.thumbnail ? card.thumbnail : `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`;

    isLiked ? (
        apiMain.dislikeMovie(deleteMovie._id)
        .then(() => {
          setSavedMovies((prev) =>
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
          setSavedMovies((prev) => [...prev, newCard]);
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
        setSavedMovies((prev) =>
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
        
        setResultMovies(resultMovies);
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
            movies={resultMovies}
            menuValue=""
            onMenuPopup={handleMenuPopupClick}
            handleSearch={handleSearch}
            handleFilter={handleFilter}
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
            movies={savedMovies}
            filterStatus={isShortFilm}
            setIsShortFilm ={setIsShortFilm}
            handleFilter={handleFilter}
            onCardDelete={handleCardDelete}
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