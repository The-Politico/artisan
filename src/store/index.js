import get from './get';
import reset from './reset';
import set from './set';
import deleteValue from './delete';
import updateDict from './updateDict';
import { MAP } from './init';

const makeBasicOperations = (storeName) => ({
  get: (...args) => get(storeName, ...args),
  reset: (...args) => reset(storeName, ...args),
  set: (...args) => set(storeName, ...args),
  delete: (...args) => deleteValue(storeName, ...args),
  updateDict: (...args) => updateDict(storeName, ...args),
  onChange: (...args) => MAP[storeName].onChange(...args),
  onKeyChange: (...args) => MAP[storeName].onKeyChange(...args),
});

export default {
  settings: makeBasicOperations('settings'),
  preview: makeBasicOperations('preview'),
  illustrations: makeBasicOperations('illustrations'),
};
