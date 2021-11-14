import { useLocation } from "react-router-dom";
import { cardsData } from "../../utils/cardsData";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
  const location = useLocation().pathname;
  const savedCards = cardsData.filter((card) => {
    return card.like === true;
  })

  return (
    <section className="cards-grid">
        {location === "/movies" ? (
          <>
          <ul className="cards">
            {cardsData.map((props) => (
            <MoviesCard key={props._id} {...props} location={location} />
            ))}
          </ul>
          <button className="cards-grid__button">Ещё</button>
          </>
        ) : (
          <ul className="cards cards_type_saved">
            {savedCards.map((props) => (<MoviesCard key={props._id} {...props} location={location} />))}
          </ul>
        )}
    </section>
  );
}

export default MoviesCardList;