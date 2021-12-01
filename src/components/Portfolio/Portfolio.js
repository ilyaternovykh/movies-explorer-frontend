import linkImage from "../../images/portfolio-link.svg"

function Portfolio() {


  return(
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__link-list">
        <li className="portfolio__link-cell">
          <a
            href="https://github.com/ilyaternovykh/how-to-learn"
            className="about__link" 
            target="_blank" 
            rel="noreferrer"
          >
            <p className="portfolio__link-text">Статичный сайт</p>
            <img className="portfolio__link-illustration" src={linkImage} alt="Стрелка для ссылки" />
          </a>
        </li>
        <li className="portfolio__link-cell">
          <a
            href="https://github.com/ilyaternovykh/russian-travel"
            className="about__link" 
            target="_blank" 
            rel="noreferrer"
          >
            <p className="portfolio__link-text">Адаптивный сайт</p>
            <img className="portfolio__link-illustration" src={linkImage} alt="Стрелка для ссылки" />
          </a>
        </li>
        <li className="portfolio__link-cell">
          <a
            href="https://mesto.it.nomoredomains.club/"
            className="about__link" 
            target="_blank" 
            rel="noreferrer"
          >
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <img className="portfolio__link-illustration" src={linkImage} alt="Стрелка для ссылки" />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;