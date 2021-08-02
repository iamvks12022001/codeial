import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from './components/App';
import './index.css';
import thunk from 'redux-thunk';
import {createStore,applyMiddleware} from 'redux';
import combineReducers from './reducers';

//so internlly redux is calling in this way
//logger(obj)(next)(action)
// const logger=function({dispatch,getState}){  //useing currying
//   return function(next){
//     return function(action){
//       //middleware code
//       console.log('1st middleware Action Tpe = ',action.type);
//       next(action);
//     }
//   }
// }

const logger=({dispatch,getState})=>(next)=>(action)=>{
   //middleware code
   if(typeof action !=='function')
   {
    console.log('1st middleware Action Tpe = ',action.type);

   }
   next(action);
}
// const thunk=({dispatch,getState})=>(next)=>(action)=>{
//   //middleware code
//   if(typeof action==='function'){
//     action(dispatch);
//     return;
//   }
//   next(action);
// }
console.log("hii-0");
const store=createStore(combineReducers,applyMiddleware(logger,thunk));
console.log('store',store);
// console.log('BEFORE STATE',store.getState());
// //initialy we have empty state [];
// store.dispatch({
//      type:'ADD_MOVIES',
//      movies:[{name:'Superman '}]   //from UI we have to pass this action to reducers
// });//dispatching an action

// console.log('AFTER STATE ',store.getState());
// now state get set state

export const StoreContext=createContext();
class Provider extends React.Component{

  render(){
    const {store }=this.props;
    return (
      <StoreContext.Provider value={store}>
        {this.props.children}   
        {/* the children is  basically all the component you render .
        in this code App.js only one */}
      </StoreContext.Provider>
    )
  }
}
console.log("Store Context",StoreContext);
ReactDOM.render(
  <Provider store={store}>
   
    <AppWrapper/>
  </Provider>,
  document.getElementById('root')
);

