import promoImagePath from '../../images/promo-image.svg';

function Promo() {


  return(
    <section className="promo page-padding">
      <div className="promo__description">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <button className="promo__button">
          <a  href='#about-project' className="promo__button-link">Узнать больше</a>
        </button>
      </div>
      <img className="promo__main-illustration" src={promoImagePath} alt="Веб" />
      
    </section>
  );
}

export default Promo;