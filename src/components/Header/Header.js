import Navigation from '../Navigation/Navigation';

function Header({ headerStatus, menuValue, onMenuPopup }) {
  const headerClassName = (
    `header ${headerStatus ? 'header__landing' : ''} page-padding`
  );

  return(
    <header className={headerClassName}>
      {/* <div className="header__logo"></div> */}
      <a  href='#about-project' className="header__logo-link">
        <div className="header__logo"></div>
      </a>
      <Navigation 
        menuValue={menuValue}
        headerStatus={headerStatus}
        onMenuPopup={onMenuPopup}
      />
    </header> 
  );
}

export default Header;