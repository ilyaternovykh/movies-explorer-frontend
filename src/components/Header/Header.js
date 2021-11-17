import Navigation from '../Navigation/Navigation';

function Header({ loggedIn, menuValue, onMenuPopup }) {
  const headerClassName = (
    `header ${loggedIn ? 'page-padding-header' : 'header__landing'}`
  );

  return(
    <header className={headerClassName}>
      {/* <div className="header__logo"></div> */}
      <a  href='#about-project' className="header__logo-link">
        <div className="header__logo"></div>
      </a>
      <Navigation 
        menuValue={menuValue}
        loggedIn={loggedIn}
        onMenuPopup={onMenuPopup}
      />
    </header> 
  );
}

export default Header;