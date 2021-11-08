import Navigation from '../Navigation/Navigation';

function Header({ headerStatus, menuValue }) {
  const headerClassName = (
    `header ${headerStatus ? 'header__landing' : ''} page-padding`
  );

  return(
    <header className={headerClassName}>
      <div className="header__logo"></div>
      <Navigation 
        menuValue={menuValue}
      />
    </header> 
  );
}

export default Header;