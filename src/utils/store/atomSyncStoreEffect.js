import { assertion } from '@recoiljs/refine';
import store from '../../store';
import { TYPE_STORE_NAME } from '../../constants/types';

export default function atomSyncStoreEffect({
  store: storeName,
  read,
  write = false,
}) {
  assertion(TYPE_STORE_NAME)(storeName);

  return ({
    setSelf,
    onSet,
  }) => {
    const unsub = store[storeName].onChange(async () => {
      const data = await read();
      setSelf(data);
    });

    if (write) {
      onSet((newValue) => {
        store[storeName].set(newValue);
      });
    }

    return () => {
      unsub.then((cb) => cb());
    };
  };
}
