import React from 'react';
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom/client';

import App from './components/App';
import './main.css';
import store from './store';

import fsSync from './sync/fs';

// Start FS Syncing
fsSync();

// store.illustrations.reset();
// store.illustrations.refresh();
//   .then(() => store.illustrations.get()).then(console.log);

document.addEventListener('keydown', (event) => {
  if (event.isComposing || event.key === ' ') {
    store.illustrations.get().then(console.log);
  }
});

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
        <App />
      </React.Suspense>
    </RecoilRoot>
  </React.StrictMode>,
);
