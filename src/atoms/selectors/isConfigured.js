import { selector } from 'recoil';
import authAtom from '../auth/atom';

const KEY = 'isConfigured';

/**
 * Whether the app is configured
 * @type {selector}
 */
const isConfigured = selector({
  key: KEY,
  get: ({ get }) => {
    const auth = get(authAtom);
    return (Object.keys(auth.box_tokens).length > 0);
  },
});

export default isConfigured;
