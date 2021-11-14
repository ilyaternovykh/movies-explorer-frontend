import { useLocation } from "react-router-dom";
import { cardsData } from "../../utils/cardsData";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
  const location = useLocation().pathname;

  return (
    <section className="cards-grid">
      <ul className="cards">
        {cardsData.map((props) => (
          <MoviesCard key={props._id} {...props} location={location} />
        ))}
      </ul>
      <button className="cards-grid__button">Ещё</button>
    </section>
  );
}

export default MoviesCardList;