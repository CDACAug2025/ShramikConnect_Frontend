import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD
=======
// 1. Import BrowserRouter
import { BrowserRouter } from 'react-router-dom'; 
>>>>>>> main
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<<<<<<< HEAD
    <App />
  </React.StrictMode>
);
=======
    {/* 2. Wrap App inside BrowserRouter */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
>>>>>>> main
