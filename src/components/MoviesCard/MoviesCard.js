import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function MoviesCard( card ) {
  // const isLiked = card.like;
  // const currentUser = React.useContext(CurrentUserContext);
  // const isLiked = card.likes.some(i => i._id === currentUser._id);
  // const isLiked = card.likes === currentUser._id ? true : false;
  // const isLikedCard = JSON.parse(localStorage.getItem('saved-movie-list')).some(
  //   (movie) => {
      
  //     const movieResult = movie.movieId || String(movie.id);
  //     const cardResult = card.movieId || String(card.id);
  //     debugger;
  //     return movieResult === cardResult;
  //   }
  // ) ? true : false;

  const [isLiked, setIsLiked] = React.useState(
    JSON.parse(localStorage.getItem('saved-movie-list')).some(
        (movie) => {
          // debugger;
          return movie.movieId === String(card.id)
        }) ? (
          true
        ) : (
          false
        )
  );
  // console.log(isLiked);
  // debugger;
  const imageUrl = card.image.url ? `https://api.nomoreparties.co${card.image.url}` : card.image;

  const cardLikeButtonClassName = (
    `cards__like ${isLiked ? 'cards__like_active' : ''}`
  );

  const transformDuration = (dur) => {
    const hours = Math.floor(dur / 60);
    const minutes = dur % 60;

    const newDuration = (
      hours > 0 ?
        `${hours}ч ${minutes}м`
      :
        `${minutes}м`
    )

    return newDuration;
  }

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    card.onCardLike(card, isLiked);
  };

  return (
    <li className="cards__item">
      {card.location === "/movies" ? (
        <>
        <img className="cards__image" src={imageUrl} alt={card.nameRu} />
        <div className="cards__description">
          <div className="cards__info">
            <h2 className="cards__title">{card.nameRU}</h2>
            <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          </div><p className="cards__duration">{transformDuration(card.duration)}</p>
        </div>
        </>
        ) : (
        <>
        <img className="cards__image" src={card.image} alt={card.nameRu} />
        <div className="cards__description cards__description_type_saved">
          <div className="cards__info cards__info-saved">
            <h2 className="cards__title">{card.nameRU}</h2>
            <button className="cards__delete-button "></button>
          </div>
          <p className="cards__duration">{transformDuration(card.duration)}</p>
        </div>
        </>
        )}
      
    </li>
  );
}

export default MoviesCard;