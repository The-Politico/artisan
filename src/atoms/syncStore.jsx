import { RecoilSync } from 'recoil-sync';
import onReadEntities from './entities/read';

const READ_MAP = {
  entities: onReadEntities,
};

export default ({ children }) => (
  <RecoilSync
    storeKey="store"
    read={(itemKey) => READ_MAP[itemKey]()}
    write={({ diff, allItems }) => {
      console.log('Write', diff, allItems);
    }}
    listen={({ updateItem }) => {
      console.log('Listening!');
      // const subscription = connection.subscribe((key, value) => {
      //   updateItem(key, value);
      // });
      // return () => subscription.release();
    }}
  >
    {children}
  </RecoilSync>
);
