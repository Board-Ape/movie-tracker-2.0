import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
// import rootReducer from './reducers'
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(devTools)

ReactDOM.render(
<Provider store = {store}>
  <App />
</Provider>,
  document.getElementById('root')
);
