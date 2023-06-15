import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import OathConfirm from './OathConfirm';

import '../main.css';

ReactDOM.createRoot(window.document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <OathConfirm />
    </RecoilRoot>
  </React.StrictMode>,
);
