import React from 'react';
import ReactDOM from 'react-dom/client';

// import AppView from './components/AppView';
import PreviewTestingView from './components/PreviewTestingView';

import './main.css';

ReactDOM.createRoot(window.document.getElementById('root')).render(
  <React.StrictMode>
    {/* <AppView /> */}
    <PreviewTestingView />
  </React.StrictMode>,
);
