import React from 'react';

function FilterCheckbox({mobileStatus, handleFilter, filterStatus, setIsShortFilm}) {
  // const [isShortFilm, setIsShortFilm] = React.useState(false);

  const checkboxClassName = (
    `filter-checkbox ${mobileStatus ? 'filter-checkbox__mobile' : 'filter-checkbox__pc'}`
  );

  const handleChange = (e) => {
    
    setIsShortFilm(!filterStatus);
    handleFilter();
    // debugger;
    // console.log(filterStatus);
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