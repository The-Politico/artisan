import React from 'react';
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom/client';
import sync from './sync';

import App from './components/App';
import './main.css';

const { RecoilSyncRoot } = sync;

const SuspenseTest = function SuspenseTest() {
  return (
    <div>Loading...</div>
  );
};

ReactDOM.createRoot(window.document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <React.Suspense fallback={(<SuspenseTest />)}>
        <RecoilSyncRoot>
          <App />
        </RecoilSyncRoot>
      </React.Suspense>
    </RecoilRoot>
  </React.StrictMode>,
);
