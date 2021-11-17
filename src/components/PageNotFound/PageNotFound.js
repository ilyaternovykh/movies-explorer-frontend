import { Link } from "react-router-dom";

function PageNotFound({ onGoBack }) {

  return (
    <div className="not-found">
      <div className="not-found__title-group">
        <h2 className="not-found__title">404</h2>
        <p className="not-found__text">Страница не найдена</p>
      </div>
      {/* <Link className="button button_type_to-main" to="/">Назад</Link> */}
      <button className="button button_type_to-main" onClick={onGoBack}>Назад</button> 
    </div>
  );
}

export default PageNotFound;