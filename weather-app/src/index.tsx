import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import HomePage from "./Components/Pages/HomePage/HomePage";



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <HomePage/>
);

