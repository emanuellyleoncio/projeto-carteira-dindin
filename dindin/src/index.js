import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import Rotas from './routes';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Rotas />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
