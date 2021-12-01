import SectionTitle from "../SectionTitle/SectionTitle";

function Techs() {


  return(
    <section className="techs page-padding">
      <SectionTitle 
        title={'Технологии'}
      />
      <div className="techs__content">
        <p className="techs__subtitle">7 технологий</p>
        <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__title-zone">
          <li>
            <p className="techs__title">HTML</p>
          </li>
          <li>
            <p className="techs__title">CSS</p>
          </li>
          <li>
            <p className="techs__title">JS</p>
          </li>
          <li>
            <p className="techs__title">React</p>
          </li>
          <li>
            <p className="techs__title">Git</p>
          </li>
          <li>
            <p className="techs__title">Express.js</p>
          </li>
          <li>
            <p className="techs__title">mongoDB</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;