import Header from '../Header/Header';
import Promo from '../Promo/Promo';

function Main() {

  return(
    <>
    <Header 
      headerStatus={true}
      menuValue="Регистрация"
    />
    <main className="content">
      <Promo />
    </main>
    </>
  );
}

export default Main;