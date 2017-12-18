import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import RootReducer from './Reducers';

const middleware = applyMiddleware(promise, thunk, logger);

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__
  && window.__REDUX_DEVTOOLS_EXTENSION__();

const Store = createStore(
  RootReducer,
  compose(
    middleware,
    devTools
  )
);

export default Store;
