import SectionTitle from "../SectionTitle/SectionTitle";
import aboutImage from "../../images/about-image.png"

function AboutMe() {


  return(
    <section className="about page-padding">
      <SectionTitle 
        title={'Студент'}
      />
      <div className="about__content">
        <div className="about__introduction">
          <h3 className="about__title">Илья</h3>
          <p className="about__subtitle">Фронтенд-разработчик, 30 лет</p>
          <p className="about__description">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
и дочь.   Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <ul className="about__link-list">
            <li className="about__link-cell">
              <a
                href="https://www.facebook.com/"
                className="about__link" 
                target="_blank" 
                rel="noreferrer"
              >
                Facebook
              </a>
            </li>
            <li className="about__link-cell">
              <a
                href="https://github.com/"
                className="about__link" 
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
        <img className="about__main-illustration" src={aboutImage} alt="Фото студента" />
      </div>
    </section>
  );
}

export default AboutMe;