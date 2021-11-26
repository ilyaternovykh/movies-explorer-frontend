import React from 'react';

function MoviesCard( card ) {
  const [isLiked, setIsLiked] = React.useState(
    JSON.parse(localStorage.getItem('saved-movie-list')).some(
        (movie) => {
          return movie.movieId === String(card.id)
        }) ? (
          true
        ) : (
          false
        )
  );
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

  const handleDeleteClick = () => {
    card.onCardDelete(card);
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
            <button className="cards__delete-button" onClick={handleDeleteClick}></button>
          </div>
          <p className="cards__duration">{transformDuration(card.duration)}</p>
        </div>
        </>
        )}
      
    </li>
  );
}

export default MoviesCard;