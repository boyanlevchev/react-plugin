import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from 'react-cookie';

const reactAppData = window.rpReactPlugin || {}
const { appSelector } = reactAppData
const appAnchorElement = document.querySelector(appSelector) || document.getElementById('root')

console.log("hi there")

if (appAnchorElement) {
  ReactDOM.render(
    <React.StrictMode>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </React.StrictMode>,
    appAnchorElement
  );
}




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
