import { selector } from 'recoil';
import settingsAtom from '../settings/atom';
import authAtom from '../auth/atom';

const KEY = 'isConfigured';

/**
 * Whether the app is configured
 * @type {selector}
 */
const isConfigured = selector({
  key: KEY,
  get: ({ get }) => {
    const settings = get(settingsAtom);
    const auth = get(authAtom);
    return (
      !!settings['aws-id'] && !!settings['aws-secret']
      && !!Object.keys(auth.box_tokens).length
    );
  },
});

export default isConfigured;
