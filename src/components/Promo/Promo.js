import promoImagePath from '../../images/promo-image.svg';
import NavButton from '../NavButton/NavButton';

function Promo({handleButtonClick}) {

  return(
    <section className="promo page-padding">
      <div className="promo__description">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <NavButton
          handleButtonClick={handleButtonClick}
        />
      </div>
      <img className="promo__main-illustration" src={promoImagePath} alt="Веб" />
      
    </section>
  );
}

export default Promo;