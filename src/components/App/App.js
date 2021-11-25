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
  // const [moviesData, setMoviesData] = React.useState([]);
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

  // React.useEffect(() => {
    
  //     apiMain.getAllData()
  //     .then(data => {
  //       console.log(data);
  //     }).catch(err => console.error(err))
    
  // }, []);

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
  
  const handleRegister = ({ password, email, name }) => {
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
    setIsLoading(true);
    const savedMoviesForLikes = savedMovies.map(movieId => movieId.movieId);

    if (!movieList) {
      // debugger;
      apiMovies.getMovies()
        .then(data => {
          // const movieListWithLikes = data.map(function(movie) {
          //   const likeForMovie = savedMovies.some(function (movieId) {
          //     return movieId === movie.id;
          //   })

          //   if (likeForMovie) {
          //     movie.push()
          //   }

          //   }
          // )
          
          const movieListWithLikes = data.map(function(item) {
            // console.log(item.id);
            if (savedMoviesForLikes.includes(String(item.id))) {
              // debugger;
              item.likes = currentUser._id;
              return item;
              // return item.set('likes', currentUser._id)
            } else {
              // debugger;
              item.likes = ""
              return item;
              // return item.set('likes', '')
            }
          })
          const findedMovieList = movieListWithLikes.filter(function(film) {
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
          localStorage.setItem("movie-list", JSON.stringify(movieListWithLikes));
    }).catch(err => console.error(err))
    } else {
      const movieListWithLikes = movieList.map(function(item) {
        // console.log(item.id);
        if (savedMoviesForLikes.includes(String(item.id))) {
          // debugger;
          item.likes = currentUser._id;
          return item;
          // return item.set('likes', currentUser._id)
        } else {
          // debugger;
          item.likes = ""
          return item;
          // return item.set('likes', '')
        }
      })
      
      
      const findedSavedMovieList = movieListWithLikes.filter(function(film) {
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
    setIsLoading(false);
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

  function handleCardLike(card, isLiked) {
    // console.log(card);
    // const isLiked = card.likes.some(i => i === currentUser._id);
    // const isLiked = card.likes === currentUser._id ? true : false;
    // const isLiked = JSON.parse(localStorage.getItem('saved-movie-list')).some(
    //   (movie) => {
    //     debugger;
    //     const movieResult = movie.movieId || String(movie.id);
    //     const cardResult = card.movieId || String(card.id);
    //     debugger;

    //     return movieResult === cardResult;
    //   }
    // ) ? true : false;
    // console.log(savedMovies);
    const findDeleteMovie = () => {
      return savedMovies.find((c) => c.movieId === String(card.id));
    }
    const deleteMovie = findDeleteMovie();
    // console.log(card.thumbnail);
    const cardTthumbnail = card.thumbnail ? card.thumbnail : `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`;
    // console.log(isLiked);
    // debugger;

    isLiked ? (
        apiMain.dislikeMovie(deleteMovie._id)
        .then(() => {
          // card.likes = "";
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
            // debugger;
            return c.id === card.id ? card : c
          });
          // console.log(dislikedResultMovies);
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
          // owner: currentUser._id
        })
        .then((newCard) => {

          // setSavedMovies((state) => {
          //   console.log(state);
          //   state.map((c) => {
          //     console.log(c);
          //     return c._id === newCard._id ? newCard : c
          //   })
          //   // console.log(state);
          // });
          newCard.likes = currentUser._id;
          setSavedMovies((prev) => [...prev, newCard]);
          // setResultMovies(resultMovies);
          localStorage.setItem(
            "saved-movie-list",
             JSON.stringify([
               ...JSON.parse(localStorage.getItem('saved-movie-list')),
               newCard
            ])
          );
          // console.log(resultMovies);
          // setResultMovies((state) => {
          //   console.log(state);
          //   state.map((c) => {
          //     console.log(c.id);
          //     console.log(newCard.movieId);
          //     debugger;
          //     return c.id === newCard.movieId ? newCard : c
          //   })
          // });
          // console.log(resultMovies);


          // const LikedResultMovies = resultMovies.map((c) => {
          //   return String(c.id) === newCard.movieId ? newCard : c
          // });


          // console.log(LikedResultMovies);
          // setResultMovies(LikedResultMovies);
          setResultMovies(resultMovies);
        })
        .catch(err => console.error(err))
      );
  };

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