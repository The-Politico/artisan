import React from 'react';
import ReactDOM from 'react-dom/client';
import ActionTestingView from './components/ActionTestingView';

// import AppView from './components/AppView';

import './main.scss';

ReactDOM.createRoot(window.document.getElementById('root')).render(
  <React.StrictMode>
    <ActionTestingView />
  </React.StrictMode>,
);
