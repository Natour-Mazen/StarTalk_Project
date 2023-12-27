import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import App from './App';

import {UserProvider} from "./utils/UserAuthContext";
import { BrowserRouter as Router } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <PrimeReactProvider>
          <Router>
              <UserProvider>
                <App />
              </UserProvider>
          </Router>
      </PrimeReactProvider>
  </React.StrictMode>
);
