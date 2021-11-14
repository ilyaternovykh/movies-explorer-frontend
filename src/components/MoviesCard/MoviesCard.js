function MoviesCard( card ) {
  const isLiked = card.like;

  const cardLikeButtonClassName = (
    `cards__like ${isLiked ? 'cards__like_active' : ''}`
  );

  return (
    <li className="cards__item">
      <img className="cards__image" src={card.image} alt={card.nameRu} />
      {card.location === "/movies" ? (
        <div className="cards__description">
          <div className="cards__info">
            <h2 className="cards__title">{card.nameRu}</h2>
            <button className={cardLikeButtonClassName}></button>
          </div><p className="cards__duration">{card.duration}</p>
        </div>
        ) : (
        <div className="cards__description cards__description_type_saved">
          <div className="cards__info cards__info-saved">
            <h2 className="cards__title">{card.nameRu}</h2>
            <button className="cards__delete-button "></button>
          </div>
          <p className="cards__duration">{card.duration}</p>
        </div>
        )}
      
    </li>
  );
}

export default MoviesCard;