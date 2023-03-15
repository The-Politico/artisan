import { RecoilSync } from 'recoil-sync';

import onReadEntities from './entities/sync/read';
import onReadProject from './projects/sync/read';
import onReadIllustration from './illustrations/sync/read';
import onWriteIllustration from './illustrations/sync/write';
import onWriteProject from './projects/sync/write';
import onWriteEntities from './entities/sync/write';

import { ENTITIES } from '../store/init';

const READ_MAP = {
  entities: onReadEntities,
  projects: onReadProject,
  illustrations: onReadIllustration,
};

const WRITE_MAP = {
  entities: onWriteEntities,
  projects: onWriteProject,
  illustrations: onWriteIllustration,
};

export default ({ children }) => (
  <RecoilSync
    storeKey="store"
    read={(itemKey) => {
      const [itemKeyBase, ...itemKeyDetails] = itemKey.split('__');

      if (typeof (READ_MAP[itemKeyBase]) === 'function') {
        return READ_MAP[itemKeyBase](...itemKeyDetails);
      }

      throw new Error(`No read map for ${itemKey}`);
    }}
    write={({ diff }) => {
      diff.forEach((value, itemKey) => {
        const [itemKeyBase, ...itemKeyDetails] = itemKey.split('__');

        if (typeof (WRITE_MAP[itemKeyBase]) === 'function') {
          return WRITE_MAP[itemKeyBase](value, ...itemKeyDetails);
        }

        throw new Error(`No write map for ${itemKey}`);
      });
    }}
    listen={({ updateItem }) => {
      console.log('Listening!');

      let unSubscribeFromStoreOnChange;
      ENTITIES.onChange((key, value) => {
        if (key[0] === 'I') {
          updateItem(`illustrations__${key}`, value);
        }

        if (key[0] === 'P') {
          updateItem(`projects__${key}`, value);
        }
      }).then((cb) => {
        unSubscribeFromStoreOnChange = cb;
      });

      let unSubscribeFromStoreOnKeyChange;
      ENTITIES.onKeyChange(async () => {
        const resetEntities = await onReadEntities();
        updateItem('entities', resetEntities);
      }).then((cb) => {
        unSubscribeFromStoreOnKeyChange = cb;
      });

      return () => {
        console.log('Unlistening!');

        if (typeof unSubscribeFromStore === 'function') {
          unSubscribeFromStoreOnChange();
          unSubscribeFromStoreOnKeyChange();
        }
      };
    }}
  >
    {children}
  </RecoilSync>
);
