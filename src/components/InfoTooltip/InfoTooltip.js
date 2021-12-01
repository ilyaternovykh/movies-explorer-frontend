function InfoTooltip({isOpen, onClose}) {
  
  return (
    <article className={`popup-info ${isOpen ? 'popup-info_opened' : ''}`}>
        <form className="popup-info__container popup-info__container_tool" name="infotool">
          <button type="button" className="popup-info__close" onClick={onClose}></button>
            <div className="popup-info__tool_type_success"></div>
            <h2 className="popup-info__title popup-info__title-infotool">Данные успешно сохранены!</h2>
        </form>
    </article>
  );
}

export default InfoTooltip;