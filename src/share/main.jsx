import React from 'react';
import ReactDOM from 'react-dom/client';

import Logo from '../components/Logo';

import '../main.css';

export default function init(config) {
  // eslint-disable-next-line no-console
  console.log(config);

  ReactDOM.createRoot(window.document.getElementById('root')).render(
    <React.StrictMode>
      <Logo />
    </React.StrictMode>,
  );
}

window.initSharePage = init;
