import React from 'react';

function FilterCheckbox({mobileStatus, filterStatus, setIsShortFilm}) {

  const checkboxClassName = (
    `filter-checkbox ${mobileStatus ? 'filter-checkbox__mobile' : 'filter-checkbox__pc'}`
  );

  const handleChange = (e) => {
    setIsShortFilm(!filterStatus);
  }

  return (
    <div className={checkboxClassName}>
      <label className="filter-checkbox__switch">
        <input className="filter-checkbox__checkbox" type="checkbox" onChange={handleChange} checked={filterStatus}/>
        <span className="filter-checkbox__slider"></span>
      </label>
      <p className="filter-checkbox__description">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;