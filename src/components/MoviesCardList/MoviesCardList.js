import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import { cardsData } from "../../utils/cardsData";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies }) {
  const location = useLocation().pathname;
  // const savedCards = cardsData.filter((card) => {
  //   return card.like === true;
  // })

  const [widthWindow, setWidthWindow] = useState(document.documentElement.clientWidth);
  // const [gridCount, setGridCount] = useState(0);
  const [gridSize, setGridSize] = useState(0);
  const [buttonSize, setButtonSize] = useState(0);
  

  function throttle(func, delay) {
    let timeout = null
    return function(...arg) {
      if(!timeout) {
        timeout = setTimeout(() => {
          func.call(this, ...arg)
          timeout = null
        }, delay)
      }
    }
  }

  useEffect(() => {
    const callback = throttle(evt => {
      setWidthWindow(window.innerWidth);
    }, 1000)

    window.addEventListener('resize', callback)

    return () => {
      window.removeEventListener('resize', callback)
    }
  }, [])

  useEffect(() => {
    switch (true) {
      case widthWindow >= 1280 && movies.length > 12:
        setGridSize(12);
        setButtonSize(3);
        break;
      case widthWindow >= 768 && widthWindow < 1280 && movies.length > 8:
        setGridSize(8);
        setButtonSize(2);
        break;
      case widthWindow >= 320 && widthWindow < 768 && movies.length > 5:
        setGridSize(5);
        setButtonSize(1);
        break;
      default:
        setGridSize(movies.length);
        break;
    }
  }, [widthWindow, movies.length])

  const cardsGridButtonClassName = (
    `cards-grid__button ${(movies.length !== gridSize) && (movies.length !== 0) ? '' : 'cards-grid__button_disable'}`
  );

  const handleButtonClick = () => {
    const gridButtonCount = (gridSize + buttonSize);
    
    if (gridButtonCount < movies.length) {
      setGridSize(gridButtonCount);
    } else {
      setGridSize(movies.length);
    }
    
  }

  return (
    <section className="cards-grid">
        {movies.length === 0 ? (
          <p className="">Ничего не найдено</p>
        ) : (
          location === "/movies" ? (
            <>
            <ul className="cards">
              {movies.slice(0, gridSize).map((props) => (
              <MoviesCard key={props.id} {...props} location={location} />
              ))}
            </ul>
            <button className={cardsGridButtonClassName} onClick={handleButtonClick}>Ещё</button>
            </>
          ) : (
            <ul className="cards cards_type_saved">
              {movies.map((props) => (<MoviesCard key={props.id} {...props} location={location} />))}
            </ul>
          )
        )}
    </section>
  );
}

export default MoviesCardList;