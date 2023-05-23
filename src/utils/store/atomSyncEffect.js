import { assertion } from '@recoiljs/refine';
import store from '../../store';
import { TYPE_STORE_NAME } from '../../constants/types';

export default function atomSyncEffect({
  name: atomName = 'unknown',
  store: storeName,
  fetch: fetchFromStore,
}) {
  assertion(TYPE_STORE_NAME)(storeName);

  return ({
    onSet,
    setSelf,
  }) => {
    const unsub = store[storeName].onChange(async () => {
      const data = await fetchFromStore();
      setSelf(data);
    });

    onSet(() => {
      throw new Error(
        `Atoms Sync Error: "${atomName}" atom is being set,`
        + ' but it is is read-only.',
      );
    });

    return () => {
      unsub.then((cb) => cb());
    };
  };
}
