import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import {createStore} from 'redux';
import movies from './reducers';

const store=createStore(movies);
console.log('store',store);
// console.log('BEFORE STATE',store.getState());
// //initialy we have empty state [];
// store.dispatch({
//      type:'ADD_MOVIES',
//      movies:[{name:'Superman '}]   //from UI we have to pass this action to reducers
// });//dispatching an action

// console.log('AFTER STATE ',store.getState());
// now state get set state
ReactDOM.render(
  <React.StrictMode>
    <App store={store}/>
  </React.StrictMode>,
  document.getElementById('root')
);

