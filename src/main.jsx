import React from 'react'
import ReactDOM from 'react-dom/client'
import { initializeApp } from "firebase/app";
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'



const firebaseConfig = {
  apiKey: "AIzaSyDbXX4bYy0Hg-9FPr8uDtzQl0RcQrThTGo",
  authDomain: "coderhouse-ecommerce-3976d.firebaseapp.com",
  projectId: "coderhouse-ecommerce-3976d",
  storageBucket: "coderhouse-ecommerce-3976d.appspot.com",
  messagingSenderId: "62376301591",
  appId: "1:62376301591:web:613c366c53e0940786b852"
};

initializeApp(firebaseConfig);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
