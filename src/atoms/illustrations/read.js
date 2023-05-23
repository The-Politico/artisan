import { selector } from 'recoil';
import store from '../../store';

async function fetchIllustrations() {
  const entities = await store.illustrations.get();
  return entities.map(([id]) => id);
}

export default {
  fetch: fetchIllustrations,
  selector: selector({
    key: 'illustrations.default',
    get: fetchIllustrations,
  }),
};
