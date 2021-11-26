import React from 'react';
import SearchImage from "../../images/search-form-image.svg"
import SearchImageButton from "../../images/search-form-button.svg"
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ handleSearch, handleFilter, filterStatus, setIsShortFilm }) {
  const [data, setData] = React.useState({
    movie: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const { movie } = data;
    handleSearch({ movie });
  }

  return (
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__form" onSubmit={handleSubmit}>
          <div className="search-form__input-group">
            <img className="search-form__image" src={SearchImage} alt="Изображение поиска" />
            <input  type="text" id="search-input" name="movie" placeholder="Фильм" className="search-form__input" value={data.movie} onChange={handleChange} />
          </div>
          <div className="search-form__buttons-group">
            <button className="search-form__submit">
              <img className="search-form__image-button" src={SearchImageButton} alt="Изображение поиска" />
            </button>
            <FilterCheckbox 
              mobileStatus={false}
              handleFilter={handleFilter}
              filterStatus={filterStatus}
              setIsShortFilm ={setIsShortFilm}
            />
          </div>
        </form>
        <FilterCheckbox 
          mobileStatus={true}
          handleFilter={handleFilter}
          filterStatus={filterStatus}
          setIsShortFilm ={setIsShortFilm}
        />
      </div>
    </section>
  );
}

export default SearchForm;