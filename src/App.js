import './App.css';
import { BrowserRouter } from 'react-router-dom';
import router from './routing/routing-config';
import Pagination from './generic-components/pagination';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {router}
      </BrowserRouter>
      <Pagination />
    </div>
  );
}

export default App;
