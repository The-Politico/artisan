import React from 'react';
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom/client';
import SyncStore from './atoms/syncStore';

// import AppView from './components/AppView';
import StoreTestingView from './components/StoreTestingView';
import './main.css';
import startFsSync from './fsSync';

startFsSync();

ReactDOM.createRoot(window.document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
        <SyncStore>
          <StoreTestingView />
        </SyncStore>
      </React.Suspense>
    </RecoilRoot>
  </React.StrictMode>,
);
