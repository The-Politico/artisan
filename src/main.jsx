import React from 'react';
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom/client';

import App from './components/App';
import './main.css';
import store from './store';

store.illustrations.reset();
store.illustrations.refresh();

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
