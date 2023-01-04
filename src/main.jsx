import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App';
// import ActionTestingView from './components/ActionTestingView';
import './main.css';
import store from './store';

// Adds first run prop if none is found in development
if (import.meta.env.DEV) {
  (async () => {
    const { firstRun } = await store.getSettings();
    if (firstRun === null) {
      await store.updateSettings({ firstRun: true });
    }
  })();
}

ReactDOM.createRoot(window.document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* <ActionTestingView /> */}
  </React.StrictMode>,
);
