import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <App />
    
  </React.StrictMode>,
  //Set viewport meta tag
  document.querySelector('meta[name="viewport"]').getAttribute('content', 'width=device-width, initial-scale=1')
);
//reportWebVitals();