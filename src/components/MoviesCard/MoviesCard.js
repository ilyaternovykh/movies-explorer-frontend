function MoviesCard( card ) {
  const isLiked = card.like;

  const cardLikeButtonClassName = (
    `cards__like ${isLiked ? 'cards__like_active' : ''}`
  );

  return (
    <li className="cards__item">
      <img className="cards__image" src={card.image} alt={card.nameRu} />
      <div className="cards__info">
        <h2 className="cards__title">{card.nameRu}</h2>
        {card.location === "/movies"
          ?
            <button className={cardLikeButtonClassName}></button>
          :
            <button className="cards__delete-button"></button>
        }
      </div>
      <p className="cards__duration">{card.duration}</p>
    </li>
  );
}

export default MoviesCard;