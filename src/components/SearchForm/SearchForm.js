import SearchImage from "../../images/search-form-image.svg"
import SearchImageButton from "../../images/search-form-button.svg"
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {

  return (
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__form">
          <div className="search-form__input-group">
            <img className="search-form__image" src={SearchImage} alt="Изображение поиска" />
            <input  type="text" id="search-input" name="search-input" placeholder="Фильм" className="search-form__input"  />
          </div>
          <div className="search-form__buttons-group">
            <button className="search-form__submit">
              <img className="search-form__image-button" src={SearchImageButton} alt="Изображение поиска" />
            </button>
            <FilterCheckbox 
              mobileStatus={false}
            />
          </div>
        </form>
        <FilterCheckbox 
          mobileStatus={true}
        />
      </div>
    </section>
  );
}

export default SearchForm;