function FilterCheckbox({mobileStatus}) {

  const checkboxClassName = (
    `filter-checkbox ${mobileStatus ? 'filter-checkbox__mobile' : 'filter-checkbox__pc'}`
  );

  return (
    <div className={checkboxClassName}>
      <label className="filter-checkbox__switch">
        <input className="filter-checkbox__checkbox" type="checkbox" />
        <span className="filter-checkbox__slider"></span>
      </label>
      <p className="filter-checkbox__description">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;