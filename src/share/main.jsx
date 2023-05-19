import React from 'react';
import ReactDOM from 'react-dom/client';

import ExportPage from '../elements/ExportPage';

import './main.css';

export default function init(config) {
  ReactDOM.createRoot(window.document.getElementById('root')).render(
    <React.StrictMode>
      <ExportPage config={config} />
    </React.StrictMode>,
  );
}
