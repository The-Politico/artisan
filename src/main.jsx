import React from 'react';
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom/client';
import sync from './sync';

import App from './components/App';
import './main.css';
import store from './store';

const { RecoilSyncRoot } = sync;

store.illustrations.refresh();
store.illustrations.get().then(console.log);

const SuspenseTest = function SuspenseTest() {
  // TODO: Replace with full app skeleton?
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
