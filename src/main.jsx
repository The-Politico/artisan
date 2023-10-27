import React from 'react';
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom/client';

import App from './components/App';
import './main.css';

import fsSync from './sync/fs';

// Start FS Syncing
fsSync();

ReactDOM.createRoot(window.document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <React.Suspense fallback={(<div />)}>
        <App />
      </React.Suspense>
    </RecoilRoot>
  </React.StrictMode>,
);
