import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject'

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
    </main>
    </>
  );
}

export default Main;