function MoviesCard( card ) {
  // const isLiked = card.like;
  const isLiked = true;

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

  return (
    <li className="cards__item">
      <img className="cards__image" src={`https://api.nomoreparties.co${card.image.url}`} alt={card.nameRu} />
      {card.location === "/movies" ? (
        <div className="cards__description">
          <div className="cards__info">
            <h2 className="cards__title">{card.nameRU}</h2>
            <button className={cardLikeButtonClassName}></button>
          </div><p className="cards__duration">{transformDuration(card.duration)}</p>
        </div>
        ) : (
        <div className="cards__description cards__description_type_saved">
          <div className="cards__info cards__info-saved">
            <h2 className="cards__title">{card.nameRU}</h2>
            <button className="cards__delete-button "></button>
          </div>
          <p className="cards__duration">{transformDuration(card.duration)}</p>
        </div>
        )}
      
    </li>
  );
}

export default MoviesCard;