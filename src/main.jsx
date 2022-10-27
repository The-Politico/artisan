import React from 'react';
import ReactDOM from 'react-dom/client';
import AppView from './components/AppView';
import './main.css';

import UITestingView from './components/UITestingView';

ReactDOM.createRoot(window.document.getElementById('root')).render(
  <React.StrictMode>
    <UITestingView />
  </React.StrictMode>,
);
