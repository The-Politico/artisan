import { assertion } from '@recoiljs/refine';
import store from '../../store';
import { TYPE_STORE_NAME } from '../../constants/types';

/**
 * A function that synchronizes a store to
 * an atom in a recoil framework.
 *
 * @param {Object} options - Configuration
 * @param {string} options.store - The name of the store to synchronize.
 * @param {Function} options.read - A function that reads data from the store.
 * @param {boolean} [options.write=false] - A boolean indicating if changes
 * to the atom should also write back to the store.
 *
 * @returns {function} - A recoil effect callback
 */
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
