import React from 'react';
import ReactDOM from 'react-dom/client';

import AppView from './components/AppView';
// import ActionTestingView from './components/ActionTestingView';
import './main.css';

ReactDOM.createRoot(window.document.getElementById('root')).render(
  <React.StrictMode>
    <AppView />
    {/* <ActionTestingView /> */}
  </React.StrictMode>,
);
