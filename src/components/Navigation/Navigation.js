import { Link } from 'react-router-dom';

function Navigation({ link, menuValue, onSignIn }) {


  return(
    <nav className="header__account">
      <Link to={link} className="header__account-link">{menuValue}</Link>
      <button onClick={onSignIn} className="header__account-button">Войти</button>
    </nav> 
  );
}

export default Navigation;