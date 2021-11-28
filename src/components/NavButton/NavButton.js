function NavButton({handleButtonClick}) {
  // console.log(props);

  return(   
    <button className="promo__button" onClick={handleButtonClick}>
      <p className="promo__button-link">Узнать больше</p>
    </button> 
  );
}

export default NavButton;