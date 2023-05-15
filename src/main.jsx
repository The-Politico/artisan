import React from 'react';
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom/client';
import sync from './sync';

import App from './components/App';
import './main.css';

sync.start();

const { RecoilSyncRoot } = sync;

ReactDOM.createRoot(window.document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
        <RecoilSyncRoot>
          <App />
        </RecoilSyncRoot>
      </React.Suspense>
    </RecoilRoot>
  </React.StrictMode>,
);
