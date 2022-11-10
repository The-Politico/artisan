import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';

// eslint-disable-next-line no-unused-vars
import UITestingView from './components/UITestingView';
// eslint-disable-next-line no-unused-vars
import PreviewTestingView from './components/PreviewTestingView';

ReactDOM.createRoot(window.document.getElementById('root')).render(
  <React.StrictMode>
    <UITestingView />
    {/* <PreviewTestingView /> */}
  </React.StrictMode>,
);
