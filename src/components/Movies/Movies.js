import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader"
import SearchForm from "../SearchForm/SearchForm";

function Movies({ loggedIn, menuValue, onMenuPopup, movies, handleSearch, handleFilter, filterStatus, setIsShortFilm, isLoading, onCardLike }) {


  return(
    <>
      <Header 
        loggedIn={loggedIn}
        menuValue={menuValue}
        onMenuPopup={onMenuPopup}
      />
      <main className="movies page-padding-movies">
        <SearchForm 
          handleSearch={handleSearch}
          handleFilter={handleFilter}
          filterStatus={filterStatus}
          setIsShortFilm ={setIsShortFilm}
        />
        {isLoading ? 
          <Preloader />
        : 
          <MoviesCardList
            movies={movies}
            onCardLike={onCardLike}
          />
        }
        
      </main>
      <Footer />
    </>
  );
}

export default Movies;