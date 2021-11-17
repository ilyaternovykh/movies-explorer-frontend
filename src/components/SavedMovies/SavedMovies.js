import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({ loggedIn, menuValue, onMenuPopup }) {


  return(
    <>
      <Header 
        loggedIn={loggedIn}
        menuValue={menuValue}
        onMenuPopup={onMenuPopup}
      />
      <main className="movies page-padding-movies">
      <SearchForm />
      <MoviesCardList />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;