function PopupWithMenu({isOpen, children, onClose}) {
  
  return (
    <article className={`popup ${isOpen ? 'popup_opened' : ''}`}>
        <nav className="popup__container">
          <button type="button" className="popup__close" onClick={onClose}></button>
          {children}
        </nav>
      </article>
  );
}

export default PopupWithMenu;