import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject'
import Techs from '../Techs/Techs';

function Main() {

  return(
    <>
    <Header 
      headerStatus={true}
      menuValue="Регистрация"
    />
    <main className="content">
      <Promo />
      <AboutProject />
      <Techs />
    </main>
    </>
  );
}

export default Main;