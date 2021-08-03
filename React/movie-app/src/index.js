import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import thunk from 'redux-thunk';
import {createStore,applyMiddleware} from 'redux';
import combineReducers from './reducers';
import { Provider } from 'react-redux';
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

// export const StoreContext=createContext();
// class Provider extends React.Component {
//   render() {
//     const { store } = this.props;
//     return (
//       <StoreContext.Provider value={store}>
//         {this.props.children}
//       </StoreContext.Provider>
//     );
//   }
// }

// const connectedComponent = connect(callback)(App);
// export function connect(callback) {
//   return function (Component) {   
//     class ConnectedComponent extends React.Component {
//       constructor(props) {
//         super(props);
//         this.unsubscribe = this.props.store.subscribe(() => {
//           this.forceUpdate();
//         });
//       }

//       componentWillUnmount() {
//         this.unsubscribe();
//       }
//       render() {
//        const { store } = this.props;
//         const state = store.getState();
//         const dataToBeSentAsProps = callback(state);

//         return <Component dispatch={store.dispatch} {...dataToBeSentAsProps} />;
//       }
//     }

//     class ConnectedComponentWrapper extends React.Component {
//       render() {
//         return (
//           <StoreContext.Consumer>
//             {(store) => {
//               return <ConnectedComponent store={store} />;
//             }}
//           </StoreContext.Consumer>
//         );
//       }
//     }
//     return ConnectedComponentWrapper;
//   };
// }
// console.log("Store Context",StoreContext);
ReactDOM.render(
  <Provider store={store}>
   
    <App/>
  </Provider>,
  document.getElementById('root')
);

