import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import HomePage from "./Components/Pages/HomePage/HomePage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCQVlwBHic9TWBiScK4k_SJDgmRJnTbDQk",
    authDomain: "weather-app-baa27.firebaseapp.com",
    projectId: "weather-app-baa27",
    storageBucket: "weather-app-baa27.appspot.com",
    messagingSenderId: "373059867163",
    appId: "1:373059867163:web:4af44df8341845c0201ebe"
};

const app = initializeApp(firebaseConfig);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <HomePage/>
);

