import { forwardRef } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";

const AboutProject = forwardRef((props, ref ) => {
  // const props = props;

  return(
    <section id='about-project' className="about-project page-padding" ref={ref}>
      {/* {props.children} */}
      <SectionTitle
        {...props}
        title={'О проекте'}
      />
      <ul className="table">
        <li className="table__cell">
          <h3 className="cell__title">Дипломный проект включал 5 этапов</h3>
          <p className="cell__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="table__cell">
          <h3 className="cell__title">На выполнение диплома ушло 5 недель</h3>
          <p className="cell__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <ul className="time-table">
        <li className="time-table__cell cell-color_blue">
          <p className="cell__description">1 неделя</p>
        </li>
        <li className="time-table__cell cell-color_gray">
          <p className="cell__description">4 недели</p>
        </li>
        <li className="time-table__cell">
          <p className="cell__description">Back-end</p>
        </li>
        <li className="time-table__cell">
          <p className="cell__description">Front-end</p>
        </li>
      </ul>
    </section>
  );
});

AboutProject.displayName = "AboutProject";

export default AboutProject;