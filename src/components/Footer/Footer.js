import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation().pathname;

  const footerClassName = (
    location === "/movies" || "saved-movies" ? (
      "footer page-padding-movies"
    ) : (
      "footer page-padding"
    )
  );


  return(
    <footer className={footerClassName}>
      <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__content">
        <p className="footer__copyright">&copy; 2020</p>
        <ul className="footer__menu-links">
          <li className="footer__link-cell">
            <a
              href="https://practicum.yandex.ru/"
              className="footer__link" 
              target="_blank" 
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__link-cell">
            <a
              href="https://github.com/"
              className="footer__link" 
              target="_blank" 
              rel="noreferrer"
            >
              Github
            </a>
          </li>
          <li className="footer__link-cell">
            <a
              href="https://www.facebook.com/"
              className="footer__link" 
              target="_blank" 
              rel="noreferrer"
            >
              Facebook
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;