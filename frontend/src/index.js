import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './state';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.baseURL = 'http://localhost:3001/api/';
// axios.defaults.baseURL = 'https://clubspace.onrender.com/api/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
