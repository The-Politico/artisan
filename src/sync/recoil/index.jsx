import { RecoilSync } from 'recoil-sync';

import onRead from './onRead';
import onWrite from './onWrite';
import onListen from './onListen';

export default ({ children }) => (
  <RecoilSync
    storeKey="store"
    read={onRead}
    write={onWrite}
    listen={onListen}
  >
    {children}
  </RecoilSync>
);
