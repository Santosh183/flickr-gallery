import './App.css';

import Root from './app-components/Root'
import { Provider } from 'react-redux';
import store from './redux/store';;

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Root />
      </div>
    </Provider >
  );
}

export default App;
