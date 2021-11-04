import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from '../reducers';
//this will basically import index.js file on reducers folder

let store;

export function configureStore() {
  store = createStore(reducers, applyMiddleware(thunk, logger));

  return store;
}
//above is function only not a calling
