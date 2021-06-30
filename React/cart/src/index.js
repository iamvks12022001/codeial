import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaUhzj7q9PEx4aPbKMexnmZ_0OI-pg7I8",
  authDomain: "cart-fca88.firebaseapp.com",
  projectId: "cart-fca88",
  storageBucket: "cart-fca88.appspot.com",
  messagingSenderId: "856230724168",
  appId: "1:856230724168:web:1fa5613032674cd6dc8e7d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


