import get from './get';
import reset from './reset';
import set from './set';
import refreshEntities from './refreshEntities';
import { MAP } from './constants';

const makeBasicOperations = (storeName) => ({
  get: (...args) => get(storeName, ...args),
  reset: (...args) => reset(storeName, ...args),
  set: (...args) => set(storeName, ...args),
  onChange: MAP[storeName].onChange,
  onKeyChange: MAP[storeName].onKeyChange,
});

export default {
  settings: makeBasicOperations('settings'),
  preview: makeBasicOperations('preview'),
  entities: {
    refresh: refreshEntities,
    ...makeBasicOperations('entities'),
  },
};
