import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App';
import { configureStore } from './store';
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: 'AIzaSyAlXgvGG5SSa2Uhu5_ZaqITLrukJrgq-Ak',
  authDomain: 'btp-5-5d21d.firebaseapp.com',
  projectId: 'btp-5-5d21d',
  storageBucket: 'btp-5-5d21d.appspot.com',
  messagingSenderId: '554608004704',
  appId: '1:554608004704:web:ca974cd4c4aaeb06c4fd05',
  measurementId: 'G-G9BWTNMQBP',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const store = configureStore();
console.log('store :', store.getState());

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
