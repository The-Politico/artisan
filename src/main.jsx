import React from 'react';
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom/client';
import sync from './sync';

// import AppView from './components/AppView';
import StoreTestingView from './components/StoreTestingView';
import './main.css';

sync.start();

const { RecoilSyncRoot } = sync;

ReactDOM.createRoot(window.document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
        <RecoilSyncRoot>
          <StoreTestingView />
        </RecoilSyncRoot>
      </React.Suspense>
    </RecoilRoot>
  </React.StrictMode>,
);
