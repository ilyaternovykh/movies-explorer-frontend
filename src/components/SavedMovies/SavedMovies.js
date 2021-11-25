import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({ loggedIn, menuValue, onMenuPopup, movies, handleFilter, filterStatus, setIsShortFilm, onCardDelete }) {


  return(
    <>
      <Header 
        loggedIn={loggedIn}
        menuValue={menuValue}
        onMenuPopup={onMenuPopup}
      />
      <main className="movies page-padding-movies">
      <SearchForm
        handleFilter={handleFilter}
        filterStatus={filterStatus}
        setIsShortFilm ={setIsShortFilm}
      />
      <MoviesCardList 
        movies={movies}
        onCardDelete={onCardDelete}
      />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;