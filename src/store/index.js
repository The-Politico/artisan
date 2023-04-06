import get from './get';
import reset from './reset';
import set from './set';
import deleteValue from './delete';
import refreshEntities from './refreshEntities';
import { MAP } from './constants';

const makeBasicOperations = (storeName) => ({
  get: (...args) => get(storeName, ...args),
  reset: (...args) => reset(storeName, ...args),
  set: (...args) => set(storeName, ...args),
  delete: (...args) => deleteValue(storeName, ...args),
  onChange: (...args) => MAP[storeName].onChange(...args),
  onKeyChange: (...args) => MAP[storeName].onKeyChange(...args),
});

export default {
  settings: makeBasicOperations('settings'),
  preview: makeBasicOperations('preview'),
  entities: {
    refresh: refreshEntities,
    ...makeBasicOperations('entities'),
  },
};
