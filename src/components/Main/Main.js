import {  useRef } from 'react';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject'
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

function Main() {
  const aboutProjectRef = useRef(null);

  const handleButtonClick = () => {
    aboutProjectRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  return(
    <>
    <main className="content">
      <Promo
        handleButtonClick={handleButtonClick}
      />
      <AboutProject 
        ref={aboutProjectRef}
      />
      <Techs />
      <AboutMe />
    </main>
    </>
  );
}

export default Main;