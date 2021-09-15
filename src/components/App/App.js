import { Route } from 'react-router-dom';
import Main from '../Main/Main';

function App() {


  return(
    <div className="page">
      <div className="page__container">
      <Route path="/">
        <Main />
      </Route>
      </div>
    </div>
  );
}

export default App;