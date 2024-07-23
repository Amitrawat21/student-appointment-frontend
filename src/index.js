import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter} from "react-router-dom"
import App from './App';
import Register from './Page/Register/Register';
import { store } from "./Redux/store.js";
import { Provider } from "react-redux";
import Navbar from './Component/Navbar/Navbar.js';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(



  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>

   
   

);

