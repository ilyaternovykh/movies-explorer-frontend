import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies() {


  return(
    <main className="movies page-padding-movies">
      <SearchForm />
      <MoviesCardList />
    </main>
  );
}

export default Movies;